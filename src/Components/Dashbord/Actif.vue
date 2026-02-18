<script lang="ts" setup>
import {  Histogram, User as Users } from '@element-plus/icons-vue';
import MainActif from './MainActif.vue';
import type { select, setPro, User } from '../../Type';



const props = defineProps<{
  user:User
  currency:select,
  pro:setPro,
  vente:number
}>()


</script>
<template>
  <div>
    <el-tabs tab-position="right" class="min-h-screen demo-tabs">
      <el-tab-pane class="">
        <template #label>
          <el-icon>
            <Histogram/>
          </el-icon>
          <span class="mx-2">Actif</span>
        </template>
        <MainActif :currency="props.currency" :vente="props.vente"/>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <el-icon>
            <Users/>
          </el-icon>
          <span class="mx-2">
            Profil
          </span>
        </template>
      </el-tab-pane>
       <el-tab-pane>
        <template #label>
          <el-icon>
            <Users/>
          </el-icon>
          <span class="mx-2">
            Pro
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
 
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>