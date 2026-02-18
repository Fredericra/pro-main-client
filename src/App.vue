<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import Head from './Components/Head.vue';
import { userStore } from './Auth/Store';
import Footer from './Components/Footer/Footer.vue';
import { storeToRefs } from 'pinia';

const loading = ref<boolean>()
const store = userStore()
const { getUser,isAuth,getPro,auth } = storeToRefs(store);

onMounted(async()=>{
    await store.checkAuth()
    await store.checkPro()
    loading.value = false
})
const acceptRoute = computed(()=>{
    console.log(auth.value)
    return auth.value?false:true
})
</script>
<template>
    <div v-loading.fullscreen.lock="loading" class="min-h-screen flex flex-col justify-between">
        <div>
            <Head 
            :pro="getPro" 
            :user="getUser"
            :isAuth="isAuth"/>
            <router-view/>
        </div>
        <Footer 
        v-if="acceptRoute"
        class="mt-20 bg-gray-600"/>
    </div>
</template>