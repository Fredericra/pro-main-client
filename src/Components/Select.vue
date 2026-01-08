<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { select } from '../Type';


const props = defineProps<{
    value: select[];
    message?: string;
    placeholder?: string;
    showError?: boolean;
}>()
const emit = defineEmits<{
    (e: 'change', value: string | number): void
}>()


const model = defineModel<string | number>()
const error = ref<string>()
const validate = (event: string | number) => {
    error.value = ""
    emit('change', event as string | number)
    if (event === undefined) {
        error.value = props.message || "Veuillez selectionner"
        return;
    }
   
}

defineExpose({ error, validate })
watch(error, () => {
    validate(model.value as string | number)
})
</script>
<template>
    <el-select v-model="model" @change="validate" :placeholder="placeholder" style="width: 250px;" clearable>
        <el-option v-for="(value, index) in props.value" :key="index" :value="value.value" :label="value.label"
            v-bind="$attrs"></el-option>
    </el-select>
    <el-alert v-if="showError === true && error != ''" :title="error" type="warning" effect="light" show-icon
        :closable="false" class="!text-sm" />
</template>