<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Code from '../Code/Code.vue';
import { CirclePlus } from '@element-plus/icons-vue';
import { userStore } from '../../Auth/Store';
import { storeArticle } from '../../Auth/article';

const store = userStore()
const store2 = storeArticle()
const codeBack = ref<string>('')
const loading = ref<boolean>(false)
const props = defineProps<{
    action:string
}>()
const code = ref<string>('')
const mycode = (val:string)=>{
    code.value = val
}
const addMessage = async()=>{
    if(code.value===undefined || code.value==="") return;
    loading.value = true
    await store.Posting({message:code.value},props.action);
    const res = await store2.checkLetter(props.action);
    codeBack.value = res?.message as string
    loading.value = false
}
onMounted(async()=>{
    const res = await store2.checkLetter(props.action);
    codeBack.value = res?.message as string
})
</script>
<template>
    <el-row class="h-screen overflow-hidden overflow-y-visible">
        <el-col :xs="24" :md="12" >
            <Code @update="mycode"/>
        </el-col>
        <el-col :xs="24" :md="12">
            <div class="py-4">
                <div class="flex justify-around items-center">
                    <el-button type="primary" class="w-full mx-10" @click="addMessage" v-loading.fullscreen.lock="loading">
                        <span>Mise a Jour</span>
                        <el-icon class="mx-4">
                            <CirclePlus/>
                        </el-icon>
                    </el-button>
                </div>
            </div>
            <div class="flex justify-center item-center h-1/2">
                 <div class="mx-4" v-html="code"></div>
            </div>
            
            <div class=" flex justify-center item-center h-full">
                <div v-html="codeBack"></div>
            </div>
        </el-col>
        <el-col :xs="24" :md="8">
        </el-col>
    </el-row>
</template>