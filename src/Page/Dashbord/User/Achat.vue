<script lang="ts" setup>
import { Paperclip, ShoppingCart } from '@element-plus/icons-vue';




</script>
<template>
    <el-tabs type="border-card" class="min-h-screen">
        <el-tab-pane>
            <template #label>
                List d'achat
                <el-icon>
                    <ShoppingCart/>
                </el-icon>
            </template>
        </el-tab-pane>
        <el-tab-pane>
            <template #label>
                Journal d'achat
                <el-icon>
                    <Paperclip/>
                </el-icon>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>