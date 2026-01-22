<script lang="ts" setup>


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
    </el-tabs>
</template>