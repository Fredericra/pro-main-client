<script lang="ts" setup>
import { CollectionTag, Upload } from '@element-plus/icons-vue';
import type { Article } from '../../Type';
import Input from '../Input.vue';

const props = defineProps<{
    article:Article[]|null
}>()
const update = ()=>{
    console.log(props.article);
}
</script>
<template>
    <div v-for="(value,index) in props.article" :key="index">
        <p>
            <span class="mx-4">Modifier</span>
            <span class="font-bold underline">{{ value.title }}</span>
        </p>
        <div class="flex justify-between items-center py-2 space-x-3">
            <div>
                <Input type="number" v-model="value.price" :prefixe="value.device"/>
            </div>
              <div>
                <Input type="number" v-model="value.priceI" :prefixe="value.device"/>
            </div>
            <div>
                <Input type="number" v-model="value.quantity" :suffix="CollectionTag"/>
            </div>
        </div>
        <hr class="py-2 text-gray-400 ">
    </div>
    <div class="flex">
        <el-button type="primary" class="w-full" @click="update">
            <el-icon>
                <Upload/>
            </el-icon>
            <span>Update</span>
        </el-button>
    </div>
</template>