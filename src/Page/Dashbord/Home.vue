<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts';
import Vente from '../../Components/Dashbord/Vente.vue';
import type {select, setPro, User } from '../../Type';
import { onMounted, ref } from 'vue';
import Actif from '../../Components/Dashbord/Actif.vue';
import Achat from '../../Components/Dashbord/Achat.vue';
import { Histogram, TrendCharts, User as Users, UserFilled, Menu } from '@element-plus/icons-vue';
import UserList from '../../Components/Dashbord/UserList.vue';
import Profil from '../../Components/Dashbord/Profil.vue';
import GestionArticle from '../../Components/Dashbord/GestionArticle.vue';
import { userStore } from '../../Auth/Store';
import { storeToRefs } from 'pinia';
import { storeArticle } from '../../Auth/article';

const store = userStore()
const store2 = storeArticle()
const { getUser, pro,getPro } = storeToRefs(store)
const { getCurrent,getAffaire,getArticle } = storeToRefs(store2)
const optionVente = ref<ApexOptions>({
     chart: {
          type: 'pie',
          height: 350
     },
     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
     xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
     }
})
const serieVente = [30, 40, 45, 50, 49, 60, 70, 91, 1]


onMounted(async () => {
     await store2.checkVente()
     await store.checkAuth()
     await store.checkPro()
     await store2.checkArticle()
     await store2.checkCurrentUser(pro.value?.country as string)
})

</script>
<template>
     <div class="">
          <el-tabs type="border-card" class="min-h-screen">
               <el-tab-pane>
                    <template #label>
                         <span>Mes Actifs</span>
                         <el-icon class="mx-2">
                              <Histogram />
                         </el-icon>
                    </template>
                    <Actif :user="getUser as User" 
                    :vente="getAffaire" 
                    :pro="getPro as setPro" :currency="getCurrent as select"/>
               </el-tab-pane>
               <el-tab-pane>
                    <template #label>
                         <span>
                              Vente
                         </span>
                         <el-icon class="mx-2">
                              <TrendCharts />
                         </el-icon>
                    </template>
                    <Vente :serie-data="serieVente" :chart-options="optionVente" />
               </el-tab-pane>
               <el-tab-pane>
                    <template #label>
                         <span>
                              Achat
                         </span>
                         <el-icon class="mx-2">
                              <TrendCharts />
                         </el-icon>
                    </template>
                    <Achat />
               </el-tab-pane>
               <el-tab-pane>
                    <template #label>
                         <span>
                              Gestion d'Article
                         </span>
                         <el-icon class="mx-2">
                              <Menu />
                         </el-icon>
                    </template>
                    <GestionArticle />
               </el-tab-pane>
               <el-tab-pane v-if="getUser?.set?.admin">
                    <template #label>
                         <span>
                              User list
                         </span>
                         <el-icon class="mx-2">
                              <UserFilled />
                         </el-icon>
                    </template>
                    <UserList />
               </el-tab-pane>
               <el-tab-pane>
                    <template #label>
                         <span>Profile</span>
                         <el-icon class="el-icon--right">
                              <Users />
                         </el-icon>
                    </template>
                    <Profil :article="getArticle" :user="getUser as User" :pro="getPro as setPro"/>
               </el-tab-pane>
          </el-tabs>
     </div>
</template>