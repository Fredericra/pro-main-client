<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { userStore } from '../../../Auth/Store.ts';
import Avance from '../../Setting/Avance.vue';
import Portefeuil from '../../Setting/Portefeuil.vue';
import Pro from '../../Setting/Pro.vue';
import Profil from '../../Setting/Profil.vue';
import { onMounted } from 'vue';

const store = userStore();
const {getPro,getUser} = storeToRefs(store)
onMounted(async()=>{
    await store.checkPro()
    await store.getUserCheck()
})
</script>
<template>
  <el-tabs type="border-card" class="min-h-screen">
    <el-tab-pane label="Acceder Mode Professionel">
        <Pro/>
    </el-tab-pane>
    <el-tab-pane label="Modifier Profil">
        <Profil :set="{getPro,getUser}"/>
    </el-tab-pane>
    <el-tab-pane label="Ajouter Portefeuil">
        <Portefeuil/>
    </el-tab-pane>
    <el-tab-pane label="Parametre avancée">
        <Avance/>
    </el-tab-pane>
  </el-tabs>
</template>
