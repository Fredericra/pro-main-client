<script lang="ts" setup>
import { Service } from '@element-plus/icons-vue';
import NewLetter from '../Admin/NewLetter.vue';
import { onMounted, ref } from 'vue';
import { userStore } from '../../../Auth/Store';
import type { letter } from '../../../Type';
import ConfirmMessage from '../../../Components/Message/ConfirmMessage.vue';
import MessageInvite from '../../../Components/Message/MessageInvite.vue';
import { storeToRefs } from 'pinia';
import { storeArticle } from '../../../Auth/article';

const store = userStore()
const store2 = storeArticle()
const newLetter = ref<letter[]>([])

const { getUser } = storeToRefs(store)

onMounted(async () => {
    await store.checkAuth()
    await store2.checkNewLetter()
})

</script>
<template>
    <el-tabs type="border-card" class="min-h-screen">
        <el-tab-pane>
            <template #label>
                <span>Assistance</span>
                <el-icon class="mx-2">
                    <i class="fas fa-headset"></i>
                </el-icon>
            </template>
        </el-tab-pane>
        <el-tab-pane v-if="getUser?.set?.admin">
            <template #label>
                <span>Message</span>
                <el-icon class="mx-2">
                    <i class="fas fa-envelope"></i>
                </el-icon>
            </template>
            <message-invite></message-invite>
        </el-tab-pane>
        <el-tab-pane>
            <template #label>
                <span>Notifications</span>
                <el-icon class="mx-2">
                    <i class="fas fa-bell"></i>
                </el-icon>
            </template>
        </el-tab-pane>
        <el-tab-pane v-if="getUser?.set?.admin">
            <template #label>
                <span>News letter</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <service />
                    </el-icon>
                </el-icon>
            </template>
            <new-letter/>
        </el-tab-pane>
         <el-tab-pane v-if=" getUser?.set?.admin">
            <template #label>
                <span>Personalise confirmation</span>
                <el-icon class="mx-2">
                    <i class="fas fa-check"></i>
                </el-icon>
            </template>
            <confirm-message action="messageletter"></confirm-message>
        </el-tab-pane>
    </el-tabs>
</template>