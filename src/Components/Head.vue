<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import HeadA from "./Head/HeadA.vue";
import HeadB from "./Head/HeadB.vue";
import { userStore } from "../Auth/Store";
import { useRoute } from "vue-router";
import type { setPro } from "../Type";


const user = ref<object|null>(null)
const profile = ref<setPro|null>(null)
const route = useRoute()
const store = userStore()
onMounted(async()=>{
  user.value = await store.checkAuth()
})
watch(()=>store.user,async()=>{
  user.value = await store.checkAuth()
})
watch(()=>route.name,async()=>{
  profile.value = await store.getPro()
})
const layout = computed(() => {
  return user.value ? HeadB : HeadA;
});


</script>
<template>
  <component :is="layout" :user="user" :profile="profile">
  </component>
</template>
