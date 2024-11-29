<template>
    <div class="note-list-container">
        <div class="note-list-left">
            <h2>笔记本列表</h2>
            <div style="display: flex;align-items: center;justify-content: space-between;">
                <div>
                    <select v-model="selectedNoteId" @change="fetchNoteRootArticles">
                        <option v-for="(note, index) in notes" :key="note.id" :value="note.id" :selected="index === 0">
                            {{ note.name }}
                        </option>
                    </select>
                    <input type="text" v-model="searchWord" placeholder="搜索" @blur="search"/>
                </div>
                <button @click="queryParentDirectory">上一页</button>
            </div>
            <ul>
                <li v-for="article in articles" :key="article.id">
                    <span @click="fetchChildArticles(article)">{{ article.name.replace('.sy', '') }}</span>
                    <div style="padding-left: 31px">
                        <span>{{ article.hSize }}</span>
                        <button @click="queryArticleContent(article.id)">详情</button>
                    </div>
                </li>
            </ul>
            <h2>查询列表</h2>
            <ul>
                <li v-for="searchDoc in searchDocs" :key="searchDoc.path">
                    <span @click="">{{ searchDoc.hPath }}</span>
                    <div style="padding-left: 31px">
                        <button @click="queryArticleDetail(searchDoc.path)">详情</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="note-list-right">
            <div class="block-content" v-if="blockContent" v-html="blockContent">

            </div>

            <!-- 笔记显示区域 -->
            <div class="article-content" v-if="articleContent" v-html="articleContent">
                
            </div>
            
            
        </div>
    </div>
</template>

<script>
import {siyuanApi,kernelApi,siyuanSdk} from "../siyuanApi.js";
import { marked } from 'marked';

export default {
    data() {
        return {
            searchWord: "",
            token: "",
            notes: [], // 笔记本列表
            articles: [], // 文章列表
            searchDocs: [], // 搜索方法
            error: null, // 错误信息
            articleContent: null, // 文章内容
            blockContent: null, // 块内容
            selectedNoteId: null, // 存储选中的笔记本 id
            parentPath: null // 存储父目录
        };
    },
    async created() {
        try {
            // 调用思源 API 获取笔记列表
            var response = await kernelApi.lsNotebooks();
            // 更新笔记数据
            this.notes = response.notebooks || [];
            if(this.notes.length > 0){
                this.selectedNoteId = this.notes[0].id;
                this.fetchNoteRootArticles();
            }
        } catch (err) {
            // 捕获错误
            this.error = "无法获取笔记列表，请检查思源接口或配置";
            console.error(err);
        }

        // 监听鼠标悬浮事件
        window.addEventListener('mouseover', async (e) => {
            // 判断当前指向的元素
            var target = e.target;
            // 判断是否是a标签，并且href是siyuan:开头
            if (target.tagName === 'A' && target.href.startsWith('siyuan:')) {
                // 解析siyuan://blocks/20240427233073-rdfvti4?focus=1  获取20240427233073-rdfvti4
                var blockId = target.href.split("/")[3].split("?")[0];
                var response = await kernelApi.getBlockKramdown(blockId);

                var blockContent = marked(response.kramdown || '');
                this.blockContent = blockContent.replace(/{:.*}/g, '');
                console.log(this.blockContent);
            }
        });
        // 监听鼠标离开事件
        window.addEventListener('mouseout', async (e) => {
            // 判断当前指向的元素
            var target = e.target;
            // 判断是否是a标签，并且href是siyuan:开头
            if (target.tagName === 'A' && target.href.startsWith('siyuan:')) {
                // 关闭块内容
            }
        });
    },
    methods: {
        async fetchNoteRootArticles() {
            try {
                // 调用思源 API 获取该笔记本的笔记列表
                var response = await siyuanApi.getChildArticles(this.selectedNoteId, "/");
                console.log(response);
                this.articles = response.data.files || [];
            } catch (err) {
                // 捕获错误
                this.error = "无法获取该笔记本的笔记列表，请检查思源接口或配置";
                console.error(err);
            }
        },
        async search(){
            try {
                // 调用思源 API 获取该笔记本的笔记列表
                var response = await siyuanSdk.searchDocs({k: this.searchWord});
                console.log(response);
                this.searchDocs = response.data || [];
            } catch (err) {
                // 捕获错误
                this.error = "无法获取该笔记本的笔记列表，请检查思源接口或配置";
            }
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
                this.articles = response.data.files || [];
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
}

.note-list-left,.note-list-right {
    flex: 0 0 50%; /* 不需要flex-grow，而是设置flex-basis为50% */
    padding: 10px; /* 添加内边距以防止内容贴边 */
    box-sizing: border-box; /* 确保padding不会增加元素的总宽度 */
    font-family: Arial, sans-serif;
}

.note-list-left ul,.note-list-right ul {
    list-style-type: none;
    padding: 0;
}

.note-list-left li,.note-list-right li {
    display: flex;
    align-items: center; /* 如果需要垂直居中 */
    justify-content: space-between; /* 将空间分布在元素之间 */
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
}

.error {
    color: red;
    margin-top: 16px;
}

.article-content {
    margin-top: 16px;
    border: 1px solid #ccc;
    padding: 8px;
}

.note-list-right-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>
