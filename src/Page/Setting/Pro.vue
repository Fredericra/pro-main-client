<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';
import ActivatePro from '../../Components/Activate/ActivatePro.vue';
import NextActivate from '../../Components/Activate/NextActivate.vue';
import {onMounted, ref, watch, type Component, } from 'vue';
import ShowProfile from '../../Components/Activate/ShowProfile.vue';
import Step from '../../Components/Step.vue';
import { userStore } from '../../Auth/Store';

const actives = ref<number>(0)
const Layouts = ref<Component>(ActivatePro)
const store = userStore()

onMounted(async()=>{
    await store.checkPro();
})
watch(()=>store.pro,async()=>{
    await store.checkPro()
    const pro = !!store.pro;
    if(pro){
        Layouts.value = NextActivate;
    }
})
</script>
<template>
    <el-tabs type="border-card" class="h-screen">
        <el-tab-pane label="Cree compte pro">
            <el-row>
                <el-col :xs="24" :md="8">
                    <component :is='Layouts'></component>
                    <div>
                        <Step :step="actives"/>
                    </div>
                </el-col>
                <el-col :xs="24" :md="8"></el-col>
                <el-col :xs="24" :md="8">
                    <div v-if="!store.getPro">
                        <div class="flex justify-center items-center w-full">
                            <div>
                                <el-alert title="votre compte pro est verouille" type="warning" show-icon class="w-full"
                                description="veuillez active votre compte professionel, beneficie de bonne vente et bonne achat !"
                                :closable="false"
                                center>
                                <template #icon>
                                    <el-icon>
                                        <UserFilled/>
                                    </el-icon>
                                </template>
                            </el-alert>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <ShowProfile/>
                    </div>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</template>
