<script setup lang="ts">
import {onMounted, ref} from "vue";

const width = ref(window.innerWidth);

const loading = ref(false);


const memberList = ref<any[]>([]);

// 获取成员列表
onMounted(async ()=>{
  loading.value = true;
  const url = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members.json?123";
  const data = await fetch(url).then(res => res.json());
  memberList.value = data;
  loading.value = false;
})

// 检测屏幕大小
onMounted(() => {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})
</script>

<template>
  <div style="margin: 20px;margin-bottom: 90px">
    <div id="logo" style="text-align: center; margin-top: 60px">
      <el-image src="https://www.mocd.cc/assets/MOC-6f7f2da6.png" style="max-width: 400px;max-height: 400px;" alt="logo">
      </el-image>
    </div>
    <div id="title">
      <p style="
        font-size: 50px;
        font-weight: 900;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 15px;
        background-image: linear-gradient(to right, #ff9a00, #ff4e00);
        -webkit-background-clip: text;
        color: transparent;
">
        Ministry of CODE
      </p>
      <p style="
        font-size: 30px;
        font-weight: 900;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 15px;
        opacity: 0.7;
">
       Coding Club | Xiamen University Malaysia
      </p>
      <div style="text-align: center">
        <img src="https://ribo.mocd.fun/static/xmum.4acf0db1.png" alt="xiamen" style="width: 100%;max-width: 300px;max-height: 300px;object-fit: cover;">
      </div>
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
    <div id="projects">
    <h1 style="text-align: center">
      项目
    </h1>
    </div>
    <el-divider />
    <div id="members">
      <h1 style="text-align: center">
        伙伴
      </h1>
      <el-skeleton style="width: 240px" :loading="loading" animated>
        <div  v-for="item in memberList" :key="item.department" >
          <h1 style="text-align: center">
            {{item.department}}
          </h1>
          <el-row justify="center" gutter="30">
            <el-col :xs="12" :span="6"  v-for="item1 in item.members" :key="item1.name" style="margin-bottom: 20px">
              <el-card style="text-align: center">
                <img v-if="width >= 460" :src="item1.avatar" alt="avatar" style="width: 100%;max-width: 150px; max-height: 150px; object-fit:scale-down; object-position: bottom;">
                <img v-else :src="item1.avatar" alt="avatar" style="width: 100%;max-width: 90px; max-height: 90px; object-fit:scale-down; object-position: bottom;">
                <h2 style="margin-bottom: 10px">
                  {{item1.name}}
                </h2>
                <p style="font-size: 15px;margin-top: 1px; opacity: 0.7; font-weight: bold">
                  {{ item1.role }}
                </p>
              </el-card>
            </el-col>
          </el-row>
          <hr />
        </div>
      </el-skeleton>
    </div>
  </div>
</template>