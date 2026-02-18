<script lang="ts" setup>
import { ref } from 'vue';
import type { Actif, select } from '../../Type';
import { Wallet } from '@element-plus/icons-vue';
import type { ApexOptions } from 'apexcharts';


const props = defineProps<{
    currency:select|null,
    vente:number
}>()
const actif =ref<Actif[]>([
    {device:props.currency?.code as string,nom:'Achat',chiffre:props.currency?500:0,class:"bg-white"},
    {device:props.currency?.code as string,nom:'Vente',chiffre:props.vente?props.vente:0,class:'text-white bg-linear-to-r from-indigo-800 to-red-300'},
    {device:props.currency?.code as string,nom:'Benefice',chiffre:props.currency?500:0,class:'text-white bg-linear-to-r from-indigo-800 to-gray-500'},
])
const option = ref<ApexOptions>({
  chart: { toolbar: { show: false } },
  stroke: { curve: "smooth" },
  colors: ["#fb7185", "#c084fc"],
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aout","Sept","Oct","Nov","Dec"]
  }
})
const serie = ref<ApexAxisChartSeries>([
  { name: "vente", data: [20, 40, 30, 60, 45, 80, 30] },
  { name: "achat", data: [10, 25, 20, 50, 30, 60, 40] }
])
</script>
<template>
    <el-row class="space-y-5">
        <el-col :xs="24" :md="8" v-for="(value,index) in actif" :key="index">
            <div class="mx-4">
                <div class=" rounded-md shadow-md shadow-indigo-500 h-20 px-3 " :class="value.class">
                    <div class="item-center">
                        <p class=" text-center font-bold">{{ value.nom }}</p>
                        <div class="flex justify-between items-center">
                            <el-icon :size="20">
                                <Wallet/>
                            </el-icon>
                            <p class="text-2xl">
                                <span class="mx-4">
                                    {{ value.device }}
                                </span>
                                <span>
                                    {{ value.chiffre }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col>
            <apexchart
            :series="serie"
            height="460"
            :options="option"
            type="area"
            ></apexchart>
        </el-col>
    </el-row>
    <el-row>
    </el-row>
</template>