<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import Head from './Components/Head.vue';
import { userStore } from './Auth/Store';
import type { Article, publication, resData, select } from './Type';
import { useRoute } from 'vue-router';
import Footer from './Components/Footer/Footer.vue';
import { storeToRefs } from 'pinia';

const route = useRoute()
const store = userStore()
const { getUser,isAuth,getPro,auth } = storeToRefs(store);
const selectCountry = ref<select[]>([])
const loading = ref<boolean>(true)
const article = ref<Article[]|null>()
const pub = ref<publication[]|null>([])

const acceptRoute = computed(()=>{
    return !auth && (route.name !=='Login' && route.name !=='Sigin')
})
onMounted(async()=>{
    await store.checkAuth()
    await store.checkPro()
    if(auth.value)
    {
        const pubs = (await store.Geting('getpub')).data as resData
        const articles = (await store.Geting('getarticle')).data as resData
        pub.value = pubs.data as publication[]|null
        article.value = articles.data as Article[]|null
    }
    loading.value = false
})
</script>
<template>
    <div v-loading.fullscreen.lock="loading" class="min-h-screen flex flex-col justify-between">
        <div>
            <Head 
            :pro="getPro" 
            :user="getUser"
            :isAuth="isAuth"/>
            <router-view 
            :country="selectCountry" 
            :userArticle="article" 
            :user="getUser" 
            :pro="getPro"
            :pub="pub"/>
        </div>
        <Footer 
        v-if="acceptRoute"
        class="mt-20 bg-gray-600"/>
    </div>
</template>