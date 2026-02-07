<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { User } from '../../Type';
import { userStore } from '../../Auth/Store';

const store = userStore()
const listSelect = ref<User[]>([])
const userList = ref<User[]>([])
onMounted(async () => {
    const res = await store.Geting('getalluser')
    userList.value = res.data as User[]
})

const selection = (val: User[]) => {
    listSelect.value = val
    
}

const trash = async()=>{
    const data = []
    if(listSelect.value.length === 0) return;
    for(let x of listSelect.value){
        data.push(x._id)
    }
    const res = await store.Posting({data:data},'deleteuser')
    userList.value = res.data as User[]
}
const selectable = (row:User)=>!['bokyshoping@gmail.com'].includes(row.email)
const active = async()=>{
}
</script>
<template>
    <el-row>
        <el-col :xs="24" :md="14">
            <div>
                <el-table :border="true" :data="userList" row-key="_id" @selection-change="selection">
                    <el-table-column type="selection" :selectable="selectable"></el-table-column>
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