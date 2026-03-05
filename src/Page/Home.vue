<script setup lang="ts">
import { onMounted } from 'vue';
import { storeArticle } from '../Auth/article';
import { storeToRefs } from 'pinia';
import { PhoneFilled, Plus,Message, ShoppingBag } from '@element-plus/icons-vue';


const store2 = storeArticle()
const { getCarouselle,getAllArticle} = storeToRefs(store2)

onMounted(async()=>{
  await store2.checkAllArticle()
  await store2.checkCarousselle()
})
</script>
<template class="space-y-4">
  <el-carousel :interval="4000" arrow="always">
    <el-carousel-item v-for="(value,index) in getCarouselle" :key="index">
      <el-image :src="value.image" fit="fill" class="h-100 w-full"  show-progress>
      </el-image>
    </el-carousel-item>
  </el-carousel>
    <div class="flex flex-wrap gap-4 p-4">
      <el-card style="width: 410px;" v-for="(value,index) in getAllArticle" :key="index">
        <template #header>
          <div class="flex justify-between items-center">
            <div>
              <el-image :src="value.pro?.set?.link" fit="cover" class="h-5 w-5 rounded-full"  show-progress/>
              <span class="ml-2 text-sm font-semibold">{{ value.pro?.nom }}</span>
            </div>

          </div>
        </template>
        <div class="">
          <h3 class="text-lg font-bold mb-2">{{ value.title }}</h3>
          <div v-html="value.description" class="ql-editor"></div>
          <div class="flex justify-end items-center py-2">
            <div class="text-gray-500 text-2xl">
              {{ value.price }} {{ value.device }}
            </div>
          </div>
          <div class="flex justify-end items-center py-2">
            <div class="text-gray-500 text-sm">
              <span>Stock disponible : </span>{{ value.length }} piece
            </div>
          </div>
          <div class="relative">
            <div class="absolute right-10 -top-5" v-if="value.set.length>1">
              <el-icon :size="20" class="text-gray-500" >
                <Plus />  
              </el-icon>
              <span>{{ value.set.length }}</span><span></span>
            </div>
            <el-image v-for="(img, key) in value.set" style="width: auto; height: auto" :src="img.links"
                         :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="value.set.map(img=>img.links)" show-progress
                         :initial-index="key" fit="cover" />
          </div>
          <div class="flex justify-between items-center">
            <div>
              <el-button type="default">
                <el-icon>
                  <phone-filled/>
                </el-icon>
                <span>{{ value.pro?.phone.replace('undefined','+261 ') }}</span>
              </el-button>
            </div>
            <div class="">
              <el-button type="primary">
                <el-icon>
                  <Message/>
                </el-icon>
                <span>Message</span>
              </el-button>
            </div>
            <div class="">
              <el-button type="success">
                 <el-icon>
                  <ShoppingBag/>
                 </el-icon>
                <span>Acheter</span>
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
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
blockquote {
  border-left: 4px solid #ccc;
  padding-left: 16px;
  margin-left: 0;
  color: #666;
}

</style>
