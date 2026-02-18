<script lang="ts" setup>
import { Link } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { storeArticle } from '../../Auth/article';
import { storeToRefs } from 'pinia';
import GestionArt from '../Article/GestionArt.vue';
import type { Article } from '../../Type';

const store2 = storeArticle();

const {getArticle} = storeToRefs(store2)
const article = ref<Article[]|null>(null)
onMounted(async()=>{
    await store2.checkArticle()
})
const handleSelection = (val:Article[])=>{
    article.value = val.length>0?val:null
}
</script>
<template>
    <el-row :gutter="20">
        <el-col :xs="24" :md="12">
            <el-card>
                <template #header>
                    <div class="flex justify-between mx-4 items-center">
                        <span class="font-bold">Tous Article</span>
                        <el-icon>
                            <Link/>
                        </el-icon>
                    </div>
                </template>
                <GestionArt v-if="article" :article="article"/>
                <el-empty v-else></el-empty>
            </el-card>
        </el-col>
        <el-col :xs="24" :md="12">
            <el-card v-if="getArticle">
                <template #header>
                    <div class="flex justify-between mx-1 items-center">
                        <span class="font-bold">
                            Modifier
                        </span>
                    </div>
                </template> 
                <div>
                    <el-table height="90vh" :data="getArticle" :border="true" row-key="_id" @selection-change="handleSelection">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column type="expand">
                            <template #default="scope">
                                <div class="space-x-4">
                                    <span>Model : </span>
                                    <span>{{ scope.row.model }}</span>
                                </div>
                                 <div class="space-x-4">
                                    <span>Marque : </span>
                                    <span>{{ scope.row.marque }}</span>
                                </div>
                                <el-table :border="true" :data="scope.row.set">
                                    <el-table-column label="image">
                                        <template #default="props">
                                            <el-avatar :src="props.row.links"></el-avatar>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column label="titre" property="title"></el-table-column>
                        <el-table-column label="Code" property="code"></el-table-column>
                        <el-table-column label="date">
                            <template #default="scope">
                                {{ new Date(scope.row._createdAt).toLocaleDateString('Fr') }}
                            </template>
                        </el-table-column>
                        <el-table-column label="Stock" property="quantity"></el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-empty v-else></el-empty>
        </el-col>
    </el-row>
</template>