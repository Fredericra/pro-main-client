<script lang="ts" setup>
import Publication from '../../Creation/Publication.vue';
import Article from '../../Creation/Article.vue';
import Folio from '../../Creation/Folio.vue';
import type {  Article as TypeArticle, User, publication, select, setPro } from '../../../Type';
import { useRoute } from 'vue-router';
import { CirclePlusFilled, ShoppingTrolley } from '@element-plus/icons-vue';
import { storeArticle } from '../../../Auth/article';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';


const articleStore = storeArticle()
const {getArticle,getPub,getCountry} = storeToRefs(articleStore)
const route = useRoute()
const props = defineProps<{
    pro:setPro|null,
    user:User,
}>()

onMounted(async()=>{
    await articleStore.checkArtcile()
    await articleStore.checkPub()
    await articleStore.checkCountrySelect()
})

</script>
<template>
    <el-tabs type="border-card" class="min-h-screen">
        <el-tab-pane label="Publication">
            <template #label>
                <span>Publication</span>
                <el-icon class="mx-2">
                    <CirclePlusFilled/>
                </el-icon>
            </template>
            <Publication 
            :pro="props.pro" 
            :country="getCountry"
            :pub="getPub ?? []"/>
        </el-tab-pane>
        <el-tab-pane>
            <template #label>
                <span>Article</span>
                <el-icon class="mx-2">
                    <ShoppingTrolley/>
                </el-icon>
            </template>
            <Article 
            :pro="pro" 
            :article="getArticle" 
            :country="getCountry"/>
        </el-tab-pane>
        <el-tab-pane label="Porfolio" v-if="props.user?.set?.admin">
            <Folio/>
        </el-tab-pane>
        <el-tab-pane label="Modifier Mon Porfolio" v-if="route.meta.admin"></el-tab-pane>
    </el-tabs>
</template>