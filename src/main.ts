import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './route'
import VueApexCharts from 'vue3-apexcharts'
import { QuillEditor } from '@vueup/vue-quill'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const pinia = createPinia()
const app = createApp(App)
app
.use(router)
.use(pinia)
.use(ElementPlus)
.use(VueApexCharts)
.component('QuillEditor', QuillEditor)
.mount('#app')
