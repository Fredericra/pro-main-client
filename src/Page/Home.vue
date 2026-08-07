<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeArticle } from '../Auth/article';
import { storeToRefs } from 'pinia';
import {  Promotion, WarnTriangleFilled } from '@element-plus/icons-vue';
import type { DrawerProps } from 'element-plus';
import Input from '../Components/Input.vue';
import { userStore } from '../Auth/Store';
import { useRouter } from 'vue-router';
import CartProduit from '../Components/Produit/CartProduit.vue';

const route = useRouter()
const messgetext = ref<string>('');
const drawer = ref<boolean>(false);
const dialog = ref<boolean>(false);
const nameMessage = ref<{name: string, img: string, user: string}>({name:'', img:'', user:''});
const direction = ref<DrawerProps['direction']>('rtl')
const store2 = storeArticle()
const store = userStore()
const { getCarouselle,getAllArticle} = storeToRefs(store2)
const { user } = storeToRefs(store)

const message = async(name:{name: string, img: string, user: string})=>{
  nameMessage.value = name
  if(user.value?.email === name.user){
    dialog.value = true
    return
  }
  else if(!user.value){
    route.push({name:'Login'})
    return
  }
  else{
    drawer.value = !drawer.value
  }
}

onMounted(async()=>{
  await store2.checkAllArticle()
  await store2.checkCarousselle()
  await store.checkAuth()
})
</script>
<template class="space-y-4">
  <el-dialog v-model="dialog" title="Message envoyée Soi Meme" width="500" class="text-red-900">
    <template #header>
      <div>
        Vous ne pouvez pas envoyer un message à vous même
      </div>
      <div class="flex justify-center items-center">
        <el-icon :size="50">
          <warn-triangle-filled/>
        </el-icon>
      </div>
    </template>
     
  </el-dialog>
  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <div class="flex justify-around items-center gap-4">
        <div>
          <span class="font-bold text-lg">Message à 
            <span class="text-sm text-gray-500 cursor-pointer">
              {{ nameMessage.name }}
            </span>
          </span>
        </div>
        <div>
          <el-avatar :src="nameMessage.img" :size="40"></el-avatar>
        </div>
      </div>
    </template>
    <template #default>
      <el-empty></el-empty>
    </template>
    <template #footer>
      <div class="flex items-center">
        <div class="w-full">
          <Input v-model="messgetext" placeholder="message ..."/>
        </div>
        <div>
          <el-button type="primary">
            <el-icon>
              <Promotion/>
            </el-icon>
          </el-button>
        </div>
      </div>
    </template>
  </el-drawer>
  <el-carousel :interval="4000" arrow="always" height="800px" >
    <el-carousel-item v-for="(value,index) in getCarouselle" style="max-height:800px" :key="index">
      <el-image :src="value.image" fit="cover" class="h-auto w-full"  show-progress>
      </el-image>
    </el-carousel-item>
  </el-carousel>
    <div class="flex flex-wrap gap-4 p-4">
      <CartProduit :articles="getAllArticle" @message="message"/>
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
