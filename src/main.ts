import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './route'
import { QuillEditor } from '@vueup/vue-quill'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const pinia = createPinia()
const app = createApp(App)
app
.use(router)
.use(pinia)
.use(ElementPlus)
.component('QuillEditor', QuillEditor)
.mount('#app')
