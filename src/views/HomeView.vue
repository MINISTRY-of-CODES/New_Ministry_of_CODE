<script setup lang="ts">
import {onMounted, ref} from "vue";

const width = ref(window.innerWidth);

const loading = ref(false);


const memberList = ref<any[]>([]);

// 获取成员列表
onMounted(async ()=>{
  loading.value = true;
  const url = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members.json";
  const data = await fetch(url).then(res => res.json());
  memberList.value = data;
  loading.value = false;
  console.log(data);
})


</script>

<template>
  <div style="margin: 20px;margin-bottom: 100px">
    <div id="logo" style="text-align: center; margin-top: 100px">
      <el-image src="https://www.mocd.cc/assets/MOC-6f7f2da6.png" style="max-width: 400px;max-height: 400px;" alt="logo">
      </el-image>
    </div>
    <div id="title">
      <p style="
        font-size: 50px;
        font-weight: 900;
        text-align: center;
        margin-top: 10px;
">
        Ministry of CODE
      </p>
    </div>

    <el-divider />
    <div id="intro">
      <h1 style="text-align: center; margin-bottom: 40px;margin-top: 30px">社团介绍</h1>
      <el-card>
        <p>
          Ministry of CODE 是一个由组成的开源社区，我们致力于为高中生提供一个学习编程的平台，同时也为高中生提供一个展示自己的平台。
        </p>
        <p>
          我们的目标是让更多的了解编程，让更多的高中生参与到开源社区中来，让更多的高中生了解开源社区。
        </p>
        <p>
          我们的口号是：让参与到开源社区中来。
        </p>
      </el-card>
    </div>
    <el-divider />
    <div id="members">
      <h1>
        人员介绍
      </h1>
      <el-skeleton style="width: 240px" :loading="loading" animated>
        <div>
          <el-row>
            <el-col v-for="item in memberList" :key="item.name">
              <el-card v-for="item in memberList" :key="item.name">
                <h1>
                  {{item.name}}
                </h1>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-skeleton>
    </div>
  </div>
</template>