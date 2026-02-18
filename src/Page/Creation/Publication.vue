<script lang="ts" setup>
import { onMounted } from 'vue';
import FormPub from '../../Components/Creation/FormPub.vue';
import ListPub from '../../Components/Creation/ListPub.vue';
import { storeArticle } from '../../Auth/article';
import { storeToRefs } from 'pinia';

const store = storeArticle()
const { getCountry,getPub } = storeToRefs(store)

onMounted(async()=>{
    await store.checkCountrySelect()
    await store.checkPub()
})

</script>
<template>
    <el-row>
        <el-col :xs="24" :md="16">
            <FormPub
            :country="getCountry"/>
        </el-col>
        <el-col :xs="24" :md="8">
            <ListPub :pub="getPub"/>
        </el-col>
    </el-row>
</template>