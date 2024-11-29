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

            <!-- 笔记显示区域 -->
            <div class="article-content" v-if="articleContent" v-html="articleContent">
                
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
            this.queryArticleContent(this.docId);

            // 把articles存放在缓存中
            // localStorage.setItem("suyuan_"+this.topicId+"_articles", JSON.stringify(this.articles));
        } catch (err) {
            // 捕获错误
            this.error = "无法获取笔记列表，请检查思源接口或配置";
            console.error(err);
        }
    },
    methods: {
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
        async queryArticleDetail(path){
            try {
                let parts = path.split("/");
                let articleId;
                if (parts.length > 2) {
                    articleId = parts[parts.length - 1].split(".")[0];
                }
                // 调用思源 API 获取该文章的内容
                var response = await kernelApi.getBlockKramdown(articleId);
                this.articleContent = marked(response.kramdown || '');
                // // 去除{:开头}结束的内容
                this.articleContent = this.articleContent.replace(/{:.*}/g, '');
                // // 图片地址转换<img src="assets/screenshot-20241110054758-o3i3l65.png" alt="image">这种格式往src前添加xxx.com域名
                this.articleContent = this.articleContent.replace(/<img src="assets\/(.*)" alt="(.*)">/g, '<img src="https://4b2de30a.r3.cpolar.cn/assets/$1" alt="$2">');
                // // 去除{{{col   {{{row
                this.articleContent = this.articleContent.replace(/{{{col/g, '');
                this.articleContent = this.articleContent.replace(/{{{row/g, '');
                // // 去除}}}
                this.articleContent = this.articleContent.replace(/}}}/g, '');
                // 去除(( )) 包住的内容也包括(( ))
                this.articleContent = this.articleContent.replace(/\(\(\s*.*\s*\)\)/g, '');
                // 把==《杀手壕》== 这种换成<strong>《杀手壕》</strong>
                this.articleContent = this.articleContent.replace(/==(.*)==/g, '<strong>$1</strong>');
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
                this.articleContent = response.kramdown
                this.articleContent = this.articleContent.replace(/\[&lt;&lt;\]\(\)/g, '');
                this.articleContent = this.articleContent.replace(/\[&gt;&gt;\]\(\)/g, '');

                this.articleContent = marked(this.articleContent);
                // // 去除{:开头}结束的内容
                this.articleContent = this.articleContent.replace(/{:.*}/g, '');
                // // 图片地址转换<img src="assets/screenshot-20241110054758-o3i3l65.png" alt="image">这种格式往src前添加xxx.com域名
                // this.articleContent = this.articleContent.replace(/<img src="assets\/(.*)" alt="(.*)">/g, '<img src="https://localhost:8080/assets/$1" alt="$2">');
                // 把md里的图片去掉
                this.articleContent = this.articleContent.replace(/<img src=".*?" alt="(.*?)".*?>/g, '');
                // // 去除{{{col   {{{row
                this.articleContent = this.articleContent.replace(/{{{col/g, '');
                this.articleContent = this.articleContent.replace(/{{{row/g, '');
                // // 去除}}}
                this.articleContent = this.articleContent.replace(/}}}/g, '');
                // 去除(( )) 包住的内容也包括(( ))
                this.articleContent = this.articleContent.replace(/\(\(\s*.*\s*\)\)/g, '');
                // 把==这种包住的内容换成<strong>这种格式
                this.articleContent = this.articleContent.replace(/==([^=]+)==/g, (match, p1) => `<strong>${p1}</strong>`);
                // 网页title设置标题
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

</style>
