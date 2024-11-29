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
import { inject } from 'vue';

export default {
  name: 'MenuItem',
  props: {
    article: Object
  },
  data() {
    return {
        expanded: true,
    };
  },
  methods: {
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