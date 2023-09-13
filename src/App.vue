<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()

const handleSelect = (key: string, keyPath: string[]) => {
  switch (key) {
    case "intro":
      router.push("/")
      break
    case "project":
      router.push("/project")
      break
    case "join":
      router.push("/join")
      break
  }
}

const getTab = () => {
  switch (router.currentRoute.value.path) {
    case "/":
      return "intro"
    case "/project":
      return "project"
    case "/join":
      return "join"
  }
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>

<template>
  <el-menu
      :default-active="getTab()"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="intro">
      <img src="https://www.mocd.cc/assets/MOC-6f7f2da6.png" style="width: 60px" alt="logo"/>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="intro">
    首页
    </el-menu-item>
    <el-menu-item index="project">
     项目
    </el-menu-item>
    <el-menu-item index="join">
       加入
    </el-menu-item>
  </el-menu>
  <div>
    <RouterView />
  </div>
</template>
