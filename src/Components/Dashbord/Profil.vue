<script lang="ts" setup>
import type { Article, setPro, User } from '../../Type';


const props = defineProps<{
    user: User,
    pro: setPro,
    article: Article[]
}>()

</script>
<template>
    <div class="grid grid-cols-3 gap-6 p-6">
        <!-- Column 1: Media Profile -->
        <div class="col-span-1">
            <el-card class="mb-4">
                <template #header>
                    <div class="card-header">
                        <span class="font-semibold">Profil</span>
                    </div>
                </template>
                <div class="flex flex-col items-center">
                    <el-avatar :size="80" :src="props.pro?.set?.link" />
                    <p class="mt-4 font-bold">
                        <span class="mx-4">{{ props.user?.set?.firstname }}</span>
                        <span>{{ props.user?.set?.lastname }}</span>
                    </p>
                    <p class="text-gray-500">{{ props.user?.email }}</p>
                    <el-button type="primary" class="mt-4 w-full">Modifier Profil</el-button>
                </div>
            </el-card>
        </div>

        <!-- Column 2: Publications -->
        <div class="col-span-1">
            <el-card v-if="props.article.length > 0" v-for="(item, index) in props.article" :key="index">
                <template #header>
                    <div class="card-header">
                        <div class="flex justify-between items-center">
                            <div class="relative">
                                <el-avatar :src="props.pro.set?.link"></el-avatar>
                                <span class="absolute -top-1 text-sm text-blue-600 text-nowrap">{{ props.pro.nom
                                }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">{{ item.title }}</span>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="ql-editor ql">
                    <div v-html="item.description"></div>
                </div>
                <div class="demo-image__preview overflow-hidden">
                    <el-image v-for="(img, key) in item.set" style="width: 30vw; height: 40vh" :src="img.links"
                        :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="item.set.map(img=>img.links)" show-progress
                        :initial-index="key" fit="cover" />
                </div>
            </el-card>
            <el-card v-else>
                <template #header>
                    <div class="card-header">
                        <span class="font-semibold">Publications</span>
                    </div>
                </template>
                <div class="space-y-4">
                    <el-empty description="Aucune publication" />
                </div>
            </el-card>
        </div>

        <!-- Column 3: Notifications & Settings -->
        <div class="col-span-1">
            <el-card class="mb-4">
                <template #header>
                    <div class="card-header">
                        <span class="font-semibold">Notifications</span>
                    </div>
                </template>
                <el-empty description="Aucune notification" />
            </el-card>
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span class="font-semibold">Paramètres</span>
                    </div>
                </template>
                <div class="space-y-2">
                    <el-switch active-text="Notifications" />
                    <el-switch active-text="Profil Privé" />
                </div>
            </el-card>
        </div>
    </div>
</template>
<style scoped>
.demo-image__error .image-slot {
    font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
    font-size: 30px;
}

.demo-image__error .el-image {
    width: 100%;
    height: 200px;
}
</style>