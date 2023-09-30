<script setup lang="ts">
import {onMounted, ref, computed, type PropType} from "vue";
const defaultAvatar = "https://www.mocd.cc/assets/MOC-6f7f2da6.png";
const defaultURL = "https://www.mocd.cc";

// 父传子数据
type Contrib = {
  name: string, 
  URL: string, 
  avatar: string, 
  contrib: string
}
const props = defineProps({
  contribInfo: {
    type: Object as PropType<Contrib>,
    required: true
  }
})

// 项目卡片鼠标悬停效果
const isMouseover = ref(false);

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

//点击按钮跳转网址
const goTo = (project: string, URL: string) => {
  if (URL) {  // 若官网有该项目的详情页，则跳转该详情页
    window.open("/project/" + project, "_blank");
  }
  else{  // 若无，则直接跳转至该项目主页
    window.open(defaultURL, "_blank");
  }
}
</script>

<template>
  <div  style="transition: 0.4s;"
  @mouseover="isMouseover = true" @mouseleave="isMouseover = false"
  :style="isMouseover? 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); cursor: pointer;' : 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'">
    <el-card @click="goTo(props.contribInfo.name, props.contribInfo.URL)">
      <el-row style="align-items: center;">
        <el-col :span="6" >
          <img :src="props.contribInfo.avatar? props.contribInfo.avatar : defaultAvatar"
          :style="isLargescreen? 'max-width: 120px;' : 'max-width: 70px;'"/>
        </el-col>
        <el-col :span="18">
          <el-row style="justify-content: center;">
            <p class="projectName" :style="isLargescreen?
            'font-size: 24px;' : 'font-size: 18px; margin: 5px;'">
              {{ props.contribInfo.name }}
            </p>
          </el-row>
          <el-row style="justify-content: center;">
            <p class="projectContrib" :style="isLargescreen?
            'font-size: 20px;' : 'font-size: 16px; margin: 5px;'">
              {{ props.contribInfo.contrib }}
            </p>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>


<style>
.projectName {
  margin-top: 0px;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
}

.projectContrib {
  margin-top: 10px;
  margin-bottom: 0px;
  opacity: 0.7;
  font-weight: bold;
}
</style>