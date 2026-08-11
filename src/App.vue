<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Head from "./Components/Head.vue";
import { userStore } from "./Auth/Store";
import Footer from "./Components/Footer/Footer.vue";
import { storeToRefs } from "pinia";
import { storeArticle } from "./Auth/article.ts";

const loading = ref<boolean>(true);
const store = userStore();
const Article = storeArticle()
const { getUser, isAuth, getPro, auth } = storeToRefs(store);

onMounted(async () => {
    loading.value = true;
    await Article.checkAllArticle().then(async()=>{
        await store.checkAuth().then(async()=>{
            await store.checkPro().then(()=>{
                loading.value = false
            })
        });
    })
    loading.value = false

});
const acceptRoute = computed(() => {
    console.log(auth.value);
    return auth.value ? false : true;
});
</script>
<template>
    <div v-loading.fullscreen.lock="loading" class="min-h-screen flex flex-col justify-between overflow-x-hidden">
        <div>
            <Head :pro="getPro" :user="getUser" :isAuth="isAuth" />
            <router-view />
        </div>
        <Footer v-if="acceptRoute" class="mt-20 bg-gray-600" />
    </div>
</template>
