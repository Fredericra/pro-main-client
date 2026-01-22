<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import HeadA from "./Head/HeadA.vue";
import HeadB from "./Head/HeadB.vue";
import { userStore } from "../Auth/Store";
import { useRoute } from "vue-router";
import type { setPro, User } from "../Type";


const user = ref<User|null>(null)
const profile = ref<setPro|null>(null)
const route = useRoute()
const store = userStore()
onMounted(async()=>{
  await store.checkAuth()
  user.value = store.users
})
watch(()=>store.user,async(newuser,olduser)=>{
  if(newuser?._id === olduser?._id) return;
  await store.checkAuth()
  user.value = store.users
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
