<script lang="ts" setup>
import Publication from '../../Creation/Publication.vue';
import Article from '../../Creation/Article.vue';
import Folio from '../../Creation/Folio.vue';
import type {  Article as TypeArticle, User, select, setPro } from '../../../Type';
import { useRoute } from 'vue-router';



const route = useRoute()
const props = defineProps<{
    pro:setPro|null,
    article:TypeArticle[],
    user:User,
    country:select[],
    pub:any[]
}>()

</script>
<template>
    <el-tabs type="border-card" class="min-h-screen">
        <el-tab-pane label="Publication">
            <Publication 
            :pro="props.pro" 
            :country="props.country"
            :pub="props.pub"/>
        </el-tab-pane>
        <el-tab-pane label="Article">
            <Article 
            :pro="pro" 
            :article="props.article" 
            :country="props.country"/>
        </el-tab-pane>
        <el-tab-pane label="Porfolio" v-if="props.user?.set?.admin">
            <Folio/>
        </el-tab-pane>
        <el-tab-pane label="Modifier Mon Porfolio" v-if="route.meta.admin"></el-tab-pane>
    </el-tabs>
</template>