<template>
  <div>
    <el-card shadow="hover"
      style="text-align: center; cursor: pointer; height:260px; transition: 0.4s; overflow: hidden;"
      @click="goTo(project.project)" @mouseover="showIntro" @mouseleave="showLogo">
      <div>
        <img v-if="width >= 460" :src="project.avatar" alt="avatar" :class="isMouseover? 'Intro' : 'Logo'" class="avatar" style="
        transition: 0.4s;
        width: 100%;
        object-fit:scale-down;
        object-position: bottom;
        ">
        <img v-else :src="project.avatar" alt="avatar" style="width: 100%;max-width: 90px; max-height: 90px; object-fit:scale-down; object-position: bottom;">
        <div :class="isMouseover? 'Intro' : 'Logo'" class="name" style="transition: 0.4s">
          <h2 style="margin-bottom: 5px">
            {{ props.project.project }}
          </h2>
        </div>
        <div :class="isMouseover? 'Intro' : 'Logo'" class="detail" style="transition: 0.4s">
          <h3>
            {{ props.project.intro }}
          </h3>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';

// 项目卡片鼠标悬停效果
const isMouseover = ref(false);
const showIntro = ()=>{
  isMouseover.value = true;
};
const showLogo = ()=>{
  isMouseover.value = false;
};

type Project = {
  project: string
  avatar: string
  intro: string
  url: string
}

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})

const goTo = (project: string) => {
  window.open("/project/" + project, "_blank")
}

// 检测屏幕大小
const width = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})
</script>

<style>
.Intro.name {
  font-size: 14px;
}
.Logo.name {
  font-size: 20px;
}

.Intro.detail {
  opacity: 1.0;
}
.Logo.detail {
  opacity: 0.0;
}

.Intro.avatar {
  max-width: 90px; 
  max-height: 90px; 
}

.Logo.avatar {
  max-width: 150px; 
  max-height: 150px; 
}
</style>