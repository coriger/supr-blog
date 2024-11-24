import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
const autoInjectPlugin = require('./plugins/auto-inject.js');

export default defineUserConfig({
    title: "SuprBlog",
    description: "",
    plugins: [
        autoInjectPlugin(),
    ],
    head: [
        ['link', { rel: 'icon', href: 'logo.png' }],
        ['meta', { name: 'algolia-site-verification', content: '07CCC27F77313997' }]
    ],
    base: "/supr-blog/",
    bundler: viteBundler(),
    theme: recoTheme({
        locales: {
            '/': {
              selectLanguageName: '简体中文',
              lastUpdatedText: '最后更新时间',
              catalogTitle: '页面导航',
              tip: '提示',
              info: '信息',
              warning: '警告',
              danger: '危险',
              details: '详情',
              editLinkText: '编辑当前页面',
              notFound: '哇哦，没有发现这个页面！',
              backToHome: '返回首页',
              tagsText: '标签',
              categoriesText: '分类',
            }
        },
        logo: "/logo.png",
        author: "coriger",
        authorAvatar: "/head2.png",
        docsBranch: "master",
        docsDir: "./docs",
        colorMode: 'dark', // dark, light, 默认 auto
        algolia: {
            appId: '3GLZY1790G',
            apiKey: '13abc3c1bc047a4a8d0bcdad22634638',
            indexName: 'supr-blog-vuepress2',
        },
        autoSetSeries: true,
        // 自动设置分类
        autoSetBlogCategories: true,
        navbar: [
            { text: "首页", link: "/" },
            { text: "分类", link: "/categories/trade/1" },
            { text: "标签", link: "/tags/Trade/1" },
            {
                text: "系列",
                children: [
                    { text: "三国演义", link: "/series/sanguoyanyi/baogansigeyue-sanguoyanyi/1-p1sanguo1-4hui.html" },
                    { text: "阅读", link: "/series/read/yijudingyiwanju-liuzhenyun/00000_bianzhejianyanyijushengguoqiannian.html" },
                ],
            },
        ],
        socialLinks: [
            {
              icon: 'IconReco',
              link: 'https://coriger.github.io/supr-blog/'
            },
            {
              icon: 'IconGithub',
              link: 'https://github.com/coriger'
            },
        ],
    }),
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'SuprBlog',
            description: 'SuprBlog',
        },
    },
    // debug: true,
});
