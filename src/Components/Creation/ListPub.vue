<script lang="ts" setup>
import type { publication } from '../../Type';
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { userStore } from '../../Auth/Store';

const loading = ref<boolean>(false)
const store = userStore()
const listDelete = ref<publication[]>([])
const selection = (pub:publication[])=>{
    listDelete.value = pub;
}

const emit = defineEmits<{
    (e:'update',value:publication[]):void
}>()

const deletePub = async()=>{
    const ids = listDelete.value.map((item) => item._id);
    if(ids.length === 0) return;
    loading.value = true
    const res = await store.Posting({data:ids},'/deletepub')
    emit('update',res.data as publication[])
    loading.value = false
}
const props = defineProps<{
    pub:publication[]|[]
}>()
</script>
<template>
    <div>
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
            <el-button type="danger" class="w-full" @click="deletePub" v-loading.fullscreen.lock="false">
                <span>Supprimer</span>
                <el-icon class="mx-4">
                    <Delete/>
                </el-icon>
            </el-button>
        </div>
    </div>
</template>