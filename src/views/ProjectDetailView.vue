<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
import { marked } from 'marked';
import ArticleCard from "@/components/ArticleCard.vue";
import {Link} from '@element-plus/icons-vue';

const router = useRouter();
const id = ref(<string>router.currentRoute.value.params.id);

const projectData = ref<any>({});
const projectArticles = ref<any>([]);
const html = ref("");


const loadingProject = ref(true);
const configURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/" +
      id.value.toLowerCase()
      +"/config.json";
const indexURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/" +
      id.value.toLowerCase()
      +"/index.md";

const projectDetail = ref<any>("");

// 点击打开新窗口至项目主页
const goTo = (URL: string) => {
  window.open(URL, "_blank");
  console.log(URL);
}

// 检测屏幕大小
const width = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})

const isLargescreen = computed(() => {
  return (width.value > 770);
})

onMounted(async ()=> {
  console.log(id.value);
  const data = await fetch(configURL).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });

  const project = await fetch(indexURL).then(res => res.text()).catch(err => {
    console.log(err);
    router.push("/404");
  });

  projectDetail.value = project;

  const raw = marked(projectDetail.value);
  // 让图片自适应 正则
  const newHtml = raw.replace(/<img/g, '<img style="max-width: 95% !important;"');
  html.value = newHtml;

  projectData.value = data;
  projectArticles.value = data.articles.reverse();

  // 检测文章Banner，若无则自动延用
  var bannerCatch = "https://cdn.wallpapersafari.com/66/6/zZlgub.png"; // 默认图片
    for (let index = 0; index < projectArticles.value.length; index++) {
      if (projectArticles.value[index].banner) {
        bannerCatch = projectArticles.value[index].banner;
      }
      else {
        projectArticles.value[index].banner = bannerCatch;
      }
      const indexInfo = "rank";
      projectArticles.value[index][indexInfo] = index;
    }
    
  loadingProject.value = false;
})

</script>

<template>
<div :style="isLargescreen? 'margin: 20px; width: 100%;' : 'margin: 20px; width: 90%;'">
  <el-skeleton :loading="loadingProject" :rows="10">
    <el-row gutter="40">
      <el-col :xs="23" :span="12">
        <div id="logo" style="text-align: center">
          <img :src="projectData.avatar" style="max-width: 200px;"/>
        </div>
        <div id="title">
          <h1 style="text-align: center">
            {{ projectData.project }}
          </h1>
        </div>
        <div v-if="projectData.URL && isLargescreen">
          <el-divider />
          <el-row justify="center">
            <el-button size="large" type="primary" @click="goTo(projectData.URL)" :icon="Link">访问项目主页</el-button>
          </el-row>
        </div>
        <el-divider />
        <div class="markdown">
          <div v-html="html"></div>
        </div>
        <div v-if="projectData.URL && !isLargescreen">
          <el-divider />
          <el-row justify="center">
            <el-button size="large" type="primary" @click="goTo(projectData.URL)" :icon="Link">访问项目主页</el-button>
          </el-row>
          <el-divider/>
        </div>
      </el-col>
      <el-col :xs="22" :span="11">
        <h1 style="text-align: left; margin-left: 10px;">
          更新日志
        </h1>
        <div v-for="article in projectArticles" :key="article.title">
          <ArticleCard :project="{
            title: article.title,
            index: article.index,
            project: id.toLowerCase(),
            banner: article.banner,
            time: article.time,
            rank: article.rank
          }" />
          </div>
      </el-col>
    </el-row>
  </el-skeleton>
</div>
</template>

<style scoped>
.markdown {
  width: 100%;
  overflow: hidden;
}
.markdown img {
  max-width: 100% !important;
}
</style>