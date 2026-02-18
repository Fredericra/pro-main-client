<script lang="ts" setup>
import type { Component } from "vue";
import { ref, watch, } from "vue";
interface option {
  label:string|number,
  value:string|number
}
const model = defineModel<string | number | boolean>();
const error = ref<string>("");
const props = defineProps<{
  option?:option[]|[],
  style?:string;
  errortype?:string | 'warning';
  rows?:number;
  prefixe?: Component|string;
  suffix?: Component|string;
  type?: string;
  placeholder?: string;
  showError?: boolean;
  requires?: {
    max?: number;
    min?: number;
    message?:string;
  };
  validate?: {
    pattern: string | RegExp;
    message: string;
  };
  message?: string;
  confirm?:{
    password:string,
    confirm:string,
    message?:string
  }
}>();
function validate() {
  error.value = "";
  const value = model.value as any;
  if (value === "") {
    error.value = props.message || "Ce champ est requis";
    return;
  }
  if (props.type && props.type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      error.value =
        props.message || "Veuillez entrer une adresse e-mail valide.";
      return;
    }
  }
  if(props.type && props.type==="telephone"){
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(value)) {
      error.value =
        props.message || "Veuillez entrer un numéro de téléphone valide.";
      return;
    }
  }
  if (props.type && props.type==="number") {
    const numberValue = typeof value === "number"?true:false;
    if (numberValue) {
      error.value = props.message || "Veuillez entrer un nombre valide.";
      return;
    }
  }
  if(props.confirm){
    if(props.confirm.password !== props.confirm.confirm){
        error.value = props.confirm.message || "Les mots de passe ne correspondent pas.";
        return;
    }
  }
  if (props.requires) {
    if (props.requires.min !== undefined && value.length < props.requires.min) {
      error.value = props.requires.message as string || `La longueur minimale est de ${props.requires.min} caractères.` ;
      return;
    }
    if (props.requires.max !== undefined && value.length > props.requires.max) {
      error.value = props.requires.message as string || `La longueur maximale est de ${props.requires.max} caractères.`;
      return;
    }
  }
  if (props.validate) {
    const pattern = props.validate.pattern;
    const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
    if (!regex.test(value)) {
      error.value = props.validate.message || "Format invalide.";
      return;
    }
  }
}

defineExpose({
  validate,
  error,
});
watch(model, () => {
  validate();
});
</script>
<template>
  <el-input
    v-model="model"
    :placeholder="props.placeholder"
    @input="validate"
    class=""
    :options="option"
    :type="props.type==='textarea'?'textarea':props.type||'text'"
    :rows="props.type==='textarea'?props.rows:''"
    :style="props.style"
    clearable
    v-bind="$attrs"
    :show-password="props.type==='password'?true:false"
  >
    <template #prefix v-if="props.prefixe">
      <div v-if="typeof props.prefixe === 'string'">
        {{ props.prefixe }}
      </div>
      <el-icon v-else>
        <component :is="props.prefixe" />
      </el-icon>
    </template>
    <template #suffix v-if="props.suffix">
      <div v-if="typeof props.suffix === 'string'">
        {{ props.suffix }}
      </div>
      <el-icon v-else>
        <component :is="props.suffix" />
      </el-icon>
    </template>
  </el-input>
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
