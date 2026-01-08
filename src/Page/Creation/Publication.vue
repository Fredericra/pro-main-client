<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import FormPub from '../../Components/Creation/FormPub.vue';
import type { select } from '../../Type';
const pub = ref<any[]>([])
const props = defineProps<{
    country:select[],
    pub:any[]
}>()

const publication = (value:any[])=>{
    pub.value = value
}

onMounted(()=>{
    pub.value = props.pub
})
</script>
<template>
    <el-row>
        <el-col :xs="24" :md="16">
            <FormPub
            :country="country"
            @pub="publication"/>
        </el-col>
        <el-col :xs="24" :md="8">
            {{ pub }}
        </el-col>
    </el-row>
</template>