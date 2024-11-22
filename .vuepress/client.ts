import { defineClientConfig } from 'vuepress/client'
import HelloWorld from './components/HelloWorld.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('HelloWorld', HelloWorld)
  }
})