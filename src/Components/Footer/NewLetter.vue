<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Input from '../Input.vue';
import {  Message } from '@element-plus/icons-vue';
import type { Validation } from '../../Type';
import { userStore } from '../../Auth/Store';

const store = userStore()
const form = reactive<Record<string,string|number>>({
    email:'',
    message:'',
})
const email = ref<Validation>();
const message = ref<Validation>();
const loading = ref<boolean>(false);
const newletter = async()=>{
    email.value?.validate();
    message.value?.validate();
    if(!email.value?.error && !message.value?.error){
        loading.value = true;
        const res = await store.Posting(form,'newsletter');
        loading.value = false;
        if(res.status && email.value) email.value.error = res.message as string;
        if(!res.status && email.value) email.value.error = res.message as string;
    }
    
}
</script>
<template>
    <div class="mb-4 mx-16 pt-4">
        <div>
            <div>
                <h2 class="text-lg font-mono text-white">Abonnez-vous</h2>
            </div>
            <el-form class="space-y-4">
                <div>
                    <Input type="email" 
                    ref="email" 
                    show-error
                    :errortype="email?.error===''?'primary':'warning'"
                    v-model="form.email" 
                    :prefixe="Message" 
                    placeholder="entre votre email"/>
                </div>
                <div>
                    <Input 
                    type="textarea" 
                    :requires="{max:200,min:5}"
                    ref="message" 
                    show-error
                    class="w-full"
                    :rows="4"
                    v-model="form.message" 
                    placeholder="entre votre message"/>
                </div>
                <el-button class="w-full" type="primary" @click="newletter" v-loading.fullscreen.lock="loading">
                    <span>S'abonner</span>
                    <el-icon class="mx-4">
                        <i class="fas fa-bell"></i>
                    </el-icon>
                </el-button>
            </el-form>
        </div>
    </div>
</template>