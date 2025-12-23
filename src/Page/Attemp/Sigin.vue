<script lang="ts" setup>
import { Key, Lock, Message, User } from "@element-plus/icons-vue";
import Input from "../../Components/Input.vue";
import type { sigin, Validation } from "../../Type";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../Auth/Store";

const form = reactive<sigin>({
  username: "",
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  check: false,
  passwordConfirm: "",
});

const store = userStore()
const route = useRouter()

const username = ref<Validation | null>(null);
const lastname = ref<Validation | null>(null);
const firstname = ref<Validation | null>(null);
const email = ref<Validation>();
const password = ref<Validation>();
const confirm = ref<Validation>();

const signup = async () => {
  username.value?.validate();
  lastname.value?.validate();
  firstname.value?.validate();
  email.value?.validate();
  password.value?.validate();
  confirm.value?.validate();
  if (username.value?.error === ""
  || lastname.value?.error === ""
  || firstname.value?.error === ""
  || email.value?.error === ""
  || password.value?.error === ""
  || confirm.value?.error === ""
  ) {
    const res = await store.register(form);
    if(res.status === true)
    {
      localStorage.setItem('token',res.token as string);
      route.push({name:'Validate'})
    }
    else
    {
      if(res.field === 'email')
      {
        if(email.value) email.value.error = res.message as string;
        route.push({name:'Login'})

      }
      else{
        if(username.value) username.value.error = res.message as string;
        if(firstname.value) firstname.value.error = res.message as string;
        if(email.value) email.value.error = res.message as string;
        if(password.value) password.value.error = res.message as string;
      }
      
    }
  }
};

</script>
<template>
  <el-row :gutter="12">
    <el-col :xs="24" :md="8"></el-col>
    <el-col :xs="24" :md="8">
      <div class="mx-12 py-12">
        <el-card class="!rounded-2xl !shadow-md hover:shadow-indigo-950 !duration-1000">
          <div class="text-center text-2xl mb-6 font-bold">S'inscrire</div>
          <hr class="mx-5" />
          <div class="py-4">
            <el-form @submit.prevent>
              <div class="py-2">
                <Input type="text" ref="username" :show-error="true" :requires="{
                  min: 6,
                  max: 20
                }" :prefixe="User" v-model="form.username" placeholder="entre votre pseudo" />
              </div>
              <div class="py-2">
                <Input type="text" ref="firstname" :show-error="true" :prefixe="User" v-model="form.firstname"
                  placeholder="entre votre nom" />
              </div>
              <div class="py-2">
                <Input type="text" ref="lastname" :show-error="true" :prefixe="User" v-model="form.lastname"
                  placeholder="entre votre prenom" />
              </div>
              <div class="py-2">
                <Input type="email" ref="email" :show-error="true" :prefixe="Message" v-model="form.email"
                  placeholder="entre votre email" />
              </div>
              <div class="py-2">
                <Input type="password" :show-error="true" ref="password" :requires="{ min: 7, max: 14 }" :prefixe="Lock"
                  v-model="form.password" placeholder="entre votre mots de pass" />
              </div>
              <div class="py-2">
                <Input type="password" :show-error="true" ref="confirm" :confirm="{
                  password: form.password,
                  confirm: form.passwordConfirm,
                }" :prefixe="Key" v-model="form.passwordConfirm" placeholder="confirmation de votre mots de pass" />
              </div>
              <div class="ml-4 flex space-x-4">
                <input type="checkbox" name="" id="" v-model="form.check" />
                <p>
                  j'accepte le
                  <router-link class="text-blue-400" to="">le terme et le contrats</router-link>
                </p>
              </div>
              <div>
                <el-button type="submit" @click="signup" class="!w-full !text-white !bg-blue-500 !hover:bg-blue-800 !duration-1000">
                  S'inscrire
                </el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :xs="24" :md="8"></el-col>
  </el-row>
</template>

