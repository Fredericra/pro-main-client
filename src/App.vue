<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import Head from './Components/Head.vue';
import { userStore } from './Auth/Store';
import type { Article, select, setPro } from './Type';

const store = userStore()
const selectCountry = ref<select[]>([])
const loading = ref<boolean>(true)
const article = ref<Article[]|null>([])
const professional = ref<setPro|null>(null)
const pub = ref<any[]>([])
const user = computed(()=>{
    return store.users
})
onMounted(async()=>{
    loading.value = true
    const country = await store.getCountry()
    professional.value = await store.getPro();
    article.value = (await store.Geting('getarticle')).data as Article[] | null;
   pub.value = (await store.Geting('getpub')).data as any[]
    for(let key of country){
        selectCountry.value.push({value:key.name,label:key.name,isoCode:key.isoCode})
    }
    loading.value = false
})
</script>
<template>
    <div v-loading.fullscreen.lock="loading">
        <Head/>
        <router-view 
        :country="selectCountry" 
        :userArticle="article" 
        :user="user" 
        :pro="professional"
        :pub="pub"/>
    </div>
</template>