<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter();
const id = ref("");
const projectData = ref<any>({});
const loadingProject = ref(true);

onMounted(()=> {
  id.value = <string>router.currentRoute.value.params.id;
})
</script>

<template>
<div style="margin: 20px">
  <el-skeleton :loading="loadingProject" :rows="10">

  </el-skeleton>
</div>
</template>

<style scoped>

</style>