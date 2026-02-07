<script lang="ts" setup>
import type { pro, select, Validation } from "../../Type";
import { reactive, ref } from "vue";
import { userStore } from "../../Auth/Store";
import Utility from "../../Utility";
import { Place, User } from "@element-plus/icons-vue";
import File from "../file.vue";
import Input from "../Input.vue";
import Select from "../Select.vue";
import { storeArticle } from "../../Auth/article";
import { storeToRefs } from "pinia";


const ArticleStore = storeArticle()
const { country,getCountry,getCity } = storeToRefs(ArticleStore)
const props = defineProps<{
  country:select[]
}>()

const form = reactive<pro>({
  nom: "",
  phone: "",
  place: "",
  country: "",
  city: "",
  file: null,
});


const FileMessage = ref<string|null>(null)
const suffixCity = ref<string>('')
const phoneCode = ref<string>('261')
const city = ref<Validation>();
const nom = ref<Validation>();
const phone = ref<Validation>();
const mycountry = ref<Validation>()
const place = ref<Validation>();
const loading = ref<boolean>(false)
const store = userStore();
const active = async () => {
  const formUpload = new FormData();
  const size = Utility.file(form.file, 3);
  nom.value?.validate();
  phone.value?.validate();
  place.value?.validate();
  mycountry.value?.validate()
  city.value?.validate()
  formUpload.append("nom", form.nom);
  formUpload.append("phone", phoneCode.value + form.phone);
  formUpload.append("country", form.country)
  formUpload.append('city', form.city)
  formUpload.append("place", form.place as string);
  formUpload.append("file", form.file as any);
  if (nom.value?.error === "" || phone.value?.error === "") {
    if (size) {
      loading.value = true
      FileMessage.value = null
      await store.Posting(formUpload, "/Pro");
      await store.checkPro();
      loading.value = false
    }
    else {
      FileMessage.value = "Aucun file selectionner ou File depasse 3M"
    }
  }
};

const search = async(value:string|number)=>{
  const IsoCode = country.value?.find(i=>i.value === value)
  phoneCode.value = IsoCode?.phoneCode as string
  await ArticleStore.checkCitySelect(IsoCode?.isoCode as string)
}

</script>
<template>
  <div class="p-8 card" v-loading.fullscreen.lock="loading">
    <el-form @submit.prevent class="space-y-4">
      <div>
        <Input type="text" show-error v-model="form.nom" ref="nom" :prefixe="User" placeholder="entre votre nom box" />
      </div>
      <div>
        <Input type="text" show-error v-model="form.place" ref="place" :prefixe="Place"
          :suffix="` ${suffixCity ? suffixCity : ''}`" placeholder="entre votre nom place" />
      </div>
      <div>
        <Select ref="mycountry" @change="search" v-model="form.country" :value="getCountry" :show-error="true"
          message="veuille entre votre pays" placeholder="entre votre pays" />
      </div>
      <div>
        <Select ref="city" v-model="form.city" :value="getCity" :show-error="true" message="veuillez votre ville"
          placeholder="selectionner votre ville" />
      </div>
      <div>
        <Input type="telephone" show-error v-model="form.phone" ref="phone" :prefixe="`+${phoneCode ? phoneCode : '***'}`"
          :requires="{ max: 9, min: 9, message: 'le message a 9 caracteur' }" placeholder="entre votre numero" />
      </div>
      <div>
      </div>
      <div>
        <File ref="file" v-model="form.file" :require="true" accept=".jpeg, .jpg, .png" />
        <el-alert type="warning" show-icon :title="FileMessage" v-if="FileMessage!==null"></el-alert>
      </div>
      <div>
        <el-button class="w-full" type="primary" @click="active">
          Active
        </el-button>
      </div>
    </el-form>
  </div>
</template>
