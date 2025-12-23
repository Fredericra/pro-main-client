<script lang="ts" setup>
import { Plus, Ticket } from '@element-plus/icons-vue';
import Input from '../Input.vue';

</script>
<template>
    <div class="text-center mt-5 my-5 titre">
        <h2>Entre votre Publication</h2>
    </div>
    <el-form @submit.prevent class="space-y-6">
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input placeholder="nom article" :prefixe="Ticket"/>
            </div>
              <div class="w-full">
                <Input placeholder="nom article" :prefixe="Ticket"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input placeholder="nom article" :prefixe="Ticket"/>
            </div>
              <div class="w-16/12">
                <Input placeholder="nom article" :prefixe="Ticket"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input placeholder="nom article" :prefixe="Ticket"/>
            </div>
              <div class="w-8/12">
                <Input placeholder="nom article" :prefixe="Ticket"/>
            </div>
        </div>
        <el-button type="info" class="btn">
            <span>Ajouter</span>
            <el-icon class="mx-4">
                <Plus/>
            </el-icon>
        </el-button>
    </el-form>
</template>