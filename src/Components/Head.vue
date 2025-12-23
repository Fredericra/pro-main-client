<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import HeadA from "./Head/HeadA.vue";
import HeadB from "./Head/HeadB.vue";
import { userStore } from "../Auth/Store";


const user = ref<object|null>(null)
const store = userStore()
onMounted(async()=>{
  user.value = await store.checkAuth()
})
watch(()=>store.user,async()=>{
  user.value = await store.checkAuth()
})
const layout = computed(() => {
  return store.isAuth ? HeadB : HeadA;
});


</script>
<template>
  <component :is="layout" :user="user">
  </component>
</template>
