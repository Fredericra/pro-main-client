<script lang="ts" setup>
import { ref } from 'vue';
import type { Validation } from '../../Type';
import { Search, User } from '@element-plus/icons-vue';
import  Input from '../Input.vue';

const search = ref<string>('')
const srch =ref<Validation|null>(null)
const find = ()=>{
    srch.value?.validate()
    if(srch.value?.error ==='')
    {
        console.log("searching ",search.value)
    }
}
</script>
<template>
     <el-row :gutter="20" class="py-5">
            <el-col :xs="24" :md="8">
                <div>
                </div>
            </el-col>
            <el-col :xs="24" :md="8">
                 <div class="flex justify-center items-center space-x-4">
                    <router-link :to="{name:'Home'}" class="link">Acceuil</router-link>
                    <router-link :to="{name:'Home'}" class="link">Produit</router-link>
                    <router-link :to="{name:'Validate'}" class="link">Creation</router-link>
                    <router-link :to="{name:'About'}" class="link">Apropos</router-link>
                </div>
            </el-col>
            <el-col :xs="24" :md="8">
                <div class="flex justify-end items-center">
                        <div>
                            <Input type="text" ref="srch"  @input="find" :suffix="Search" v-model="search" placeholder="searching"/>
                        </div>
                      <el-dropdown placement="bottom-end" >
                        <el-button type="default" class="!rounded-full !bg-transparent !border-0 !outline-0 !text-white">
                            <el-icon>
                                <User/>
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                            <el-dropdown-item>
                                <router-link :to="{name:'Login'}">
                                    Se connecter
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link :to="{name:'Sigin'}">
                                    S'inscrire
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                Admin
                            </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                        </el-dropdown>
                </div>
            </el-col>
        </el-row>
</template>