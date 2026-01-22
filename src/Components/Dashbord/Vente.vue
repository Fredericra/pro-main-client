<script lang="ts" setup>
import type { ApexOptions } from 'apexcharts';

const props = defineProps<{
    serieData:number[],
    chartOptions:ApexOptions
}>()


</script>
<template>
    <div>
        <el-row>
            <el-col :xs="24" :md="16"></el-col>
            <el-col :xs="24" :md="8">
                <apexchart
                :series="props.serieData"
                :options="props.chartOptions"
                ></apexchart>
            </el-col>
        </el-row>
    </div>
</template>