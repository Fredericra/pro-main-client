<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import type { Article } from '../../Type';
import { ref } from 'vue';
import { userStore } from '../../Auth/Store';
import { storeArticle } from '../../Auth/article';


const store = userStore()
const store2 = storeArticle()
const deleteArtile = ref<Article[]>()
const loading = ref<boolean>(false)
const props = defineProps<{
  article: Article[] 
}>();

const hanleSelection = (val: Article[]) => {
    deleteArtile.value = val;
};
const deleteSelection = async()=>{
    loading.value = true
    const id = []
    if(!deleteArtile.value) {
        loading.value = false
        return 
    };
    for(let x of deleteArtile.value as Article[]){
        id.push(x._id)
    }
    await store.Posting({data:id},'/deletearticle')
    await store2.checkArticle()
    loading.value = false
}
</script>
<template>
    <div class="px-4 mx-4" v-if="props.article?.length>0">
        <div>
            <el-table
                ref="multiple"
                :data="props.article"
                row-key="_id"
                height="400"
                style="width:100%"
                @selection-change="hanleSelection"
            >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
            <template #default="scope">
                    
            </template>
        </el-table-column>
        <el-table-column label="titre">
            <template #default="scope">
                {{ scope.row.title}}
            </template>
        </el-table-column>
        <el-table-column property="_id" label="code" width="120"></el-table-column>
        </el-table>
        </div>
        <div class="py-4">
            <el-button class="btn" size="small" type="danger" @click="deleteSelection" v-loading.fullscreen.lock="loading">
                <span class="mx-4">
                    effacer la selection
                </span>
                <el-icon>
                    <Delete/>
                </el-icon>
            </el-button>
        </div>
    </div>
    <div v-else>
        <el-empty></el-empty>
    </div>
</template>