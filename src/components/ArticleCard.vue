<template>
  <div style="margin-bottom: 20px">
    <div class="article-card" style="transition: 0.3s;"
         @mouseover="isMouseover = true" @mouseleave="isMouseover = false" @click="goTo(projectInfo.index)"
         :class="isMouseover ? 'spread' : 'tight'">
        <div style="overflow: hidden; position: relative;">
          <img :src="projectInfo.banner" alt="banner" class="banner" :class="projectInfo.rank == 0? 'latest' : 'history'" style="
          width: 100%;
          object-fit: cover;
          object-position: center;
          ">
        </div>
        <div style="padding: 10px">
          <h2 class="title" :class="isMouseover? 'spread' : 'tight'" style="transition: 0.3s;">
            {{ projectInfo.title }}
          </h2>
          <div style="text-align: right;">
            <p class="time" :class="isMouseover? 'spread' : 'tight'" style="transition: 0.3s;">
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
  rank: number
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
  time: "",
  rank: -1
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

.article-card .time {
  font-size: 14px;
  color: #999;
  margin: 0;
  margin-bottom: 5px;
}

.article-card.spread {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  width: 102%; 
}

.article-card.tight {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 100%;
}

.time.spread {
  margin-bottom: 10px;
}

.title.spread {
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: -5px;
  font-size: 26px;
}

.title.tight {
  margin-left: 10px;
  margin-top: 0px;
  margin-bottom: -10px;
}

.banner.latest {
  height: 200px;
}

.banner.history {
  height: 60px;
}
</style>