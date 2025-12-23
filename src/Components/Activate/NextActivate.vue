<script lang="ts" setup>
import { Money } from '@element-plus/icons-vue';
import Input from '../Input.vue';


</script>
<template>
    <div class="py-4">
        
        <el-form @submit.prevent class="space-y-4">
            <div>
                <Input placeholder="votre device" :prefixe="Money"/>
            </div>
            <div>
                <Input placeholder="votre device" :prefixe="Money"/>
            </div>
            <div>
                <Input placeholder="votre device" :prefixe="Money"/>
            </div>
            <div>
                <el-button type="default" class="btn">Entre</el-button>
            </div>
        </el-form>
    </div>
</template>