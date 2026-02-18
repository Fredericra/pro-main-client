<script lang="ts" setup>
import { onMounted } from 'vue';
import FormArticle from '../../Components/Creation/FormArticle.vue';
import ListArticle from '../../Components/Creation/ListArticle.vue';
import { userStore } from '../../Auth/Store';
import { storeArticle } from '../../Auth/article';
import { storeToRefs } from 'pinia';


const store = userStore()
const store2 = storeArticle()
const { getArticle,getCountry }  = storeToRefs(store2)
const { getPro } = storeToRefs(store)

onMounted(async()=>{
  await store2.checkArticle();
  await store2.checkCountrySelect()
  await store.checkPro()
})

</script>
<template>
  <el-row>
    <el-col :xs="24" :md="16">
      <FormArticle 
      :pro="getPro" 
      :country="getCountry"/>
    </el-col>
    <el-col :xs="24" :md="8">
       <ListArticle 
       :article="getArticle"/>
    </el-col>
  </el-row>
</template>
