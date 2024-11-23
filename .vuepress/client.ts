import { defineClientConfig } from 'vuepress/client'
import HelloWorld from './components/HelloWorld.vue'
import SidebarSection from './components/SidebarSection.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('HelloWorld', HelloWorld)
    app.component('SidebarSection', SidebarSection)
  }
})