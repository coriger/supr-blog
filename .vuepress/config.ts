import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
    title: "supr-blog",
    description: "",
    head: [
        ['link', { rel: 'icon', href: 'logo.png' }],
    ],
    base: "/supr-blog/",
    bundler: viteBundler(),
    theme: recoTheme({
        style: "@vuepress-reco/style-default",
        logo: "/logo.png",
        author: "coriger",
        authorAvatar: "/head2.png",
        docsBranch: "master",
        docsDir: "./docs",
        colorMode: 'dark', // dark, light, 默认 auto
        tip: '提示',
        info: '信息',
        danger: '危险',
        warning: '警告',
        details: '详情',
        tagsText: '标签',
        backToHome: '返回首页',
        categoriesText: '分类',
        catalogTitle: '页面导航',
        editLinkText: '编辑当前页面',
        lastUpdatedText: '最后更新时间',
        selectLanguageName: '简体中文',
        notFound: '哇哦，没有发现这个页面！',
        inputPasswordText: '请输入密码',
        unlockSucessText: '密码正确，玩得开心！',
        unlockFailuerText: '密码错误，请重新输入！',
        // 加密整个站点
        // password: 'a40d453e5ae125ce0ce606b99e82503e',
        // 设置语言
        lang: "zh-CN",
        // 自动设置分类
        autoSetSeries: true,
        navbar: [
            { text: "首页", link: "/" },
            { text: "分类", link: "/categories/Java/1" },
            { text: "标签", link: "/tags/jishu/1" },
            {
                text: "系列",
                children: [
                    { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
                    { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
                    {
                        text: '配置',
                        children: [
                            { text: '主题配置', link: '/docs/theme/frontmatter' },
                            { text: 'Markdown 扩展', link: '/docs/theme/custom-container' },
                            { text: '高级', link: '/docs/theme/custom-catalog-title' },
                        ],
                    },
                    {
                        text: '插件',
                        children: [
                            { text: 'page', link: '/docs/plugins/page' },
                            { text: 'comments', link: '/docs/plugins/comments' },
                            { text: 'vue-previews', link: '/docs/plugins/vue-previews' },
                            { text: 'bulletin-popover', link: '/docs/plugins/bulletin-popover' },
                        ],
                    },
                ],
            },
            {
                text: "文档",
                children: [
                    { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
                    { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
                    {
                        text: '配置',
                        children: [
                            { text: '主题配置', link: '/docs/theme/frontmatter' },
                            { text: 'Markdown 扩展', link: '/docs/theme/custom-container' },
                            { text: '高级', link: '/docs/theme/custom-catalog-title' },
                        ],
                    },
                    {
                        text: '插件',
                        children: [
                            { text: 'page', link: '/docs/plugins/page' },
                            { text: 'comments', link: '/docs/plugins/comments' },
                            { text: 'vue-previews', link: '/docs/plugins/vue-previews' },
                            { text: 'bulletin-popover', link: '/docs/plugins/bulletin-popover' },
                        ],
                    },
                ],
            },
        ],
    }),
    // debug: true,
});
