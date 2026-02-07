<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts';
import Vente from '../../Components/Dashbord/Vente.vue';
import type { setPro, User } from '../../Type';
import { ref } from 'vue';
import Actif from '../../Components/Dashbord/Actif.vue';
import Achat from '../../Components/Dashbord/Achat.vue';
import { Histogram, TrendCharts, UserFilled } from '@element-plus/icons-vue';
import UserList from '../../Components/Dashbord/UserList.vue';

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

const props = defineProps<{
     user:User,
     pro:setPro
}>()

</script>
<template>
     <div class="">
          <el-tabs type="border-card" class="min-h-screen">
               <el-tab-pane>
                    <template #label>
                         <span>Mes Actifs</span>
                         <el-icon class="mx-2">
                              <Histogram/>
                         </el-icon>
                    </template>      
                    <Actif/>
               </el-tab-pane>
               <el-tab-pane>
                    <template #label>
                         <span>
                              Vente
                         </span>
                         <el-icon class="mx-2">
                              <TrendCharts/>
                         </el-icon>
                    </template>
                    <Vente :serie-data="serieVente" :chart-options="optionVente"/>
               </el-tab-pane>
               <el-tab-pane>
                    <template #label>
                         <span>
                              Achat
                         </span>
                         <el-icon class="mx-2">
                              <TrendCharts/>
                         </el-icon>
                    </template>
                    <Achat/>
               </el-tab-pane>
               <el-tab-pane v-if="user && user.set?.admin">
                    <template #label>
                         <span>
                              User list
                         </span>
                         <el-icon class="mx-2">
                              <UserFilled/>
                         </el-icon>
                    </template>
                    <UserList/>
               </el-tab-pane>
          </el-tabs>
     </div>
</template>