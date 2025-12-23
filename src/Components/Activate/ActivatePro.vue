<script lang="ts" setup>
import type { pro, select, Validation } from "../../Type";
import { onMounted, reactive, ref, watch } from "vue";
import { userStore } from "../../Auth/Store";
import Utility from "../../Utility";
import { Place, User } from "@element-plus/icons-vue";
import File from "../file.vue";
import Input from "../Input.vue";
import Select from "../Select.vue";


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
const dataCity = ref<select[]>([])
const country = ref<select[]>([])
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
      await store.getPro();
      loading.value = false
    }
    else {
      FileMessage.value = "Aucun file selectionner ou File depasse 3M"
    }
  }
};


onMounted(async () => {
  const res = await store.getCountry();

  for (let i of res) {
    const name = i.name;
    country.value?.push({ value: name, label: name })
  }

})

watch(() => form.country, async () => {
  dataCity.value = [];
  const countrys = await store.getCountry();
  const select = countrys.find((value) => value.name === form.country);
  phoneCode.value = select?.phonecode as string;
  const citys = await store.getCity(select?.isoCode as string);
  for (let i of citys) {
    const name = i.name;
    dataCity.value.push({ value: name, label: name })
  }
})
watch(() => form.city, () => {
  suffixCity.value = form.city
})
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
        <Select ref="mycountry" v-model="form.country" :value="country" :show-error="true"
          message="veuille entre votre pays" placeholder="entre votre pays" />
      </div>
      <div>
        <Select ref="city" v-model="form.city" :value="dataCity" :show-error="true" message="veuillez votre ville"
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
