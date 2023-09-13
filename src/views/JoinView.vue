<template>
  <div style="margin: 20px">
    <el-row justify="center" gutter="50">
      <el-col :span="12" :xs="24" style="margin-bottom: 30px">
        <el-carousel
            :height="width >= 728 ? height  + 'px' : 300 + 'px'"
            :direction="width >= 729 ? 'vertical' : 'horizontal'"
            :type="width >= 728 ? 'card' : 'flat'"
            :autoplay="true"
        >
          <el-carousel-item
              v-for="item in introBanner"
              style="background-color: #f8f8f8">
            <img
                :src="item"
                alt="logo" style="width: 100%;height: 100%;object-fit: scale-down;object-position: bottom;">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12" :xs="24" :style="width >= 460 ? 'border-left: 1px solid #ebeef5;' : 'border-top: 1px solid #ebeef5'">
        <h1>
          <img src="/wave.gif" style="height: 50px">
          加入我们
        </h1>

        <el-card>
          <template #header>
            开放职位
          </template>
          <el-row gutter="20">
            <el-col :span="12" v-for="item in position" :key="item.id">
              <el-card class="join-card" @click="selectedPosition=item.id">
                {{ item.name }}
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <el-card style="margin-top: 20px">
          <template #header>
            <h2>
              {{ position.find(item => item.id === selectedPosition).name }}
            </h2>
          </template>
          <p>
            {{ position.find(item => item.id === selectedPosition).des }}
          </p>
          <div>
              <el-skeleton :loading="false" animated>
                  <el-form v-model="form">
                      <el-form-item label="姓名">
                          <el-input name="name" v-model="form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="学号">
                          <el-input name="studentId" v-model="form.studentId"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱">
                          <el-input name="email" v-model="form.email"></el-input>
                      </el-form-item>
                      <el-form-item label="自我介绍">
                          <el-input type="textarea" name="des" v-model="form.des"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" @click="submit()">提交</el-button>
                      </el-form-item>
                  </el-form>
              </el-skeleton>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

const height = ref<any>(window.innerHeight - 150)
const width = ref<any>(window.innerWidth)

const form = ref<any>({
  name: "",
  studentId: "",
  email: "",
  des: ""
})

const introBanner = [
  "https://www.mocd.cc/assets/MOC-6f7f2da6.png",
  "https://www.mocd.cc/assets/MOC-6f7f2da6.png",
  "https://www.mocd.cc/assets/MOC-6f7f2da6.png",
  "https://www.mocd.cc/assets/MOC-6f7f2da6.png",
]

const position = [
  {
    name: "开发组",
    id: "development",
    des : "开发组是MOC的核心部门，负责MOC的网站开发、维护、运营等工作。"
  },{
    name: "美工部",
    id: "design",
    des : "美工部是MOC的核心部门，负责MOC的网站开发、维护、运营等工作。"
  },{
    name: "策划部",
    id: "planning",
    des : "策划部是MOC的核心部门，负责MOC的网站开发、维护、运营等工作。"
  },{
    name: "宣传部",
    id: "publicity",
    des : "宣传部是MOC的核心部门，负责MOC的网站开发、维护、运营等工作。"
  }
]

const selectedPosition = ref("development")

onMounted(()=>{
  window.addEventListener("resize", ()=>{
    height.value = window.innerHeight - 150;
    width.value = window.innerWidth;
  })
})

const submit = () => {
  console.log(form.value)
}

</script>

<style scoped>

.join-card {
  margin-bottom: 20px;
  cursor: pointer;
}

</style>