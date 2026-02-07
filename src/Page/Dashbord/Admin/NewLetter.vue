<script lang="ts" setup>
import { CircleCheck } from '@element-plus/icons-vue';
import type { letter } from '../../../Type';
import { ref } from 'vue';
import { userStore } from '../../../Auth/Store';

const store = userStore()
const message = ref<HTMLAllCollection>()
defineProps<{
    letter: letter[] | []
}>()
const handleselect = (val: letter[]) => {
    console.log(val);
}

</script>
<template>
    <el-row gutter="24">
        <el-col :xs="24" :md="14">
            <el-table :data="letter" :border="true" style="width: 100%;" row-key="_id" @selection-change="handleselect">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="Email" property="email"></el-table-column>
                <el-table-column label="Date">
                    <template #default="scope">
                        {{ new Date(scope.row._createdAt).toLocaleDateString('fr-FR') }}
                    </template>
                </el-table-column>
                <el-table-column label="Time">
                    <template #default="scope">
                        {{ new Date(scope.row._createdAt).toLocaleTimeString() }}
                    </template>
                </el-table-column>
                <el-table-column label="type">
                    <div class="flex justify-center items-center">
                        <el-icon>
                            <CircleCheck />
                        </el-icon>
                    </div>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :xs="24" :md="10">
            <div>
                <QuillEditor
                style="max-height:250px;overflow: hidden;overflow-y: auto;" :options="store.option" content-type="html" v-model:content="message" theme="snow" />
            </div>
            <div class="py-4">
                <div class="flex justify-between items-center">
                    <el-button type="primary">
                        <span>Envoyer</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-paper-plane"></i>
                        </el-icon>
                    </el-button>
                     <el-button type="danger">
                        <span>Supprimer</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-trash"></i>
                        </el-icon>
                    </el-button>
                     <el-button type="info">
                        <span>Desabonner</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-bell-slash"></i>
                        </el-icon>
                    </el-button>
                    <el-button type="success">
                        <span>Reabonner</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-bell"></i>
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>