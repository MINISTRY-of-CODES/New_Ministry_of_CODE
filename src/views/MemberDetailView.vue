<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
const router = useRouter();
const id = ref(router.currentRoute.value.params.id);
const memberInfo = ref<any>({});
const projectList = ref<any>({});

const loadingMember = ref(true);
const infoURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members/" +
      id.value + "/info.json";
const projectURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/projectsList.json?123";
const defaultAvatar = "https://www.mocd.cc/assets/MOC-6f7f2da6.png";
const defaultURL = "https://www.mocd.cc";

var item: any;
var allProject: { name: string; URL: string; avatar: string; contrib: string; }[] = [];

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

// 加载成员信息以及项目信息
onMounted(async () => {
  memberInfo.value = await fetch(infoURL).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });
  console.log(memberInfo.value);

  projectList.value = await fetch(projectURL).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });
  console.log(projectList.value);

  // 匹配成员参与项目的信息
  for (let index1=0; index1 < memberInfo.value.project.length; index1++) {
    var temp = { name: "", URL: "", avatar: "", contrib: "" };
    temp.name = memberInfo.value.project[index1].name;
    temp.contrib = memberInfo.value.project[index1].contribute;
    for (let index2=0; index2 < projectList.value.length; index2++) {
      item = projectList.value[index2];
      if (temp.name == item.project) {
        temp.avatar = item.avatar;
        temp.URL = item.url;
        break;
      }
    }
    allProject.push(temp);
  }
  console.log(allProject);

  loadingMember.value = false;
})



//点击按钮跳转网址
const goPersonalsite = (URL: string) => {
  window.open(URL, "_blank");
}
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
  <div :style="isLargescreen? 'margin: 20px; width: 100%;' : 'margin: 20px; width: 90%;'">
    <el-skeleton :loading="loadingMember" :rows="10">
      <el-row gutter="40">
        <el-col :xs="23" :span="12">
          <div id="avatar" style="text-align: center">
            <img :src="memberInfo.profile.avatar" style="max-width: 150px;"/>
          </div>
          <div id="name">
          <h1 style="text-align: center">
            {{ memberInfo.profile.name }}
          </h1>
        </div>
        <p v-for="item in memberInfo.profile.role" :key="item" style="
        font-size: 16px;
        margin-top: 1px; 
        opacity: 0.7; 
        font-weight: bold;
        text-align: center;
        ">
          {{ item }}
        </p>
        <el-divider></el-divider>
        <p style="
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-top: 35px;
        ">
          {{ memberInfo.profile.major }}
        </p>
        <p style="
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 25px;
        opacity: 0.7;
        ">
          {{ memberInfo.profile.grade }}
        </p>
        <p style="
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 40px;
        ">
          {{ "Join in MOC on " + new Date(memberInfo.joinTime).toLocaleDateString() }}
        </p>
        <el-divider></el-divider>
        <h2 style="text-align: center; margin-left: 10px;">
          个人主页
        </h2>
        <div v-for="item in memberInfo.website" :key="item" style="display: flex; justify-content: center;">
          <el-button size="large" type="primary" @click="goPersonalsite(item.URL)" class="websiteBtn" 
          :style="isLargescreen? 'width: 50%' : 'width: 100%'">
            {{ item.name }}
          </el-button>
        </div>
        </el-col>
        <el-divider v-if="!isLargescreen"></el-divider>
        <el-col :xs="22" :span="11">
          <h1 style="text-align: left; margin-left: 10px;">
          参与项目
          </h1>
          <div v-for="item in allProject" :key="item.name" style="margin-bottom: 20px;">
            <el-card @click="goTo(item.name, item.URL)">
              <el-row style="align-items: center;">
                <el-col :span="6" >
                  <img :src="item.avatar? item.avatar : defaultAvatar"
                  :style="isLargescreen? 'max-width: 120px;' : 'max-width: 70px;'"/>
                </el-col>
                <el-col :span="18">
                  <el-row style="justify-content: center;">
                    <p class="projectName" :style="isLargescreen?
                    'font-size: 24px;' : 'font-size: 18px; margin: 5px;'">
                      {{ item.name }}
                    </p>
                  </el-row>
                  <el-row style="justify-content: center;">
                    <p class="projectContrib" :style="isLargescreen?
                    'font-size: 20px;' : 'font-size: 16px; margin: 5px;'">
                      {{ item.contrib }}
                    </p>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-skeleton>
  </div>
</template>

<style>
.websiteBtn {
  margin-bottom: 15px; 
  font-size: 16px;
}

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