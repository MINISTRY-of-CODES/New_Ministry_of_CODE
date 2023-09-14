<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import { marked } from 'marked';
import ArticleCard from "@/components/ArticleCard.vue";

const router = useRouter();
const id = ref(<string>router.currentRoute.value.params.id);

const projectData = ref<any>({});
const projectArticles = ref<any[]>([]);


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
  html.value = marked(projectDetail.value);
  projectData.value = data;
  projectArticles.value = data.articles;

  loadingProject.value = false;
})

const html = ref(marked(projectDetail.value));

</script>

<template>
<div style="margin: 20px">
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
        <div v-html="html"></div>
      </el-col>
      <el-col :xs="24" :span="12">
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

</style>