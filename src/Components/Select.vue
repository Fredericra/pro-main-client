<script lang="ts" setup>
import { ref, watch } from "vue";
import type { select } from "../Type";

const props = defineProps<{
  value: select[];
  message?: string;
  placeholder?: string;
  showError?: boolean;
}>();
const emit = defineEmits<{
  (e: "change", value: string | number): void;
}>();

const model = defineModel<string | number>();
const error = ref<string>();
const validate = (event: string | number) => {
  error.value = "";
  emit("change", event as string | number);
  if (model.value === "") {
    error.value = props.message || "Veuillez selectionner";
    return;
  }
};

defineExpose({ error, validate });
watch(error, () => {
  validate(model.value as string | number);
});
</script>
<template>
  <el-select
    v-model="model"
    @change="validate"
    :placeholder="placeholder"
    style="width: 250px"
    filterable
    clearable
  >
    <el-option
      v-for="item in props.value"
      :key="item.value"
      :value="item.value"
      v-bind="$attrs"
    >
      <span style="float: left">{{ item.value }}</span>
      <span
        style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
      >
        {{ item.label }}
      </span>
    </el-option>
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
