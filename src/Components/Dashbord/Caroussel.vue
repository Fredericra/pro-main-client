

<script lang="ts" setup>
import { onMounted } from 'vue';
import ListCaroussel from '../Caroussel/ListCaroussel.vue';
import FormCarousel from './FormCarousel.vue';
import { storeArticle } from '../../Auth/article';
import { storeToRefs } from 'pinia';

const store2 = storeArticle()
const { getCarouselle } = storeToRefs(store2)


onMounted(async()=>{
    await store2.checkCarousselle();
})

</script>
<template>
   <el-row :gutter="24">
        <el-col :xs="24" :md="14">
            <FormCarousel/>
        </el-col>
        <el-col :xs="24" :md="10">
            <ListCaroussel :data="getCarouselle"/>
        </el-col>
   </el-row>
</template>