<script lang="ts" setup>
import { Handbag, Money, Plus, ShoppingCart, ShoppingCartFull, Ticket } from '@element-plus/icons-vue';
import Input from '../Input.vue';
import { onMounted, reactive, ref } from 'vue';
import Select from '../Select.vue';
import type {  select, setPro, Validation } from '../../Type';
import File from '../file.vue';
import Utility from '../../Utility';
import { storeArticle } from '../../Auth/article';
import { storeToRefs } from 'pinia';
import { userStore } from '../../Auth/Store';


const props = defineProps<{
    pro: setPro | null,
    country:select[],
}>();
const store = userStore();
const articleSto = storeArticle()
const { getCurrent } = storeToRefs(articleSto)
const suffix = ref<string>('')
const error = ref<string>('');
const description = ref<string>('')
const form = reactive<Record<string, string | any>>({
    title: '',
    code: '',
    price: 0,
    priceInitial:0,
    device: '',
    quantity: 0,
    category: '',
    model: '',
    size: '',
    marque: '',
    heigth: '',
    width: '',
    length: '',
    file: null,
});
const title = ref<Validation>()
const code = ref<Validation>()
const prix = ref<Validation>()
const device = ref<Validation>()
const quantite = ref<Validation>()
const category = ref<Validation>()
const model = ref<Validation>()
const size = ref<Validation>()
const marque = ref<Validation>()
const heigth = ref<Validation>()
const width = ref<Validation>()
const length = ref<Validation>()
const initial = ref<Validation>()
const loading = ref<boolean>(false)

const addArticle = async () => {
    error.value = ''
    title.value?.validate()
    code.value?.validate()
    prix.value?.validate()
    device.value?.validate()
    quantite.value?.validate()
    initial.value?.validate()
    category.value?.validate()
    model.value?.validate()
    size.value?.validate()
    marque.value?.validate()
    heigth.value?.validate()
    width.value?.validate()
    length.value?.validate()
    const sizes = Utility.file(form.file, 2,4);
    const formUpdate = new FormData();
    if(description.value === "" || description.value === undefined){
        error.value = 'veuillez rempliz le descripton';
        return
    }
    if (
        title.value?.error === '' &&
        code.value?.error === '' &&
        prix.value?.error === '' &&
        device.value?.error === '' &&
        quantite.value?.error === '' &&
        category.value?.error === '' &&
        model.value?.error === '' &&
        size.value?.error === '' &&
        marque.value?.error === '' &&
        heigth.value?.error === '' &&
        width.value?.error === '' &&
        length.value?.error === '' &&
        initial.value?.error === '' &&
        error.value === ''
    ) {
        if (sizes === false) {
            error.value = "Aucun file selectionner ou File depasse 2M ou 4 photo maximuim"
            return;
        }
        else {
            loading.value = true
            formUpdate.append('description',description.value)
            for (let x of form.file) {
                formUpdate.append('files', x)
            }
            for (let key in form) {
                if (key !== 'file') {
                    formUpdate.append(key, form[key])
                }
            }
            
            const res = await store.Posting(formUpdate, '/article')
            console.log(res)
            await articleSto.checkArticle();
            loading.value = false
            if(res.status)
            {
                for (let key in form) {
                    if (typeof form[key] === 'string') form[key] = '';
                    if (typeof form[key] === 'number') form[key] = 0;
                    if (key === 'file') form[key] = null;
                }
            }
            else{
                title.value!.error = res.message as string;
            }
        }
    }

}

const changeCurrent = (value: string | number) => {
    suffix.value = value as string;
}

const update = (val:string)=>{
    description.value = val
}
onMounted(async () => {
    await articleSto.checkCurrent();
})
</script>
<template>
    <div class="text-center mt-5 my-5 titre">
        <h2>Entre votre article</h2>
    </div>
    <div v-if="props.pro">
        <el-form @submit.prevent class="space-y-6">
            <div class="flex space-x-2 mx-5">
                <div class="w-full">
                    <Input ref="title" show-error type="text" placeholder="titre article" v-model="form.title"
                        :prefixe="ShoppingCart" />
                </div>
                <div class="w-full">
                    <Input ref="code" show-error v-model="form.code" placeholder="code article"
                        :prefixe="ShoppingCart" />
                </div>
            </div>
            <div class="flex space-x-2 mx-5">
                <div class="w-full">
                    <Input ref="model" show-error v-model="form.model" placeholder="model Article" :prefixe="Handbag" />
                </div>
                <div class="w-8/12">
                    <Select ref="category" show-error v-model="form.category" :value="store.article" placeholder="Catégorie" />
                </div>
            </div>
            <div class="flex space-x-2 mx-5">
                <div class="w-full">
                    <Input ref="marque" show-error v-model="form.marque" placeholder="createur ou marque article"
                        :prefixe="ShoppingCart" />
                </div>
                <div class="w-4/12">
                    <Input ref="quantite" show-error type="number" v-model="form.quantity"
                        placeholder="quantite article" :prefixe="ShoppingCartFull" />
                </div>
            </div>
            <div class="flex space-x-2 mx-5">
                <div class="w-4/12">
                    <Select ref="device" show-error @change="changeCurrent" v-model="form.device":value="getCurrent as select[]" placeholder="Votre devise" />
                </div>
                <div class="w-full">
                    <Input ref="initial" type="number" show-error v-model="form.priceInitial" placeholder="Prix initial"
                        :prefixe="Money" :suffix="suffix" />
                </div>
                <div class="w-full">
                    <Input ref="prix" type="number" show-error v-model="form.price" placeholder="Prix article"
                        :prefixe="Money" :suffix="suffix" />
                </div>
            </div>
            <div class="flex space-x-2 mx-5">
                <div class="w-full">
                    <Input ref="heigth" type="number" show-error v-model="form.heigth" placeholder="entre hauteur"
                        :prefixe="ShoppingCart" suffix="cm" />
                </div>
                <div class="w-full">
                    <Input ref="width" type="number" show-error v-model="form.width" placeholder="entre largeur"
                        :prefixe="Ticket" suffix="cm" />
                </div>
                <div class="w-full">
                    <Input ref="length" type="number" show-error v-model="form.length" placeholder="entre epaisseur"
                        :prefixe="Ticket" suffix="cm" />
                </div>
                <div class="w-full">
                    <Input ref="size" type="number" show-error v-model="form.size" placeholder="taille article"
                        :prefixe="Ticket" suffix="kg" />
                </div>
            </div>
            <div class="flex space-x-2 mx-5">
                <div class="w-full h-auto">
                    <QuillEditor 
                    v-model:content="description" 
                    content-type="html" 
                    :options="store.option"
                    @update:content="update"
                    class="max-h-40 overflow-hidden overflow-y-scroll"
                    />
                </div>
            </div>
            <div class="space-x-2 mx-5 pt-15">
                <File multiple v-model="form.file" accept=".jpg,.png,.jpeg" />
                <el-alert type="warning" show-icon :title="error" v-if="error !== ''"></el-alert>
            </div>
            <el-button type="info" class="btn" @click="addArticle" v-loading.fullscreen.lock="loading">
                <span>Ajouter</span>
                <el-icon class="mx-4">
                    <Plus />
                </el-icon>
            </el-button>
        </el-form>
    </div>
    <div v-else class="text-center mt-5 my-5 titre">
        <h2>Vous devez créer un profil professionnel pour ajouter des articles</h2>
    </div>
</template>