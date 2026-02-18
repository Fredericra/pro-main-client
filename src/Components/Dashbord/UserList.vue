<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { User } from '../../Type';
import { userStore } from '../../Auth/Store';
import { storeToRefs } from 'pinia';
import { CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue';

const store = userStore()
const id = ref<{id:string}[]|[]>([])
const { getAllUser } = storeToRefs(store)

const selection = (val: User[]) => {
    id.value = [...val.map((item:User)=>({id:item._id}))];
    
}

const trash = async()=>{
    if(id.value.length===0) return;
    await store.Posting({data:id.value},'deleteuser')
    await store.checkUserList()
}
const selectable = (row:User)=>!['bokyshoping@gmail.com'].includes(row.email)
const active = async()=>{
}
onMounted(async () => {
    await store.checkUserList()
})
</script>
<template>
    <el-row>
        <el-col :xs="24" :md="14">
            <div>
                <el-table :border="true" :preserve-expanded-content="false" :data="getAllUser" row-key="_id" @selection-change="selection">
                    <el-table-column type="selection" :selectable="selectable"></el-table-column>
                    <el-table-column type="expand">
                        <template #default="scope">
                            <el-table :data="scope.row.set" :border="true">
                                <el-table-column label="Nom" property="lastname"></el-table-column>
                                <el-table-column label="Prenom" property="firstname"></el-table-column>
                                <el-table-column label="Pseudo" property="username"></el-table-column>
                                <el-table-column label="Type">
                                    <template #default="child">
                                        <el-icon>
                                            <circle-check-filled v-if="child.row.verify"/>
                                            <circle-close-filled v-else/>
                                        </el-icon>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
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
                </el-table>
            </div>
        </el-col>
        <el-col :xs="24" :md="10">
              <div class="py-4">
                <div class="flex justify-between items-center">
                    <el-button type="primary" @click="active">
                        <span>Active</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-check-circle"></i>
                        </el-icon>
                    </el-button>
                     <el-button type="danger" @click="trash">
                        <span>Supprimer</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-trash"></i>
                        </el-icon>
                    </el-button>
                     <el-button type="info">
                        <span>Ajouter Admin</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-user-circle"></i>
                        </el-icon>
                    </el-button>
                    <el-button type="success">
                        <span>Retire Admin</span>
                        <el-icon class="mx-2">
                            <i class="fas fa-user-slash"></i>
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>