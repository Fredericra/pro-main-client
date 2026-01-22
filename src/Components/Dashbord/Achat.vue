<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts';
import { ref } from 'vue';


const serie = [10,20,30,40,50,60,70,80,90]
const option = ref<ApexOptions>({
    chart: {
        type: 'pie',
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

</script>
<template>
    <div>
        <el-row>
            <el-col :xs="24" :md="16"></el-col>
            <el-col :xs="24" :md="8">
                <apexchart
                :series="serie"
                :options="option"
                />
            </el-col>
        </el-row>
    </div>
</template>