<template>
    <li style="">
      <div>
        <button v-if="article.children && article.children.length" @click="toggle" style="margin-right: 8px;">
          {{ expanded ? '-' : '+' }}
        </button>
        
        <a v-if="article.subFileCount === 0"  :href="articleHref(article.id)">
            {{ article.name.replace('.sy', '') }}
        </a>
        <span v-if="article.subFileCount > 0" @click="toggle">{{ article.name.replace('.sy', '') }}</span>
      </div>
      
      <ul v-if="expanded && article.children && article.children.length">
        <menu-item
          v-for="child in article.children"
          :key="child.id"
          :article="child"
        />
      </ul>
    </li>
  </template>

<script>

export default {
  name: 'MenuItem',
  props: {
    article: Object,
  },
  data() {
    return {
        expanded: true,
    };
  },
  methods: {
    handleClick() {
        // 从当前url里面替换docId  window.location.href = document.location.href.replace("docId=" + this.$parent.topicId, "docId=" + this.article.id);
        // `./topic.html?topicId=${this.$parent.topicId}&docId=${this.article.id}`
        // http://localhost:8080/supr-blog/siyuan/topic.html?topicId=20241124161901-6nofis5&docId=20241124161901-6nofis5  替换docId=后面的内容
        // 解析url  获取topicId
        const url = new URL(window.location.href);
        const topicId = url.searchParams.get('topicId');
        // 打开新页面
        window.location.href = `./topic.html?topicId=${topicId}&docId=${this.article.id}`;
        
    },
    articleHref(articleId){
        // 解析当前 URL 中的 topicId
        const url = new URL(window.location.href);
        const topicId = url.searchParams.get('topicId');
        // 生成 href 属性的值
        return "./topic.html?topicId="+topicId+"&docId="+articleId;
    },
    toggle() {
      this.expanded = !this.expanded;
    },
    async queryArticleDetail(path){
        this.$parent.queryArticleDetail(path);
    }
  },
};
</script>

<style scoped>

a {
    cursor: pointer; /* 或者使用 'hand'，但 'pointer' 是更标准的值 */
}

/* 如果只想在鼠标悬停时改变样式，可以使用 :hover 伪类 */
a:hover {
    cursor: pointer;
}

</style>