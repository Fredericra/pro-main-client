<script lang="ts" setup>
import type { publication } from '../../Type';
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { userStore } from '../../Auth/Store';
import { storeArticle } from '../../Auth/article';


const loading = ref<boolean>(false)
const store = userStore()
const store2 = storeArticle()
const listDelete = ref<publication[]>()
const selection = (pub:publication[])=>{
    listDelete.value = pub
}


const deletePub = async()=>{
     const id = []
     loading.value = true
    if(!listDelete.value) {
        loading.value = false
        return 
    };
    for(let x of listDelete.value as publication[]){
        id.push(x._id)
    }
    await store.Posting({data:id},'/deletepub')
    await store2.checkPub()
    loading.value = false
}
const props = defineProps<{
    pub:publication[]
}>()

</script>

<template>
    <div v-if="props.pub.length>0">
        <el-table
        ref="multiple"
        :data="props.pub"
        row-key="_id"
        style="width: 75%"
        @selection-change="selection">
            <el-table-column
            type="selection"
            ></el-table-column>
            <el-table-column label="Date" >
                <template #default="scope">
                    {{ new Date(scope.row._createdAt).toLocaleDateString() }}
                </template>
            </el-table-column>
             <el-table-column label="Heure" >
                <template #default="scope">
                    {{ new Date(scope.row._createdAt).toLocaleTimeString() }}
                </template>
            </el-table-column>
            <el-table-column label="code" property="code"></el-table-column>
        </el-table>
        <div class="mx-5  py-4">
            <el-button type="danger" class="w-full" @click="deletePub" v-loading.fullscreen.lock="loading">
                <span>Supprimer</span>
                <el-icon class="mx-4">
                    <Delete/>
                </el-icon>
            </el-button>
        </div>
    </div>
    <div v-else>
        <el-empty></el-empty>
    </div>
</template>