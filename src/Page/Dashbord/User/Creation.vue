<script lang="ts" setup>
import Publication from '../../Creation/Publication.vue';
import Article from '../../Creation/Article.vue';
import Folio from '../../Creation/Folio.vue';
import { CirclePlusFilled, ShoppingTrolley } from '@element-plus/icons-vue';
import { userStore } from '../../../Auth/Store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = userStore()
const { getUser } = storeToRefs(store)

onMounted(async()=>{
    await store.checkAuth()
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
            <Publication />
        </el-tab-pane>
        <el-tab-pane>
            <template #label>
                <span>Article</span>
                <el-icon class="mx-2">
                    <ShoppingTrolley/>
                </el-icon>
            </template>
            <Article />
        </el-tab-pane>
        <el-tab-pane label="Porfolio" v-if="getUser?.set?.admin">
            <Folio/>
        </el-tab-pane>
        <el-tab-pane label="Modifier Mon Porfolio" v-if="getUser?.set?.admin"></el-tab-pane>
    </el-tabs>
</template>