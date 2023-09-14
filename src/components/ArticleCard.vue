<template>
  <div style="margin-bottom: 20px">
    <div
        class="article-card"
        @mouseover="isMouseover = true" @mouseleave="isMouseover = false" @click="goTo(project.index)"
        :style="isMouseover ? 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); cursor: pointer' : 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); cursor: pointer'"
    >
        <div class="banner" v-if="project.banner">
          <img :src="project.banner" alt="banner" style="width: 100%; height: 200px; object-fit: cover; object-position: center;">
        </div>
        <div style="padding: 10px">
          <h2 style="margin-bottom: 10px; margin-left: 10px">
            {{ project.title }}
          </h2>
          <div style="text-align: right;">
            <p class="time">
              {{ new Date(project.time).toLocaleDateString() }}
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

const project = ref<Project>({
  title: "",
  index: "",
  project: "",
  banner: "",
  time: ""
});

// 鼠标悬停效果
const isMouseover = ref(false);

onMounted(() => {
  project.value = props.project;
  console.log(props.project);
})

const goTo = (index: string) => {
  router.push("/project/" + project.value.project + "/" + index);
  localStorage.setItem(project.value.project + "-banner", project.value.banner);
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