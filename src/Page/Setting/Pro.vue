<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';
import ActivatePro from '../../Components/Activate/ActivatePro.vue';
import NextActivate from '../../Components/Activate/NextActivate.vue';
import { computed, ref, } from 'vue';
import ShowProfile from '../../Components/Activate/ShowProfile.vue';
import Step from '../../Components/Step.vue';
import type { setPro } from '../../Type';

const checkPro = ref<boolean>()
const actives = ref<number>(0)

const props = defineProps<{
    pro:setPro|null
}>()



const Layout = computed(()=>{
    checkPro.value = !!props.pro
   if(checkPro.value){
    actives.value = 1;
    return NextActivate;
   }
   return ActivatePro;
})
</script>
<template>
    <el-tabs type="border-card" class="h-screen">
        <el-tab-pane label="Cree compte pro">
            <el-row>
                <el-col :xs="24" :md="8">
                    <component :is='Layout'></component>
                    <div>
                        <Step :step="actives"/>
                    </div>
                </el-col>
                <el-col :xs="24" :md="8"></el-col>
                <el-col :xs="24" :md="8">
                    <div v-if="!checkPro">
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
