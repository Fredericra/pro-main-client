<script lang="ts" setup>
import { Plus, Ticket } from '@element-plus/icons-vue';
import Input from '../Input.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import type { select, Validation } from '../../Type';
import { userStore } from '../../Auth/Store';
import Select from '../Select.vue';

const country = ref<select[]>([]);
const ville = ref<select[]>([]);
const name = ref<Validation>();
const number = ref<Validation>();
const date = ref<Validation>();
const cvv = ref<Validation>();
const lieu = ref<Validation>();
const pays = ref<Validation>();
const city = ref<Validation>();
const store = userStore()
const form = reactive<Record<string, string|number>>({
    name:"",
    number:"",
    date:"",
    cvv:"",
    lieu:"",
    pays:"",
    city:""
})



const search = async(value:string|number)=>{
    ville.value = []
    const findCity = country.value?.find(i=>i.value === value)
    const cities =await store.getCity(findCity?.isoCode as string)
    for(let i of cities){
        ville.value.push({label:i.name,value:i.name})
    }
  
}

onMounted(async()=>{
    const countrys = await store.getCountry()
    for(let i of countrys){
        country.value.push({label:i.name,value:i.name,isoCode:i.isoCode})
    }
    console.log(country.value);
})

const nextactivate = ()=>{
    name.value?.validate();
    number.value?.validate();
    date.value?.validate();
    cvv.value?.validate();  
    lieu.value?.validate();
    pays.value?.validate();
    city.value?.validate();

    console.log("next activate");
}   

</script>
<template>
    <div class="text-center mt-5 my-5 titre">
        <h2>Votre mode payment</h2>
    </div>
    <el-form @submit.prevent class="space-y-6">
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input show-error ref="name" v-model="form.name" placeholder="nom banque" :prefixe="Ticket"/>
            </div>
              <div class="w-full">
                <Input show-error v-model="form.number" ref="number" placeholder="nom article" :prefixe="Ticket"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input v-model="form.date" ref="date" show-error placeholder="date publication" :prefixe="Ticket"/>
            </div>
              <div class="w-16/12">
                <Input v-model="form.cvv" ref="cvv" show-error placeholder="cvv" :prefixe="Ticket"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-8/12">
                <Input show-error ref="lieu" v-model="form.lieu" placeholder="lieu publication" :prefixe="Ticket"/>
            </div>
            <div class="w-full">
                <Select show-error message="veuillez selection votre pays" ref="pays" @change="search" v-model="form.pays" :value="country" placeholder="pays publication" />
            </div>
        </div>
         <div class="flex space-x-2 mx-5">
            <div class="w-8/12">
            </div>
            <div class="w-full">
                <Select show-error ref="city" message="veuillez selectionne le ville" v-model="form.city" :value="ville" placeholder="ville"/>
            </div>
        </div>
        <el-button type="info" @click="nextactivate" class="btn">
            <span>Ajouter</span>
            <el-icon class="mx-4">
                <Plus/>
            </el-icon>
        </el-button>
    </el-form>
</template>