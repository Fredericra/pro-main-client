<script lang="ts" setup>
import{ UploadFilled } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    multiple?:boolean,
    require?:boolean,
    accept?:string
}>()

const modelValue = defineModel<File|File[]|null>()
const error = ref<string>('');
const files = ref<File[]|null>(null)
const Validate = (e:Event)=>{
    const target = e.target as HTMLInputElement;
    const selectFile = target.files ? Array.from(target.files):null;
    files.value = selectFile;

    if(!selectFile || selectFile.length === 0)
    {
        modelValue.value = null;
        error.value = "veuillez uploader un fiche"
        return;
    }
    modelValue.value = props.multiple?selectFile:selectFile[0]
}

defineExpose({error,Validate})
watch(error,()=>{
  Validate
})

</script>
<template>
  <label class="relative cursor-pointer inline-block">
    <span class="bg-blue-600 text-white px-4 py-2 rounded-md flex justify-center items-center space-x-1">
      <el-icon>
        <UploadFilled/>
      </el-icon>
      <span>
          upload file 
      </span>
    </span>
    <input
      type="file"
      :accept="props.accept"
      :multiple="props.multiple?props.multiple:false"
      @change="Validate"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </label>
  <el-alert
    v-if="error != ''"
    :title="error"
    type="warning"
    effect="light"
    show-icon
    :closable="false"
    class="!text-sm"
  />
</template>
