<script lang="ts" setup>
import { MapLocation, Plus, Ticket } from '@element-plus/icons-vue';
import Input from '../Input.vue';
import { reactive, ref } from 'vue';
import File from '../file.vue';
import Utility from '../../Utility';
import Select from '../Select.vue';
import { userStore } from '../../Auth/Store';
import type { resData, select, Validation } from '../../Type';
import { storeArticle } from '../../Auth/article';
import { storeToRefs } from 'pinia';

const store = userStore()
const articleStore = storeArticle()
const { getCity } = storeToRefs(articleStore)
const error = ref<string>('')
const loading = ref<boolean>(false)
const title = ref<Validation>()
const code = ref<Validation>()
const pays = ref<Validation>()
const ville = ref<Validation>()
const description = ref<string>()

const props = defineProps<{
    country: select[]
}>()
const form = reactive<Record<string, any>>({
    title: '',
    pays: '',
    code: '',
    ville: '',
    street: '',
    description: '',
    file: null
})
const update = async (value: number | string | boolean) => {
    const list = props.country.find(i => i.label === value)?.isoCode
    await articleStore.checkCitySelect(list as string);
}

const actionPost = async (data: object): Promise<resData> => {
    const res = await store.Posting(data, 'publication');
    if (res.status) {
        await articleStore.checkPub()
        for (let key in form) {
            if (typeof form[key] === 'string') form[key] = '';
            if (typeof form[key] === 'number') form[key] = 0;
            if (key === 'file') form[key] = null;
        }
    }
    else {
        title.value!.error = res.message as string;
    }
    return res
}

const addPub = async () => {
    error.value = ''
    title.value?.validate()
    code.value?.validate()
    pays.value?.validate()
    ville.value?.validate()
    const size = Utility.file(form.file, 2, 2)
    if(description.value === "" || description.value === undefined){
        error.value = "veuillez rempliz le descripton"
        return;
    }
    if (title.value?.error === ''
        && code.value?.error === ''
        && pays.value?.error === ''
        && ville.value?.error === ''
        && error.value === ""
    ) {
        const formdata = new FormData()
        for (let key in form) {
            if (key !== "file") formdata.append(key, form[key]);
        }
        if (form.file !== null) {
            if (size) {
                for (let key of form.file) {
                    formdata.append('files', key);
                }
            }
            else {
                error.value = 'chaque fichier infierieur ou egal 2 m et nombre image et inferieur ou egal 2'
                return
            }
        }
        loading.value = true
        await actionPost(formdata)
        loading.value = false
    }
    loading.value = false

}

</script>
<template>
    <div class="text-center mt-5 my-5 titre">
        <h2>Entre votre Publication</h2>
    </div>
    <el-form @submit.prevent class="space-y-6">
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Input type="text" ref="title" show-error v-model="form.title" placeholder="entre titre publication"
                    :prefixe="Ticket" />
            </div>
            <div class="w-full">
                <Input type="text" ref="code" show-error v-model="form.code" placeholder="entre code votre publicaton "
                    :prefixe="Ticket" />
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <Select show-error ref="pays" v-model="form.pays" :value="country" @change="update"
                    placeholder="entre votre pays" />
            </div>
            <div class="w-full">
                <Select show-error ref="ville" v-model='form.ville' :value="getCity"
                    placeholder="entre votre ville"></Select>
            </div>
            <div class="w-full">
                <Input type="text" ref="adress" placeholder="entre votre adreess" v-model="form.street"
                    :suffix="MapLocation" />
            </div>
        </div>
        <div class="flex space-x-2 mx-5">
            <div class="w-full">
                <QuillEditor 
                v-model:content="description" 
                content-type="html" 
                :options="store.option" class="max-h-40 overflow-hidden overflow-y-scroll"/>
            </div>
        </div>
        <div class="flex space-x-2 mx-5 pt-15">
            <div class="w-full">
                <File multiple v-model="form.file" accept=".jpeg,.png,.jpg" />
                <el-alert v-if="error.length !== 0" type="warning" :title="error"></el-alert>
            </div>
        </div>
        <el-button type="info" @click="addPub" class="btn" v-loading.fullscreen.lock="loading">
            <span>Ajouter</span>
            <el-icon class="mx-4">
                <Plus />
            </el-icon>
        </el-button>
    </el-form>
</template>