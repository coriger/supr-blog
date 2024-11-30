<template>
    <div class="note-list-container">
        <div class="note-list-left">
            <div>
                <ul class="menu">
                    <MenuItem
                    v-for="article in articles"
                    :key="article.id"
                    :article="article"
                    />
                </ul>
            </div>
        </div>
        <div class="note-list-right">

            <!-- 这里加一个按钮  用来切换简易模式 -->
            <div class="toggle-mode">
                <button @click="switchMode">
                    <!-- 根据articleMode的值显示文字 -->
                    {{ articleMode === 2 ? "精简版" : "原文" }}
                </button>
            </div>

            <!-- 笔记显示区域 -->
            <div class="article-content" v-html="articleContent">
                
            </div>
            
            
        </div>
    </div>
</template>

<script>
import {siyuanApi,kernelApi} from "../siyuanApi.js";
import { marked } from 'marked';
import { useRoute } from "vue-router";
import {topic_sgyy} from "./topic_data.ts";

export default {
    setup() {
        const route = useRoute();
        const query = route.query; // 查询参数
        const topicId = query.topicId;
        const docId = query.docId;
        return { topicId,docId };
    },
    data() {
        return {
            rootPath: "/", // 专题库路径  这里直接使用根路径
            selectedNoteId: "20241128235548-sdzn70a", // 存储选中的笔记本 id
            searchWord: "",
            articleMode:2, // 1为简易模式  2为详细模式
            token: "",
            notes: [], // 笔记本列表
            articles: topic_sgyy, // 文章列表
            searchDocs: [], // 搜索方法
            error: null, // 错误信息
            articleContent: null, // 文章内容
            blockContent: null, // 块内容
            parentPath: null // 存储父目录
        };
    },
    async created() {
        try {
            // 先从缓存中获取articles
            // let cachedArticles = localStorage.getItem("suyuan_"+this.topicId+"_articles");
            // if (cachedArticles && cachedArticles.length > 0) {
            //     // 从缓存中获取文章列表
            //     this.articles = JSON.parse(cachedArticles);
            //     // 加载docId对应的文章内容
            //     this.queryArticleContent(this.docId);
            //     return;
            // }

            // 获取当前目录下的所有文件
            // var targetPath = this.rootPath + this.topicId + ".sy";
            // this.articles = await this.fetchFullArticles(targetPath);
            // console.log(this.articles);

            // 加载docId对应的文章内容
            await this.queryArticleContent(this.docId);

            // 把articles存放在缓存中
            // localStorage.setItem("suyuan_"+this.topicId+"_articles", JSON.stringify(this.articles));
        } catch (err) {
            // 捕获错误
            this.error = "无法获取笔记列表，请检查思源接口或配置";
            console.error(err);
        }
    },
    methods: {
        async switchMode(){
            // 切换页面样式  判断当前是简易模式还是详细模式
            if(this.articleMode == 1){  // 当前是简易模式  切换为详细模式
                // 刷新页面
                await this.queryArticleContent(this.docId);
                this.articleMode = 2;
            }else if(this.articleMode == 2){  // 当前是详细模式  切换为简易模式 
                // .article-content之下的p标签中只保留strong标签包住的内容 其他全部清除掉
                const parser = new DOMParser();
                const doc = parser.parseFromString(this.articleContent, 'text/html');
                const pTags = doc.querySelectorAll('p');
                pTags.forEach(pTag => {
                    const strongTags = pTag.querySelectorAll('strong');
                    if (strongTags.length > 0) {
                        const newContent = Array.from(strongTags).map(strongTag => {
                            return "  "+strongTag.outerHTML;
                        }).join('');
                        pTag.innerHTML = newContent;
                    } else {
                        pTag.innerHTML = '';
                    }
                });
                this.articleContent = doc.body.innerHTML;
                this.articleMode = 1;
            }
        },
        async queryArticleContent(docId) {
            // 根据docId获取文章内容
            // 调用思源 API 获取文章内容
            let response = await siyuanApi.getArticleContent(docId);
            if (response.data && response.data.content) {
                this.articleContent = response.data.content;

                // var articleContent = document.querySelector('.article-content');
                // var pTags = articleContent.getElementsByTagName('p');
                // for (var i = 0; i < pTags.length; i++) {
                //     var pTag = pTags[i];
                //     var strongTags = pTag.getElementsByTagName('strong');
                //     if (strongTags.length > 0) {
                //         var newContent = '';
                //         for (var j = 0; j < strongTags.length; j++) {
                //             newContent += "  "+strongTags[j].outerHTML;
                //         }
                //         pTag.innerHTML = newContent;
                //     } else {
                //         pTag.innerHTML = '';
                //     }
                // }
                this.articleMode = 1;
            }
        },
        async fetchFullArticles(targetPath) {
            try {
                let articles = [];
                // 调用思源 API 获取该笔记本的笔记列表
                let response = await siyuanApi.getChildArticles(this.selectedNoteId, targetPath);
                if (response.data && response.data.files) {
                    for (let article of response.data.files) {
                        if(article.subFileCount > 0){
                            // 有子文档，需要递归获取子文档
                            let fullArticle = await this.fetchArticleWithChildren(article.path, article);
                            articles.push(fullArticle);
                        }else{
                            articles.push(article);
                        }
                    }
                }
                return articles;
            } catch (err) {
                // 捕获错误
                throw new Error("无法获取该笔记本的笔记列表，请检查思源接口或配置");
            }
        },
        async fetchArticleWithChildren(articlePath, article) {
            try {
                // 调用思源 API 获取该文章的详细信息，包括其子文章
                let response = await siyuanApi.getChildArticles(this.selectedNoteId, articlePath);
                if (response.data && response.data.files) {
                    article.children = [];
                    for (let childArticle of response.data.files) {
                        if(childArticle.subFileCount > 0){
                            let fullChildArticle = await this.fetchArticleWithChildren(childArticle.path, childArticle);
                            article.children.push(fullChildArticle);
                        }else{
                            article.children.push(childArticle);
                        }
                    }
                }
                return article;
            } catch (err) {
                // 捕获错误
                throw new Error("无法获取文章信息，请检查思源接口或配置");
            }
        },
        async fetchNoteRootArticles() {
            try {
                // 调用思源 API 获取该笔记本的笔记列表
                var response = await siyuanApi.getChildArticles(this.selectedNoteId, "/20241124161827-e5bvyjw/20241124161901-6nofis5.sy");
                console.log(response);
                this.articles = response.data.files || [];
            } catch (err) {
                // 捕获错误
                this.error = "无法获取该笔记本的笔记列表，请检查思源接口或配置";
                console.error(err);
            }
        },
        toggleArticle(article) {
            article.expanded = !article.expanded;
        },
        async fetchChildArticles(article) {
            try {
                // 调用思源 API 获取该文章的内容
                var response = await siyuanApi.getChildArticles(this.selectedNoteId,article.path);
                if(this.parentPath && this.parentPath.split("/").length > 1){
                    // 移除最后一个/后的所有字符
                    this.parentPath = article.path.replace(/(.*)\/[^\/]*$/, '$1.sy');
                    if(this.parentPath == ".sy"){
                        this.parentPath = "/";
                    }
                }else{
                    this.parentPath = "/";
                }
                console.log(this.parentPath);
                article.children = response.data.files || [];
                article.expanded = true;
            } catch (err) {
                // 捕获错误
                this.error = "无法获取该文章的内容，请检查思源接口或配置";
                console.error(err);
            }
        },
        async queryArticleContent(articleId){
            try {
                // 调用思源 API 获取该文章的内容
                var response = await kernelApi.getBlockKramdown(articleId);
                let articleContent = response.kramdown || '';
                console.log(articleContent);
                articleContent = articleContent.replace(/\[&lt;&lt;\]\(\)/g, '');
                articleContent = articleContent.replace(/\[&gt;&gt;\]\(\)/g, '');

                // 把这种格式的((20240121166440-23qg3kp "卢植"))只保留卢植这个文本
                articleContent = articleContent.replace(/\(\((.*?)\s+"(.*?)".*?\)\)/g, '$2');
                // 把这种格式的((20240121166440-23qg3kp))只保留20240121166440-23qg3kp这个文本
                articleContent = articleContent.replace(/\(\((.*?)\)\)/g, '$1');

                articleContent = marked(articleContent);
                // // 去除{:开头}结束的内容
                articleContent = articleContent.replace(/{:.*}/g, '');
                // 把md里的图片去掉
                articleContent = articleContent.replace(/<img src=".*?" alt="(.*?)".*?>/g, '');
                // // 去除{{{col   {{{row
                articleContent = articleContent.replace(/{{{col/g, '');
                articleContent = articleContent.replace(/{{{row/g, '');
                // // 去除}}}
                articleContent = articleContent.replace(/}}}/g, '');
                // 去除(( )) 包住的内容也包括(( ))
                articleContent = articleContent.replace(/\(\(\s*.*\s*\)\)/g, '');
                // 把==这种包住的内容换成<strong>这种格式
                articleContent = articleContent.replace(/==([^=]+)==/g, (match, p1) => `<strong>${p1}</strong>`);
                // 网页title设置标题
                this.articleContent = articleContent;
            } catch (err) {
                // 捕获错误
                this.error = "无法获取该文章的内容，请检查思源接口或配置";
                console.error(err);
            }
        },
        async queryParentDirectory() {
            try {
                // 这里调用查询父目录的接口，假设接口为 queryParent
                var response = await siyuanApi.getChildArticles(this.selectedNoteId,this.parentPath);
                // 移除最后一个/后的所有字符
                if(this.parentPath && this.parentPath.split("/").length > 1){
                    // 移除最后一个/后的所有字符
                    this.parentPath = response.data.path.replace(/(.*)\/[^\/]*$/, '$1.sy');
                    if(this.parentPath == ".sy"){
                        this.parentPath = "/";
                    }
                }else{
                    this.parentPath = "/";
                }
                console.log(this.parentPath);
                this.articles = response.data.files || [];
            } catch (err) {
                // 捕获错误
                this.error = "无法查询父目录，请检查思源接口或配置";
                console.error(err);
            }
        }
    }
};
</script>

<style scoped>

.note-list-container {
  display: flex;
  flex-wrap: nowrap;
}

.note-list-left {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 10px;
  box-sizing: border-box;
  border: #65b84d 1px solid !important;
  border-radius: 5px !important;
  padding: 1rem !important;
}

.note-list-right {
  flex: 0 0 75%;
  max-width: 75%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden; /* 隐藏溢出内容，但不提供滚动条 */
  border: #65b84d 1px solid !important;
  border-radius: 5px !important;
  padding: 1rem !important;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.article-content {
  white-space: normal;
  word-wrap: break-word; 
  overflow-wrap: break-word; 
}

.toggle-mode{
    /* 向右对齐 */
    text-align: right;
    /* 添加一些内边距 */
    padding-right: 10px;
    /* 添加一些上边距 */
    padding-top: 0px;
}

</style>