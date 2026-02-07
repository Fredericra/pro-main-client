<script lang="ts" setup>
import type { setPro } from '../../../Type';
import Avance from '../../Setting/Avance.vue';
import Portefeuil from '../../Setting/Portefeuil.vue';
import Pro from '../../Setting/Pro.vue';
import Profil from '../../Setting/Profil.vue';

const props = defineProps<{
    pro:setPro|null
}>()

</script>
<template>
  <el-tabs type="border-card" class="min-h-screen">
    <el-tab-pane label="Acceder Mode Professionel">
        <Pro :pro="pro"/>
    </el-tab-pane>
    <el-tab-pane label="Modifier Profil">
        <Profil/>
    </el-tab-pane>
    <el-tab-pane label="Ajouter Portefeuil">
        <Portefeuil/>
    </el-tab-pane>
    <el-tab-pane label="Parametre avancée">
        <Avance/>
    </el-tab-pane>
  </el-tabs>
</template>
