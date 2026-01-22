<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import type { Article } from '../../Type';
import { ref } from 'vue';
import { userStore } from '../../Auth/Store';


const store = userStore()
const deleteArtile = ref<Article[]>()
const loading = ref<boolean>(false)
const props = defineProps<{
  article: Article[] | null
}>();
const emit = defineEmits<{
    (e:'update',value:Article[]):void
}>()
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
    const res = await store.Posting({data:id},'/deletearticle')
    console.log(res)
    emit('update',res.data as Article[])
    loading.value = false
}
</script>
<template>
    <div class="px-4 mx-4">
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
</template>