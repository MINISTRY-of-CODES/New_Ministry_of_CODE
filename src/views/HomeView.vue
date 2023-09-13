<script setup lang="ts">
import {onMounted, ref} from "vue";

const width = ref(window.innerWidth);

const loadingMember = ref(false);
const loadingProject = ref(false);

const memberList = ref<any[]>([]);
const projectList = ref<any[]>([]);

// 社团介绍的横幅
const introBanner = ref<any[]>([
  "https://ice.frostsky.com/2023/09/13/ee3516850a592eba01290237473dc07c.png",
  "https://www.xmu.edu.my/_upload/tpl/08/9f/2207/template2207/htmlRes/index_res/03.jpg",
  "https://www.xmu.edu.my/_upload/tpl/08/9f/2207/template2207/htmlRes/index_res/02.jpg"
]);

// 获取成员列表和项目列表
onMounted(async ()=>{
  loadingMember.value = true;
  loadingProject.value = true;
  const member_url = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members.json?123";
  const memberData = await fetch(member_url).then(res => res.json());
  const project_url = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects.json?123";
  const projectData = await fetch(project_url).then(res => res.json());
  memberList.value = memberData;
  projectList.value = projectData;
  loadingProject.value = false;
  loadingMember.value = false;
})

// 检测屏幕大小
onMounted(() => {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})

const goTo = (project: string) => {
  window.open("/project/" + project, "_blank")
}

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
        <span>Ministry</span><br v-if="width <= 490" />
        <span v-if="width > 490"> of </span><span v-else style="font-size: 35px;"> of </span><br v-if="width <= 490" />
        <span>CODE</span>
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

      <el-carousel :interval="5000" arrow="always" style="background-color: #f8f8f8;box-shadow: 0 0 5px #222222; border-radius: 4px;
" :height="width > 490 ? '400px' : '300px'">
        <el-carousel-item v-for="item in introBanner" :key="item">
          <div style="
                      width: 100%;
                      max-width: 100%;
                      object-fit: cover;
                      object-position: center;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100%;
            ">
            <img :src="item" alt="logo" style="width: 100%; height: 100%;object-fit: cover"/>
          </div>
        </el-carousel-item>
      </el-carousel>

      <el-card style="margin-top: 30px">
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

      <el-skeleton style="width: 100%" :loading="loadingProject" animated>
        <el-row gutter="30" justify="center">
            <el-col :xs="12" :md="6" :span="6" v-for="project in projectList" :key="project.project" style="margin-bottom: 20px">
              <el-card style="text-align: center;cursor: pointer" @click="goTo(project.project)">
                <div class="">
                  <img v-if="width >= 460" :src="project.avatar" alt="avatar" style="width: 100%;max-width: 150px; max-height: 150px; object-fit:scale-down; object-position: bottom;">
                  <img v-else :src="project.avatar" alt="avatar" style="width: 100%;max-width: 90px; max-height: 90px; object-fit:scale-down; object-position: bottom;">
                  <h2 style="margin-bottom: 10px">
                    {{project.project}}
                  </h2>
                  <p style="font-size: 15px;margin-top: 1px; opacity: 0.7; font-weight: bold">
                    {{ project.description }}
                  </p>
                </div>
              </el-card>
            </el-col>
        </el-row>
      </el-skeleton>
      
    </div>
    <el-divider />
    <div id="members">
      <h1 style="text-align: center">
        伙伴
      </h1>
      <el-skeleton style="width: 100%" :loading="loadingMember" animated>
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
