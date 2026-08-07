<script setup lang="ts">
import { Message, Picture, Plus, ShoppingCart } from '@element-plus/icons-vue';
import type { Article } from '../../Type';

const props = defineProps<{
  articles: Article[]
}>()
const emit = defineEmits<{
  (e: 'message', name: {name: string, img: string, user: string}): void
}>()
const sendMessage = (name: {name: string, img: string, user: string})=>{
  emit('message', name)
}
</script>

<template>
  <el-row :gutter="20">
    <el-col v-for="article in articles" :key="article._id" :xs="24" :sm="24" :md="8">
      <el-card shadow="hover" class="product-card">
        <template #header>
          <div class="card-header">
            <div class="seller-info">
              <el-image show-progress class="h-10 w-10 rounded-full" fit="cover" :src="article.pro?.set?.link"/>
              <div class="seller-name">
                <strong>{{ article.pro?.nom }}</strong>
              </div>
            </div>
            <span class="date-text">
              {{ new Date(article._createdAt).toLocaleDateString('FR') }} <span class="text-blue-400">à</span>
              {{ new Date(article._createdAt).toLocaleTimeString('FR') }}
            </span>
          </div>
        </template>

        <div class="image-wrapper">
          <div class="flex justify-end mr-5 mt-2">
            <el-badge :value="`${article.set.length}`">
              <el-icon :size="20">
                <Picture/>
              </el-icon>
            </el-badge>
          </div>
          <el-image
            ref="imageRef"
            style="width: auto; max-height: 300px; border-radius: 14px"
            :src="article.set[0]?.links"
            show-progress
            :preview-src-list="article.set.map((item)=>item.links)"
            fit="scale-down"
          />
        </div>
        <div class="product-content space-y-1">
          <div class="text-center font-bold text-lg mb-2">
            <h2>{{ article.title }}</h2>
          </div>
          <div class="space-x-4">
            <el-tag type="warning"> {{ article.category }}</el-tag>
            <el-tag type="warning"> {{ article.device }}</el-tag>
          </div>
          <div class="product-head">
            <el-tag type="primary" effect="light">{{ article.model }}</el-tag>
            <el-tag type="success" effect="light">{{ article.price.toLocaleString() }} {{ article.device }}</el-tag>
          </div>
          <div v-html="article.description" class="text-sm"></div>
        </div>
        <div class="action-row">
          <el-button type="success" :icon="Message" @click="sendMessage({name: article.pro?.nom as string, img: article.pro?.set?.link as string, user: article.user?.email as string})">
            Message
          </el-button>
          <el-button type="primary" :icon="ShoppingCart">
            Acheter
          </el-button>
          <el-button :icon="Plus">
            Voir
          </el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

.product-card {
  margin: 12px 0;
  border-radius: 16px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: -8px 0;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.seller-name {
  font-size: 0.9rem;
  color: #303133;
}

.date-text {
  font-size: 0.8rem;
  color: #909399;
}

.image-wrapper {
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
}

.product-image {
  width: 100%;
  height: 220px;
  border-radius: 14px;
}

.product-content {
  margin-bottom: 16px;
}

.product-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.product-head h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f1f1f;
}

.product-content p {
  margin: 0;
  color: #606266;
  line-height: 1.5;
  font-size: 0.92rem;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 767px) {
  .product-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-row {
    justify-content: stretch;
  }

  .action-row .el-button {
    flex: 1 1 100%;
  }
}
</style>
