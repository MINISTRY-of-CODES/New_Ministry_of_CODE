<template>
  <div style="margin-bottom: 20px">
    <div
        class="article-card"
        @mouseover="isMouseover = true" @mouseleave="isMouseover = false" @click="goTo(projectInfo.index)"
        :style="isMouseover ? 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); cursor: pointer' : 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); cursor: pointer'"
    >
        <div class="banner" v-if="projectInfo.banner">
          <img :src="projectInfo.banner" alt="banner" style="width: 100%; height: 200px; object-fit: cover; object-position: center;">
        </div>
        <div style="padding: 10px">
          <h2 style="margin-bottom: 10px; margin-left: 10px">
            {{ projectInfo.title }}
          </h2>
          <div style="text-align: right;">
            <p class="time">
              {{ new Date(projectInfo.time).toLocaleDateString() }}
            </p>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {PropType} from "vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

type Project = {
  title: string
  index: string
  project: string
  banner: string
  time: string
}

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})

const projectInfo = ref<Project>({
  title: "",
  index: "",
  project: "",
  banner: "",
  time: ""
});

// 鼠标悬停效果
const isMouseover = ref(false);

// 父传子数据
onMounted(() => {
  projectInfo.value = props.project;
  console.log(props.project);
})

const goTo = (index: string) => {
  router.push("/project/" + projectInfo.value.project + "/" + index);
  localStorage.setItem(projectInfo.value.project + "-banner", projectInfo.value.banner);
}



</script>

<style>
.article-card {
  margin: 10px;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
}

.article-card .banner {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.article-card .time {
  font-size: 14px;
  color: #999;
  margin: 0;
  margin-bottom: 10px;
}
</style>