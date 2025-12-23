<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Head from './Components/Head.vue';

const loading = ref<boolean>(true)
const start = ref<number>(performance.now());
onMounted(()=>{
    const end = performance.now()
    setTimeout(()=>{
        loading.value = false
    },end-start.value)
})
</script>
<template>
    <div v-loading.fullscreen.lock="loading">
        <Head/>
        <router-view/>
    </div>
</template>