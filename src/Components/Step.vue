<script lang="ts" setup>

const props = defineProps<{
    step?:number
}>()
</script>
<template>
  <el-steps style="max-width: 600px" :active="props.step || 0" finish-status="success">
    <el-step title="Professionel" />
    <el-step title="Payment" />
    <el-step title="ressource" />
  </el-steps>
</template>
