<script setup lang="ts">
import {onMounted, ref} from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import {ArrowUp, Promotion} from '@element-plus/icons-vue';
import {useRouter} from "vue-router";

const router = useRouter()
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

// const goTo = (project: string) => {
//   window.open("/project/" + project, "_blank")
// }

// 点击按钮跳转页面
const gotoJoinView = () => {
  router.push("/join");
}
</script>

<template>
  <div style="margin: 20px" id="logo">
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
       <span>Coding Club</span>
       <span v-if="width > 680"> | </span><br v-if="width <= 680"/>
       <span>Xiamen University Malaysia</span>
      </p>
      <div style="text-align: center">
        <img src="https://ribo.mocd.fun/static/xmum.4acf0db1.png" alt="xiamen" style="width: 100%;max-width: 300px;max-height: 300px;object-fit: cover;">
      </div>
</div>
    <el-divider />
    <div id="intro"
         :style="width > 728 ? 'max-width: 60vw; margin: auto' : 'padding: 0 10px'"
    >
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
          Ministry of CODE 是一个厦门大学马来西亚分校的社团。校内第一个以编程为主题的社团。
        </p>
        <p>
          我们的目标是让更多的同学了解编程，学习编程，参与到开源社区中来。
        </p>
      </el-card>
    </div>
    <el-divider />
    <div id="projects">
      <h1 style="text-align: center">
        已有项目
      </h1>

      <el-skeleton style="width: 100%" :loading="loadingProject" animated>
        <el-row gutter="30" justify="center">
          <el-col :xs="12" :md="6" :span="6" v-for="item in projectList" :key="item.project" style="margin-bottom: 20px">
            <ProjectCard :project="item"/>
          </el-col>
        </el-row>
      </el-skeleton>
      
    </div>
    <el-divider />
    <div id="members">
      <h1 style="text-align: center">
        我们的伙伴
      </h1>
      <h2 style="text-align: center;">
        -
      </h2>
      <el-skeleton style="width: 100%" :loading="loadingMember" animated>
        <div  v-for="item in memberList" :key="item.department" >
          <h1 style="text-align: center">
            {{item.department}}
          </h1>
          <el-row justify="center" gutter="30">
            <el-col :xs="12" :span="6"  v-for="item1 in item.members" :key="item1.name" style="margin-bottom: 20px">
              <el-card style="text-align: center;" :body-style="{ padding: '0px' }">
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
        </div>
      </el-skeleton>
      <el-divider />
      <div id="joinus">
        <h1 style="text-align: center; margin-bottom: 30px;">
          加入我们
        </h1>
        <el-row justify="center">
          <el-button size="large" type="primary" :icon="Promotion" @click="gotoJoinView">Join us!</el-button>
        </el-row>
      </div>
    </div>
    <el-divider />
  </div>
  <footer style="text-align: center; margin-top: 20px; opacity: 0.7">
    <p>
      © 2023 Ministry of CODE, All Rights Reserved.
    </p>
  </footer>
  <el-backtop v-if="width > 490" bottom="80" right="60" style="width: 50px; height: 50px;">
      <el-icon><ArrowUp/></el-icon>
  </el-backtop>
  <el-backtop v-else bottom="80" right="20" style="width: 40px; height: 40px;">
      <el-icon><ArrowUp/></el-icon>
  </el-backtop>
</template>
