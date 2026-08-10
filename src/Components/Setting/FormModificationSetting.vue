<script lang="ts" setup>
import { Location, MapLocation, Phone, User, UserFilled } from '@element-plus/icons-vue';
import { type setPro, type User as UserType } from '../../Type';
import Input from '../Input.vue';
import Select from '../Select.vue';
import { userStore } from '../../Auth/Store.ts';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const store = userStore();
const { article } = storeToRefs(store)
const props = defineProps<{
    user:UserType,
    pro:setPro
}>()
const form = reactive<Record<string,any>>({
    id:props.user._id as string,
    image:null,
    boxname:props.pro.nom,
    device:props.pro.device,
    firstname:props.user.set?.firstname as string,
    lastname:props.user.set?.lastname as string,
    country:props.pro.country,
    city:props.pro.city,
    phone:props.pro.phone as string,
    article:props.pro.article,
    bio:props.user.set?.bio
})
</script>
<template>
    <div>
        <el-form @prevent.default class="space-y-2">
            <div class="flex space-x-2">
                <Input v-model="form.boxname" :prefixe="User"/>
                <Input v-model="form.phone" :prefixe="Phone" />
                <Select :value="article" v-model="form.article" placeholder="entre votre type article"/>
            </div>
            <div class="flex space-x-2">
                <Input v-model="form.country" :prefixe="Location" placeholder="entre votre pays"/>
                <Input v-model="form.city" :prefixe="MapLocation" placeholder="entre votre ville ou region"/>
            </div>
            <div class="flex space-x-2">
                <Input v-model="form.firstname" :prefixe="UserFilled" placeholder="entre votre nom"/>
                <Input v-model="form.lastname" :prefixe="UserFilled" placeholder="entre votre prenom"/>
            </div>
            <div>
                <Input type="textarea" v-model="form.bio" placeholder="entre votre description"/>
            </div>
            <div>
                <el-button type="primary" class="w-full">
                    Applique le modification
                </el-button>
            </div>
            
        </el-form>
    </div>
</template>