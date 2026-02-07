<script lang="ts" setup>
import {
  BellFilled,
  HomeFilled,
  Message,
  Setting,
  User as Users,
  User as UserIcon,
  SwitchButton,
  Menu,
  ShoppingBag,
  Box,
  DataLine,
  UserFilled,
} from "@element-plus/icons-vue";
import { userStore } from "../../Auth/Store";
import type { setPro, User } from "../../Type";
import { useRouter } from "vue-router";
import { ref} from "vue";


const store = userStore();
const profile = ref<setPro|null>(null)
const loading =ref<boolean>(false)
const props = defineProps<{
  user: User|null ;
  pro: setPro|null;
}>();
const route = useRouter();

const LoginOut = async () => {
  loading.value = true
  await store.loginOut()
  route.push({ name: "Home" });
  loading.value = false
};


</script>
<template>
  <el-row
    class="py-3 px-4 shadow-md hover:shadow-2xl shadow-white hover:shadow-indigo-900 bg-indigo-800 transition-all duration-1000"
  >
    <el-col :xs="24" :md="8">
      <div class="">
        <router-link
          :to="{ name: 'Dash' }"
          class="text-white hover:text-blue-950 flex items-center space-x-2"
        >
          <el-icon>
            <Message />
          </el-icon>
          <p class="">{{ props.user?.email }}</p>
        </router-link>
      </div>
    </el-col>
    <el-col :xs="24" :md="8">
      <div class="flex justify-around items-center">
        <div>
          <router-link :to="{ name: 'Dash' }" class="dash-menu">
            <el-icon>
              <Menu />
            </el-icon>
            <span>Dashbord</span>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Achat' }" class="dash-menu">
            <el-icon>
              <ShoppingBag />
            </el-icon>
            <span> Achat </span>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Ticket' }" class="dash-menu">
            <el-icon>
              <Box />
            </el-icon>
            <span> Ticket </span>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Creation' }" class="dash-menu">
            <el-icon>
              <DataLine />
            </el-icon>
            <span> Creation </span>
          </router-link>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :md="8" class="">
      <div class="flex justify-end space-x-5 mx-4 items-center">
        <div v-if="props.pro!==null">
          
        </div>
        <div class="space-x-4">
          <router-link :to="{ name: 'Home' }">
            <el-icon class="!text-white !text-lg">
              <HomeFilled />
            </el-icon>
          </router-link>
          <router-link :to="{ name: 'Message' }">
            <el-icon class="!text-white !text-lg">
              <Message />
            </el-icon>
          </router-link>
          <router-link :to="{ name: 'Notif' }">
            <el-icon class="!text-white !text-lg">
              <BellFilled />
            </el-icon>
          </router-link>
        </div>
        <el-dropdown class="">
          <span class="el-dropdown-link" v-if="props.pro===null">
            <el-icon class="!text-white">
              <UserIcon />
            </el-icon>
          </span>
           <span class="el-dropdown-link" v-else>
            <el-avatar  :src="props.pro?props.pro.set?.link:''" :size="20"></el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-item @click="LoginOut" v-loading.fullscreen.lock="loading">
              <span class="">Deconnexion</span>
              <el-icon class="mx-4">
                <SwitchButton />
              </el-icon>
            </el-dropdown-item>
            <el-dropdown-item v-if="props.user && props.user.set?.admin" @click="route.push({ name: 'DashAdmin' })">
              <span class="pr-4">Admin</span>
              <el-icon class="mx-10">
                <Users />
              </el-icon>
            </el-dropdown-item>
            <el-dropdown-item @click="route.push({ name: 'Setting' })">
              <span class="pr-4">Setting</span>
              <el-icon class="mx-10">
                <Setting />
              </el-icon>
            </el-dropdown-item>
            <el-dropdown-item v-if="profile!==null">
              <span class="pr-4">
                Profile
              </span>
              <el-icon class="mx-10">
                <UserFilled/>
              </el-icon>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
