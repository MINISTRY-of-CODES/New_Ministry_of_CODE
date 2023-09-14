<template>
  <div>
    <el-skeleton :loading="loadingArticle" :rows="10">
      <div class="article">
        <div class="banner" v-if="getBanner(pid)">
          <img
              :src="getBanner(pid) ? <string>getBanner(pid) : ''"
               style="width: 100%; height: 100%; object-fit: cover;"/>
        </div>
        <div class="article-content">
          <div class="article-body">
            <div class="article-body-content">
              <div v-html="articleContent"></div>
            </div>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
  <footer style="text-align: center; margin-top: 20px;opacity: 0.7;">
    <el-divider />
    <p>Ministry of CODE ｜ Xiamen University Malaysia</p>
  </footer>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {marked} from "marked";

const router = useRouter();
const articleContent = ref("");
const loadingArticle = ref(true);

const getBanner = (pid: string) => {
  if (localStorage.getItem(pid + "-banner") == undefined || localStorage.getItem(pid + "-banner") == "undefined") {
    return false;
  }
  return localStorage.getItem(pid + "-banner");
}

const params = router.currentRoute.value.params;

const aid = params.aid;
const pid: string = <string>params.pid;

onMounted(() => {

  const markdownURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/" + pid +"/" +
    aid +
    ".md";

  fetch(markdownURL)
    .then((response) => response.text())
    .then((text) => {
      articleContent.value = marked(text)
      loadingArticle.value = false;
    });
})

</script>

<style scoped>
.article {
  margin: 5vw;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  min-height: 85vh;
}

.article .banner {
  height: 20vh;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
}

.article .article-content {
  padding: 20px;
}

.background {
  background-color: #f5f5f5;
}

</style>