<script lang="ts" setup>
import { ref } from 'vue';
import FormPub from '../../Components/Creation/FormPub.vue';
import type { publication, select } from '../../Type';
import ListPub from '../../Components/Creation/ListPub.vue';

const pub = ref<publication[]>([])
const props = defineProps<{
    country:select[],
    pub:publication[]|[]
}>()

const publication = (pubs:publication[])=>{
    pub.value = pubs
}
const update = (pubs:publication[])=>{
    pub.value = pubs
}

</script>
<template>
    <el-row>
        <el-col :xs="24" :md="16">
            <FormPub
            :country="country"
            @pub="publication"/>
        </el-col>
        <el-col :xs="24" :md="8">
            <ListPub :pub="pub" @update="update"/>
        </el-col>
    </el-row>
</template>