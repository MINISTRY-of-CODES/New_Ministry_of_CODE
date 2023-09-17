<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import { marked } from 'marked';
import ArticleCard from "@/components/ArticleCard.vue";

const router = useRouter();
const id = ref(<string>router.currentRoute.value.params.id);

const projectData = ref<any>({});
const projectArticles = ref<any>([]);


const loadingProject = ref(true);
const configURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/" +
      id.value.toLowerCase()
      +"/config.json";
const indexURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/" +
      id.value.toLowerCase()
      +"/index.md";

const projectDetail = ref<any>("");

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
  projectArticles.value = data.articles;

  loadingProject.value = false;
})

const html = ref("");
</script>

<template>
<div style="margin: 20px; width: 100%">
  <el-skeleton :loading="loadingProject" :rows="10">
    <el-row gutter="40">
      <el-col :xs="24" :span="12">
        <div id="logo" style="text-align: center">
          <img :src="projectData.avatar" style="max-width: 200px;"/>
        </div>
        <div id="title">
          <h1 style="text-align: center">
            {{ projectData.project }}
          </h1>
        </div>
        <el-divider />
        <div style="width: 100%" class="markdown">
          <div v-html="html">
          </div>
        </div>
      </el-col>
      <el-col :xs="22" :span="11">
          <div v-for="article in projectArticles" :key="article.title">
            <ArticleCard :project="{
              title: article.title,
              index: article.index,
              project: id.toLowerCase(),
              banner: article.banner,
              time: article.time
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