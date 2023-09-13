<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import HomeView from "@/views/HomeView.vue";
import ProjectView from "@/views/ProjectView.vue";
import JoinView from "@/views/JoinView.vue";

const activeIndex = ref('intro')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img src="https://www.mocd.cc/assets/MOC-6f7f2da6.png" style="width: 60px" alt="logo"/>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="intro">介绍</el-menu-item>
    <el-menu-item index="project">项目</el-menu-item>
    <el-menu-item index="join">加入我们</el-menu-item>
  </el-menu>
  <div>
    <div v-if="activeIndex == 'intro'">
      <HomeView />
    </div>
    <div v-if="activeIndex == 'project'">
      <ProjectView />
  </div>
    <div v-if="activeIndex == 'join'">
      <JoinView />
    </div>
  </div>
</template>
