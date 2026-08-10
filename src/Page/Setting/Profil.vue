<script lang="ts" setup>
import { Message, Phone, User as UserIcon } from '@element-plus/icons-vue';
import type { setPro, User } from '../../Type';
import FormModificationSetting from '../../Components/Setting/FormModificationSetting.vue';


const props = defineProps<{
    set:{getPro:setPro|null,getUser:User|null}
}>()
</script>
<template>
    <el-tabs type="border-card" class="h-screen">
        <el-tab-pane label="Mon photo">
            <el-row :gutter="20">
                <el-col xs="24" :sm="12" :md="8">
                    <el-card>
                        <template #header>
                            <div class="flex justify-center items-center">
                                <h1 class="link">{{ set.getPro?.nom }}</h1>
                            </div>
                            <div class="flex justify-center items-center">
                                <el-avatar :src="set.getPro?.set?.link" :size="50"/>
                            </div>
                        </template>
                        <div class="py-1">
                            <div class="flex justify-center items-center">
                                <el-tag type="success">Bio</el-tag>
                            </div>
                            <div v-if="set.getUser?.set?.bio==''">
                                <el-empty description="aucun bio pour vous"></el-empty>
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li class="flex items-center space-x-3">
                                    <div>
                                        <el-icon>
                                            <phone/>
                                        </el-icon>
                                        Télephone
                                    </div>
                                    <el-tag>
                                        {{ set.getPro?.phone }}
                                    </el-tag>
                                </li>
                                  <li class="flex items-center space-x-3">
                                    <div>
                                        <el-icon>
                                            <UserIcon/>
                                        </el-icon>
                                        Nom
                                    </div>
                                    <el-tag v-if="set.getUser?.firstname">
                                        {{ set.getUser?.firstname }} {{ set.getUser.lastname }}
                                    </el-tag>
                                </li>
                                 <li class="flex items-center space-x-3">
                                    <div>
                                        <el-icon>
                                            <Message/>
                                        </el-icon>
                                        email
                                    </div>
                                    <el-tag>
                                        {{ set.getUser?.email }}
                                    </el-tag>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="12" :md="16">
                    <el-card>
                        <template #header>
                            <div class="text-center">
                                Modifier mon profil
                            </div>
                        </template>
                        <div v-if="props.set.getPro!==null">
                            <FormModificationSetting :pro="set.getPro as setPro" :user="set.getUser as User"/>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="A propos de moi">
            A propos de moi
        </el-tab-pane>
    </el-tabs>
</template>
