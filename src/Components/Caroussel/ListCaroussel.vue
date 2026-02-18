<script lang="ts" setup>
import { ref } from 'vue';
import type { carouselle } from '../../Type';
import { Delete } from '@element-plus/icons-vue';
import { userStore } from '../../Auth/Store';
import { storeArticle } from '../../Auth/article';

const store = userStore()
const store2 = storeArticle()
const loading = ref<boolean>(false)
//const { Carouselle } = storeToRefs(store2)
const id = ref<{id:string,image:string}[]>([])
const emit = defineEmits<{
    (e:'update-image',value:carouselle[]|null):void
}>()
const props = defineProps<{
    data:carouselle[]|null
}>()
const handleselect = (val:carouselle[])=>{
    id.value = [...val.map((item:carouselle)=>({id:item._id,image:item.image}))]
}

const trash = async()=>{
    loading.value = true
    await store.Posting({data:id.value},'/deleteimagecarouselle')
    await store2.checkCarousselle();
    loading.value = false
    
}
</script>
<template>
    <div v-if="props.data">
        <el-card>
            <template #header>
                <div class="flex justify-between items-center">
                    <p>Liste image</p>
                </div>
            </template>
        </el-card>
        <el-table 
            :data="props.data" 
            :border="true" 
            :preserve-expanded-content="false"
            style="width: 100%;" row-key="_id" @selection-change="handleselect">
            <el-table-column type="expand">
                <template #default="scope">
                    <div class="flex justify-center items-center">
                        <el-avatar :src="scope.row.image"></el-avatar>
                        <div>
                            {{ scope.row.description }}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="date">
                <template #default="scope">
                    <div>
                        <span>{{ new Date(scope.row._createdAt).toLocaleDateString('Fr') }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="date">
                <template #default="scope">
                    <div>
                        <span>{{ new Date(scope.row._createdAt).toLocaleTimeString('Fr') }}</span>
                    </div>
                </template>
            </el-table-column>
            </el-table>
            <div class="py-4">
                <el-button class="w-full" type="danger" @click="trash" v-loading.fullscreen.lock="loading">
                    <span class="mx-4">Delete</span>
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