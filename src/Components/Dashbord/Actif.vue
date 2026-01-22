<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts';
import { ref } from 'vue';


const serie = [10,20,30,40,50,60,70,80,90]
const option = ref<ApexOptions>({
    chart: {
        type: 'donut',
        height: 350
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    plotOptions: {
        pie: {
            expandOnClick:true
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
})


const leftserie = ref<ApexAxisChartSeries>([
    {name: "Activite",data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 130, 140, 150]},
    {name: "Vente",data: [20, 30, 40, 80, 20, 90, 100, 40, 60, 80, 90, 100]},
    {name: "Achat",data: [10, 20, 25, 30, 15, 40, 50, 30, 20, 25, 30, 35]},
    {name: "Clients",data: [5, 15, 10, 20, 25, 30, 35, 40, 45, 50, 55, 60]},
    {name: "Fournisseurs",data: [2, 5, 8, 12, 15, 18, 20, 22, 25, 30, 35, 40]},
])
const leftoption = ref<ApexOptions>({
    chart: {
     type: 'line',
     height: 'auto'
    },
    legend: {
        position: 'top'
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','oct','nov','dec'],

    }
})
</script>
<template>
    <div>
        <el-row gutter="32">
            <el-col :xs="24" :md="8">
                <apexchart
                :series="serie"
                :options="option"
                />
                <div class="py-10">
                    <div class="flex justify-around py-2">
                        <el-button type="primary">
                            Pdf
                            <i class="fas fa-file-pdf mx-2"></i>
                        </el-button>
                        <el-button type="danger">
                            excel
                            <i class="fas fa-file-excel mx-2"></i>
                        </el-button>
                        <el-button type="success">
                            word
                            <i class="fas fa-file-word mx-2"></i>
                        </el-button>
                          <el-button type="warning">
                            powerpoint
                            <i class="fas fa-file-powerpoint mx-2"></i>
                        </el-button>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :md="16">
                <apexchart 
                class="chart"
                :series="leftserie"
                :options="leftoption"/>
            </el-col>
        </el-row>
    </div>
</template>
<style scope>
.chart {
    height: 50px;
    width: 100%;
}
</style>