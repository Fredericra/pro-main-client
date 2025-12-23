<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Publication from '../../Creation/Publication.vue';
import Article from '../../Creation/Article.vue';
import Folio from '../../Creation/Folio.vue';
import { userStore } from '../../../Auth/Store';
import { computed, } from 'vue';


const route = useRoute()
const store = userStore()
const user = computed(()=>{
    return store.users
})

</script>
<template>
    <el-tabs type="border-card" class="h-screen">
        <el-tab-pane label="Publication">
            <Publication/>
        </el-tab-pane>
        <el-tab-pane label="Article">
            <Article/>
        </el-tab-pane>
        <el-tab-pane label="Porfolio" v-if="user?.set?.admin">
            <Folio/>
        </el-tab-pane>
        <el-tab-pane label="Modifier Mon Porfolio" v-if="route.meta.admin"></el-tab-pane>
    </el-tabs>
</template>