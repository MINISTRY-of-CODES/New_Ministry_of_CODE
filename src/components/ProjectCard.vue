<template>
  <div>
    <el-card>
      <el-col>
        <el-row justify="center">
          <!--试验图片-->
          <img src="https://api.oyohen.com/bing.php" style="max-width: 400px; max-height: 200px; object-fit: cover;"/>
        </el-row>
        <el-row justify="center">
          {{ props.project.project }}
        </el-row>
      </el-col>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue'

type Project = {
  project: string
  avatar: string
  intro: string
}

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})
</script>

<style>

</style>