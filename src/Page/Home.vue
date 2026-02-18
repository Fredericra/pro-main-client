<script setup lang="ts">
import { onMounted } from 'vue';
import { storeArticle } from '../Auth/article';
import { storeToRefs } from 'pinia';

const store2 = storeArticle()
const { getCarouselle } = storeToRefs(store2)

onMounted(async()=>{
  await store2.checkCarousselle()
})
</script>
<template>
  <el-carousel :interval="4000" arrow="always">
    <el-carousel-item v-for="(value,index) in getCarouselle" :key="index">
      <el-image :src="value.image" fit="fill" class="h-100 w-full"  show-progress>
      </el-image>
    </el-carousel-item>
  </el-carousel>
  <el-row :gutter="18">
    <el-col :xs="24" :md="8" v-for="n in 3" :key="n" class="text-justify">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta
      id, eaque nostrum odit rem odio cupiditate cum eum accusamus reiciendis
      voluptates architecto alias! Veritatis debitis voluptas fugit modi
      commodi?
    </el-col>
  </el-row>
</template>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #1c385e;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #010a14;
}
</style>
