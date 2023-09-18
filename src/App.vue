<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import {useRouter} from "vue-router";
import { ref } from "vue";

const router = useRouter()
const isMouseover = ref(false);

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

// 点击按钮滚动至指定位置
const gotoAnchor = (selector:any) => {
  if (router.currentRoute.value.path != '/') {
    router.push('/');
  }
  document.querySelector(selector).scrollIntoView({
    behavior: "smooth"});
}

// 鼠标悬浮变为Pointer
const toPointer = () => {
  isMouseover.value = true;
}

const toDefault = () => {
  isMouseover.value = false;
}
</script>
to
<style>
.flex-grow {
  flex-grow: 1;
}

.showPointer {
  cursor: pointer;
}

.showDefault {
  cursor: default;
}
</style>

<template>
  <el-menu
      :default-active="getTab()"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-avatar index="intro" @click="gotoAnchor('#logo')" @mouseover="toPointer" @mouseleave="toDefault"
      src="https://www.mocd.cc/assets/MOC-6f7f2da6.png"
      :class="isMouseover? 'showPointer' : 'showDefault'"
      style="width: 60px; height: 60px; background-color: rgb(255, 255, 255);">
    </el-avatar>
    <div class="flex-grow"></div>
    <el-menu-item index="intro" @click="gotoAnchor('#logo')">
      首页
    </el-menu-item>
    <el-menu-item index="project" @click="gotoAnchor('#projects')">
      项目
    </el-menu-item>
    <el-menu-item index="member" @click="gotoAnchor('#members')">
      成员
    </el-menu-item>
    <el-menu-item index="join" @click="gotoAnchor('#joinus')">
      加入
    </el-menu-item>
  </el-menu>
  <div>
    <RouterView />
  </div>
</template>
