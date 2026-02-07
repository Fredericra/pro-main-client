<script lang="ts" setup>
import Input from '../../Components/Input.vue';
import { onMounted, reactive, ref } from 'vue';
import type { confirm, User, Validation } from '../../Type';
import { CircleCheckFilled, User as Users } from '@element-plus/icons-vue';
import { userStore } from '../../Auth/Store';
import { useRouter } from 'vue-router';

const store = userStore()
const route = useRouter()
const loading = ref<boolean>(false)
const form = reactive<confirm>({
  confirm: ''
})
const users = ref<User | null>(null)
const confirm = ref<Validation>()
const confirmCount = async () => {
  confirm.value?.validate();
  if (confirm.value?.error === '' && users.value?.set?.code === form.confirm) {
    loading.value = true
    const res = await store.confirm(form)
    loading.value = false
    if(res.status){
      await store.checkAuth()
      await store.checkPro()
      route.push({name:'dash'})
    }
    if (res.field === 'error' && confirm.value) confirm.value.error = res.message;
  }
}
onMounted(async () => {
  const res = await store.getUserActif();
  if (res.field === 'tokenManque') route?.push({ name: 'Login' })
  if (res.status) {
    users.value = res.data as User
  }
})
</script>
<template>
  <el-row :gutter="20">
    <el-col :xs="24" :md="8"></el-col>
    <el-col :xs="24" :md="8">
      <div class="mx-12 py-12">
        <el-card class="!rounded-2xl !shadow-md hover:shadow-indigo-950 !duration-1000">
          <div class="text-center text-2xl mb-6 font-bold">Veuillez confirme votre compte,
            <span class="text-blue-400">{{ users?.set?.lastname?.toLocaleUpperCase() }} {{ users?.set?.lastname }}
            </span>

          </div>
          <hr class="mx-5" />
          <div class="py-5">
            <el-form @submit.default>
              <div class="py-2">
                <Input type="text" ref="confirm" :show-error="true" :prefixe="Users"
                  :confirm="{ password: form.confirm, confirm: users?.set?.code as string, message: 'erreur de confirmation' }"
                  v-model="form.confirm" placeholder="entre votre email" />
              </div>
            </el-form>
          </div>
          <div>
            <el-button v-loading.fullscreen.lock="loading" @click="confirmCount" type="submit"
              :class="users?.set?.code === form.confirm ? '!bg-blue-500' : '!bg-red-600'"
              class="!w-full !text-white !bg-blue-500 !hover:bg-blue-800 !duration-1000">
              <div class="space-x-4" v-if="users?.set?.code === form.confirm">
                <span>Validate</span>
                <el-icon v-if="users?.set?.code === form.confirm">
                  <CircleCheckFilled />
                </el-icon>
              </div>
              <div class="" v-else>
                Confirmation
              </div>
            </el-button>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :xs="24" :md="8"></el-col>
  </el-row>
</template>