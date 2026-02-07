<script lang="ts" setup>
import { Service } from '@element-plus/icons-vue';
import NewLetter from '../Admin/NewLetter.vue';
import { onMounted, ref, watch } from 'vue';
import { userStore } from '../../../Auth/Store';
import type { letter, User } from '../../../Type';
import ConfirmMessage from '../../../Components/Message/ConfirmMessage.vue';

const store = userStore()
const newLetter = ref<letter[]>([])

defineProps<{
    user:User
}>()
onMounted(async () => {
    const resLetter = await store.Geting('getletter');
    newLetter.value = resLetter.data as letter[];
})
watch({ newLetter }, async () => {
    const resLetter = await store.Geting('getletter');
    newLetter.value = resLetter.data as letter[];
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
        <el-tab-pane>
            <template #label>
                <span>Message</span>
                <el-icon class="mx-2">
                    <i class="fas fa-envelope"></i>
                </el-icon>
            </template>

        </el-tab-pane>
        <el-tab-pane>
            <template #label>
                <span>Notifications</span>
                <el-icon class="mx-2">
                    <i class="fas fa-bell"></i>
                </el-icon>
            </template>
        </el-tab-pane>
        <el-tab-pane v-if="user.set?.admin">
            <template #label>
                <span>News letter</span>
                <el-icon class="mx-2">
                    <el-icon>
                        <service />
                    </el-icon>
                </el-icon>
            </template>
            <new-letter :letter="newLetter" />
        </el-tab-pane>
         <el-tab-pane v-if="user.set?.admin">
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