<script lang="ts" setup>
import { CirclePlusFilled, Picture } from '@element-plus/icons-vue';
import Input from '../Input.vue';
import { reactive, ref } from 'vue';
import File from '../file.vue';
import Utility from '../../Utility';
import { userStore } from '../../Auth/Store';
import { storeArticle } from '../../Auth/article';
const form = reactive<Record<string,string|null|File[]>>({
    titre:'',
    soustitre:'',
    description:'',
    file:null
})
const error = ref<string>('')

const store = userStore()
const store2 = storeArticle()
const loading = ref<boolean>(false)
const add = async()=>{
    await store2.checkCarousselle();
    error.value = ""
    const size = Utility.file(form.file,2,2);
    const formData = new FormData()
    if(size && form.file){
        for(let key in form){
            if(key!=='file') formData.append(key,form[key] as string)
        }
        for(let key of form.file){
            formData.append('files',key)
        }
        loading.value = true
        await store.Posting(formData,'addimagecarouselle');
        await store2.checkCarousselle()
        for(let key in form){
            if(key==="file") form[key]=null;
            form[key] = ""
        }
        loading.value = false
    }
    else{
        error.value = "aucun image selectionner ou les image doit est moins de 2 Mb et 2 piece ou moins"
    }
}
</script>
<template>
    <el-card class="min-h-24/12">
        <template #header>
            <div class="text-center flex justify-around items-center">
                <p class="font-extrabold text-2xl">Entre image Carousselle</p>
                <el-icon :size="30">
                    <Picture/>
                </el-icon>
            </div>
        </template>
        <div class="py-2">
            <el-form @submit.prevent class="space-y-4">
                <div class="flex justify-around items-center space-x-4">
                    <Input placeholder="titre" v-model="form.titre as string"/>
                    <Input placeholder="sous titre" v-model="form.soustitre as string"/>
                </div>
                 <div class="flex justify-around items-center space-x-4">
                    <Input type="textarea" placeholder="descrition d'image" v-model="form.description as string"/>
                </div>
                <div>
                    <File multiple v-model="form.file as File[]|null" accept=".jpeg,.png,.jpg" />
                    <el-alert :title="error" v-if="error!==''" show-icon type="warning"></el-alert>
                </div>
                <div class="flex justify-center items-center">
                    <el-button type="primary" class="w-full" @click="add" v-loading.fullscreen.lock="loading">
                        <el-icon>
                            <CirclePlusFilled/>
                        </el-icon>
                        <span>Ajouter</span>
                    </el-button>
                </div>
            </el-form>
        </div>
    </el-card>
</template>