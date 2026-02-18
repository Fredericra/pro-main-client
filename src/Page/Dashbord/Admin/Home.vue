<script lang="ts" setup>
import { Bell, CircleCheckFilled, Message, PictureRounded, Service, UserFilled } from '@element-plus/icons-vue';
import ConfirmMessage from '../../../Components/Message/ConfirmMessage.vue';
import { ref } from 'vue';
import Caroussel from '../../../Components/Dashbord/Caroussel.vue';

const confirm = ref<string>('')

</script>
<template>
    <el-tabs type="border-card" class="min-h-screen">
        <el-tab-pane>
            <template #label>
                <span>News letter</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <Service />
                    </el-icon>
                </el-icon>
            </template>
            <ConfirmMessage action="messageletter"/>
        </el-tab-pane>
         <el-tab-pane>
            <template #label>
                <span>Message Letters</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <Message />
                    </el-icon>
                </el-icon>
            </template>
        </el-tab-pane>
         <el-tab-pane>
            <template #label>
                <span>Message Confirm</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <CircleCheckFilled />
                    </el-icon>
                </el-icon>
            </template>
            <div>
                <ConfirmMessage action="messageconfirm"/>
            </div>
        </el-tab-pane>
         <el-tab-pane>
            <template #label>
                <span>News letter</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <Service />
                    </el-icon>
                </el-icon>
            </template>
        </el-tab-pane>
         <el-tab-pane>
            <template #label>
                <span>Tous User</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                </el-icon>
            </template>
        </el-tab-pane>
         <el-tab-pane>
            <template #label>
                <span>Abonnement</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <Bell />
                    </el-icon>
                </el-icon>
            </template>
        </el-tab-pane>
         <el-tab-pane>
            <template #label>
                <span>Carouselle</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <PictureRounded/>
                    </el-icon>
                </el-icon>
            </template>
            <Caroussel/>
        </el-tab-pane>
         
    </el-tabs>
</template>