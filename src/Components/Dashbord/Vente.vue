<script lang="ts" setup>
import { WalletFilled } from '@element-plus/icons-vue';
import type { ApexOptions } from 'apexcharts';

const props = defineProps<{
    serieData:number[],
    chartOptions:ApexOptions
}>()


</script>
<template>
    <div>
        <el-row>
            <el-col :xs="24" :md="16">
                <div>
                    <el-card>
                        <template #header>
                            <div class="flex justify-around items-center text-lg">
                                <span>Gestion de vente</span>
                                <el-icon :size="30">
                                    <wallet-filled/>
                                </el-icon>
                            </div>
                        </template>
                    </el-card>
                </div>
            </el-col>
            <el-col :xs="24" :md="8">
                <apexchart
                :series="props.serieData"
                :options="props.chartOptions"
                ></apexchart>
            </el-col>
        </el-row>
    </div>
</template>