<script lang="ts" setup>
import { MapLocation, Plus, Ticket } from '@element-plus/icons-vue';
import Input from '../Input.vue';
import { reactive, ref } from 'vue';
import File from '../file.vue';
import Utility from '../../Utility';
import Select from '../Select.vue';
import { userStore } from '../../Auth/Store';
import type { select, Validation } from '../../Type';

const store = userStore()
const error = ref<string>('')
const citySelect = ref<select[]>([])
const loading = ref<boolean>(false)
const title = ref<Validation>()
const code = ref<Validation>()
const pays = ref<Validation>()
const ville = ref<Validation>()
const street = ref<Validation>()
const description = ref<Validation>()
const emit = defineEmits<{
    (e:'pub',value:any[]):void
}>()
const props = defineProps<{
    country:select[]
}>()
const form = reactive<Record<string, any>>({
   title:'',
   pays:'',
   code:'',
   ville:'',
   street:'',
   description:'',
   file:null
})
const update = async(value:number|string|boolean)=>{
    citySelect.value = []
    const list = props.country.find(i=>i.label===value)?.isoCode
    const city = await store.getCity(list as string)
    for(let key of city){
        citySelect.value.push({value:key.name,label:key.name})
    }
}


const addPub = async()=>{

    error.value = ''
    title.value?.validate()
    code.value?.validate()
    pays.value?.validate()
    ville.value?.validate()
    street.value?.validate()
    description.value?.validate()
    const size = Utility.file(form.file,2,2)
    if(title.value?.error==="" && code.value?.error==="" && pays.value?.error==="" && ville.value?.error==="" && description.value?.error){
        loading.value = true
        const formdata = new FormData()
        for(let key in form)
        {
            formdata.append(key,form[key]);
        }
        if(form.file!==null){
            if(size){
                for(let key of form.file) {
                    formdata.append('files',key);
                }
            }
            else{
                error.value = 'chaque fichier infierieur ou egal 2 m et nombre image et inferieur ou egal 2'
            }
        }
        const res = await store.Posting(formdata,'addpub');
        emit('pub',res.data as any[]);
        loading.value = false
    }


}

</script>
<template>
    <div class="text-center mt-5 my-5 titre">
        <h2>Entre votre Publication</h2>
    </div>
    <el-form @submit.prevent class="space-y-6">
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input type="text" ref="title" show-error v-model="form.title"  placeholder="entre titre publication" :prefixe="Ticket"/>
            </div>
              <div class="w-full">
                <Input type="text" ref="code" show-error v-model="form.code" placeholder="entre code votre publicaton " :prefixe="Ticket"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Select show-error ref="pays" :value="props.country" @change="update" placeholder="entre votre pays"/>
            </div>
            <div class="w-full">
                <Select show-error ref="ville" :value="citySelect" placeholder="entre votre ville"></Select>
            </div>
            <div class="w-full">
                <Input type="text" ref="adress" placeholder="entre votre adreess" v-model="form.street" :suffix="MapLocation"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input type="textarea" ref="description" show-error v-model="form.description" placeholder="description" :prefixe="Ticket"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
              <File multiple v-model="form.file" accept=".jpeg,.png,.jpg"/>
              <el-alert v-if="error.length!==0" type="danger" :title="error"></el-alert>
            </div>
        </div>
        <el-button type="info" @click="addPub" class="btn" v-loading.fullscreen.lock="loading">
            <span>Ajouter</span>
            <el-icon class="mx-4">
                <Plus/>
            </el-icon>
        </el-button>
    </el-form>
</template>