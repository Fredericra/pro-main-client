<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { select } from '../Type';


const props = defineProps<{
    value:select[];
    message?:string;
    placeholder?:string;
    showError?:boolean;
}>()
const model = defineModel<string|number>()  
const error = ref<string>() 
const validate = ()=>{
error.value = ""
const value = model.value;
    if(typeof value === "undefined"){
        error.value = props.message || "Veuillez selectionner"
        return;
    }
}

defineExpose({error,validate})
 watch(error,()=>{
    validate()
 })
</script>
<template>
    <el-select v-model="model" @change="validate" :placeholder="placeholder" style="width: 250px;" clearable>
        <el-option
        v-for="(value,index) in props.value"
        :key="index"
        :value="value.value"
        :label="value.label"
        v-bind="$attrs"
        ></el-option>
    </el-select>
     <el-alert
    v-if="showError === true && error != ''"
    :title="error"
    type="warning"
    effect="light"
    show-icon
    :closable="false"
    class="!text-sm"
  />
</template>