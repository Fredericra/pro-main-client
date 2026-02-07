<script lang="ts" setup>
import { computed } from "vue";
import HeadA from "./Head/HeadA.vue";
import HeadB from "./Head/HeadB.vue";
import type { setPro, User } from "../Type";

const props = defineProps<{
  user:User|null;
  pro:setPro|null;
  isAuth:boolean
}>()

const layout = computed(() => {
  return props.isAuth  && props.user?.set?.verify ? HeadB : HeadA;
});


</script>
<template>
  <component :is="layout" :user="user ?? null" :pro="pro ?? null">
  </component>
</template>
