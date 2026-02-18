<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeArticle } from '../../Auth/article';
import type { letter } from '../../Type';
import { BellFilled, Delete, MuteNotification, Promotion } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';

const loading = ref<boolean>(false)
const id = ref<{id:string,email:string}[]>()
const store2 = storeArticle()
const { getNewLetter } = storeToRefs(store2)
const envoyer = ()=>{

}
const handleselect = (val:letter[])=>{
   id.value = [...val.map((item:letter)=>({id:item._id,email:item.email}))];
}
onMounted(async()=>{
    await store2.checkLetter('messageletter');
    await store2.checkNewLetter()
})
const trashMessage = async()=>{

}
</script>
<template>
    <el-row gutter="100">
        <el-col :xs="24" :md="14">
            <el-table 
            :data="getNewLetter" 
            :border="true" 
            :preserve-expanded-content="false"
            style="width: 100%;" row-key="id" @selection-change="handleselect">
            <el-table-column type="expand">
                <template #default="scope">
                    <el-table :data="scope.row.set" :border="false">
                        <el-table-column >
                            <template #default="scopechild">
                                <div>Message</div>
                                <div>
                                    {{ scopechild.row.message }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
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
                    <template #default="scope">
                        <div class="flex justify-center items-center">
                            <el-icon v-if="scope.row.user">
                                <UserFilled/>
                            </el-icon>
                            <el-icon v-else>
                                <CircleCheckFilled/>
                            </el-icon>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :xs="24" :md="10">
            <div>
               <div class="flex justify-center item-center">
                    <el-button type="primary" @click="envoyer" v-loading.fullscreen.lock="loading">
                        <span>Envoyer</span>
                        <el-icon class="mx-2">
                            <Promotion/>
                        </el-icon>
                    </el-button>
                    <el-button type="success">
                        <span>Abonner</span>
                        <el-icon class="mx-2">
                            <BellFilled/>
                        </el-icon>
                    </el-button>
                      <el-button type="Info">
                        <span>Desabonner</span>
                        <el-icon class="mx-2">
                            <MuteNotification/>
                        </el-icon>
                    </el-button>
                      <el-button type="danger" @click="trashMessage">
                        <span>Supperimer</span>
                        <el-icon class="mx-2">
                            <Delete/>
                        </el-icon>
                    </el-button>
               </div>
            </div>
            <div class="flex justify-center items-center py-4">
                <div v-html="store2.getLetter" class="m-5"></div>
            </div>
        </el-col>
    </el-row>
</template>