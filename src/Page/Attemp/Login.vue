<script lang="ts" setup>
import Input from '../../Components/Input.vue';
import { reactive, ref } from 'vue';
import type { login, Validation } from '../../Type';
import { Lock, Message } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { userStore } from '../../Auth/Store';


const store = userStore()
const route = useRouter()
const form = reactive<login>({
    email: '',
    password: ''
})

const email = ref<Validation>()
const password = ref<Validation>()
const loading = ref<boolean>(false)

const submit = async() => {
    email.value?.validate()
    password.value?.validate()
    if (String(email.value?.error).length <= 0 
        || String(password.value?.error).length <= 0
    ) {
      const res = await store.Login(form)
      if(res.status)
      {
        localStorage.setItem('token',res.token as string)
        if(res.verify)
        {
          loading.value = true
          await store.checkAuth()
          route.push({name:'Dash'})
          loading.value = false

        }
        else{
          route.push({name:'Validate'})
        }

      }
      if(res.field === 'error' && email.value) email.value.error = res.message as string
      if(res.field === 'email' && email.value) email.value.error = res.message as string
      if(res.field === 'password' && password.value) password.value.error = res.message as string
     
    }
}
</script>
<template>
    <el-row :gutter="20">
        <el-col :xs="24" :md="8"></el-col>
        <el-col :xs="24" :md="8">
            <div class="mx-12 py-12">
        <el-card
          class="!rounded-2xl !shadow-md hover:shadow-indigo-950 !duration-1000"
        >
          <div class="text-center text-2xl mb-6 font-bold">Se connecter</div>
          <hr class="mx-5" />
          <div class="py-5">
            <el-form @submit.default>
              <div class="py-2">
                <Input
                  type="email"
                  ref="email"
                  :show-error="true"
                  :prefixe="Message"
                  v-model="form.email"
                  placeholder="entre votre email"
                />
              </div>
              <div class="py-5">
                <Input
                  type="password"
                  :show-error="true"
                  ref="password"
                  :requires="{ min: 7, max: 14 }"
                  :prefixe="Lock"
                  v-model="form.password"
                  placeholder="entre votre mots de pass"
                />
              </div>
            
              <div class="ml-4 py-2 flex space-x-4">
                <input type="checkbox" name="" id="" v-model="form.check"/>
                <p>
                  souvient moi
                </p>
              </div>
            </el-form>
          </div>
          <div>
            <el-button
              v-loading.fullscreen.lock="loading"
              @click="submit"
              type="submit"
              class="!w-full !text-white !bg-blue-500 !hover:bg-blue-800 !duration-1000"
            >
              Se connecter
            </el-button>
          </div>
        </el-card>
      </div>
        </el-col>
        <el-col :xs="24" :md="8"></el-col>
    </el-row>
</template>