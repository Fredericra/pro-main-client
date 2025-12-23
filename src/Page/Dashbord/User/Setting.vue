<script lang="ts" setup>
import Avance from '../../Setting/Avance.vue';
import Portefeuil from '../../Setting/Portefeuil.vue';
import Pro from '../../Setting/Pro.vue';
import Profil from '../../Setting/Profil.vue';

</script>
<template>
  <el-tabs type="border-card" class="h-full">
    <el-tab-pane label="Acceder Mode Professionel">
        <Pro/>
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
