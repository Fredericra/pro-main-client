<script lang="ts" setup>
import { ref } from 'vue';
import FormArticle from '../../Components/Creation/FormArticle.vue';
import type { Article as TypeArticle, select, setPro } from '../../Type';
import ListArticle from '../../Components/Creation/ListArticle.vue';

const props = defineProps<{
  pro: setPro | null,
  article: TypeArticle[]|null,
  country:select[]
}>();
const articles = ref<TypeArticle[]|[]>();
const update = (value: TypeArticle[]) => {
  articles.value = value
}
const updateArticle = (value: TypeArticle[]) => {
  articles.value = value
}

</script>
<template>
  <el-row>
    <el-col :xs="24" :md="16">
      <FormArticle 
      @update-article="update" 
      :pro="props.pro" 
      :country="props.country"/>
    </el-col>
    <el-col :xs="24" :md="8">
       <ListArticle 
       @update="updateArticle" 
       :article="articles as TypeArticle[]"/>
    </el-col>
  </el-row>
</template>
