<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();

</script>

<template>
<div class="page-404">
  <img src="/404.gif" style="max-height: 500px;max-width: 100%" />
  <div>
    <h1>
      404 Not Found - 页面不存在
    </h1>
    <el-button type="primary" @click="router.push('/')">
      返回首页
    </el-button>
  </div>
</div>
</template>

<style scoped>

.page-404{
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>