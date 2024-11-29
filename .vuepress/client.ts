import { defineClientConfig } from 'vuepress/client'
import HelloWorld from './components/HelloWorld.vue'
import SidebarSection from './components/SidebarSection.vue'
import NoteList from './components/NoteList.vue'
import Topic from './components/Topic.vue'
import MenuItem from './components/MenuItem.vue'

export default defineClientConfig({
    enhance({ app, router }) {
        app.component('HelloWorld', HelloWorld)
        app.component('SidebarSection', SidebarSection)
        app.component('NoteList',NoteList)
        app.component('Topic',Topic)
        app.component('MenuItem', MenuItem)


        router.afterEach((to, from) => {
            console.log(to, from)
            // 等待页面渲染完成
            setTimeout(() => {
                if(to.path.includes('topic')){
                    // 隐藏掉.page-info
                    document.querySelector('.page-info').style.display = 'none';
                }

                // 解决下iframe页面自适应问题
                // 动态获取视频iframe可用宽度，动态缩放
            }, 0);
        })
    }
})