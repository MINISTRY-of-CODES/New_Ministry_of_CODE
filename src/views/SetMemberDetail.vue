<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const member_url = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members/membersList.json?123";
const project_url = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/projects/projectsList.json?123";
const existedData = ref<any>({});
const memberData = ref<any>({});
const projectData = ref<any>({});
const memberList = ref<any>([]);
const projectList = ref<any>([]);

const gradeList = ["Freshman year", "Sophomore year", "Junior year", "Senior year"];
const websiteList = ["GitHub", "BiliBili"];

onMounted(async () => {
    memberData.value = await fetch(member_url).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });
  projectData.value = await fetch(project_url).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });
  // 提取成员列表
  for (let index1 = 0; index1 < memberData.value.length; index1++) {
    for (let index2 = 0; index2 < memberData.value[index1].members.length; index2++) {
      memberList.value.push(memberData.value[index1].members[index2].name);
    }
  }
  //console.log(memberList.value);
  // 提取项目列表
  for (let index = 0; index < projectData.value.length; index++) {
    projectList.value.push(projectData.value[index].project);
  }
  //console.log(projectList.value);
})

// 文件构造
const profileData = reactive({
  name: "",
  role: <any>[],
  avatar: "",
  major: "",
  grade: "",
  joinTime: "",
})

const websiteData = reactive([
  {
    name: "",
    URL: "",
  }
])

const contribData = reactive([
  {
    name: "",
    contribute: ""
  }
])

// 侦听姓名栏并自动搜索获取已存在信息
const name = ref("");
watch(name, async(input) => {
  console.log("here");
  var nameUrl = input.replace(/\s+/g, '').toLowerCase();
  const existedUrl = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members/" + nameUrl + "/info.json";
  existedData.value = await fetch(existedUrl).then(res => res.json()).catch(err => {
    console.log(err);
    while (websiteData.length > 0) {
      websiteData.pop();
    }
    while (contribData.length > 0) {
      contribData.pop();
    }
    websiteData.push({
      name: "",
      URL: "",
    })
    contribData.push({
      name: "",
      contribute: ""
    })
    profileData.avatar = "";
    profileData.grade = "";
    profileData.joinTime = "";
    profileData.major = "";
    profileData.name = "";
    profileData.role = "";
  });
  if (existedData != null) {
    profileData.major = existedData.value.profile.major;
    profileData.grade = existedData.value.profile.grade;
    profileData.joinTime = existedData.value.profile.joinTime;
    for(let index = 0; index < existedData.value.website.length; index++){
      websiteData.push(existedData.value.website[index]);
    }
    for(let index = 0; index < existedData.value.project.length; index++){
      contribData.push(existedData.value.project[index]);
    }
  }
})

// 添加/删除表单项函数
const addWebsite = () => {
  websiteData.push({
    name: "",
    URL: ""
  })
}
const removeWebsite = (item: any) => {
  const index = websiteData.indexOf(item)
  if (index !== -1) {
    websiteData.splice(index, 1)
  }
}
const addContrib = () => {
  contribData.push({
    name: "",
    contribute: ""
  })
}
const removeContrib = (item: any) => {
  const index = contribData.indexOf(item)
  if (index !== -1) {
    contribData.splice(index, 1)
  }
}

// 提交表单函数
const jsonString = ref("");
const submit = (selector: any) => {
  profileData.name = name.value;
  getRoleAvatar(profileData.name);
  profileData.joinTime = profileData.joinTime.toLocaleString().substring(0, 10); // 转换日期格式
  const info = {};
  Object.assign(info, { profile: profileData, project: contribData, website: websiteData });

  // 生成格式化的JSON字符串
  jsonString.value = JSON.stringify(info, null, 2);
  console.log(jsonString.value);



  document.querySelector(selector).scrollIntoView({
    behavior: "smooth"
  });
}
const getRoleAvatar = (name: string) => { // 获取该成员的岗位信息以及头像信息
  var department: string;
  for (let index1 = 0; index1 < memberData.value.length; index1++) {
    department = memberData.value[index1].department;
    for (let index2 = 0; index2 < memberData.value[index1].members.length; index2++) {
      if (name == memberData.value[index1].members[index2].name) {
        profileData.role.push(department + " " + memberData.value[index1].members[index2].role);
        profileData.avatar = memberData.value[index1].members[index2].avatar;
      }
    }
  }
}

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

const onCopyDown = () => {
  // 复制 id 为 code 的元素的内容
  const code: any = document.getElementById("code");
  const range = document.createRange();
  range.selectNode(code);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeRange(range);
    alert("复制成功！")
    // 全选
    document.getSelection()?.selectAllChildren(code);
  }
}


</script>


<template>
  <div :style="isLargescreen ? 'margin: 20px; width: 100%;' : 'margin: 20px; width: 90%;'">
    <el-row>
      <el-col :xs="23" :span="12">
        <h1 style="text-align: center;">
          成员信息设置界面
        </h1>
        <div>
          <h3 class="title">
            完善个人信息
          </h3>
          <el-form v-model="profileData" :label-width="isLargescreen ? '160px' : '70px'">
            <el-form-item label="姓名">
              <el-select v-model="name" placeholder="请选择姓名">
                <div v-for="item in memberList" :key="item">
                  <el-option :label="item" :value="item" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="profileData.major" placeholder="请输入专业信息" />
            </el-form-item>
            <el-form-item label="年级">
              <el-select v-model="profileData.grade" placeholder="请选择年级">
                <div v-for="item in gradeList" :key="item">
                  <el-option :label="item" :value="item" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="加入日期">
              <el-date-picker v-model="profileData.joinTime" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-form>
          <el-divider />
          <h3 class="title">
            添加个人主页
          </h3>
          <el-form v-model="websiteData" :label-width="isLargescreen ? '160px' : '70px'">
            <div v-for="item in websiteData" :key="item.name">
              <el-form-item label="网站">
                <el-select v-model="item.name" placeholder="请选择网站">
                  <div v-for="website in websiteList" :key="website">
                    <el-option :label="website" :value="website" />
                  </div>
                </el-select>
              </el-form-item>
              <el-form-item label="URL">
                <el-input v-model="item.URL" placeholder="请输入个人主页URL" />
                <el-button type="danger" @click.prevent="removeWebsite(item)" style="margin-top: 5px;">删除</el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addWebsite">添加一项</el-button>
            </el-form-item>
          </el-form>
          <h3 class="title">
            添加项目参与
          </h3>
          <el-form v-model="contribData" :label-width="isLargescreen ? '160px' : '70px'">
            <div v-for="item in contribData" :key="item.name">
              <el-form-item label="项目">
                <el-select v-model="item.name" placeholder="请选择项目">
                  <div v-for="project in projectList" :key="project">
                    <el-option :label="project" :value="project" />
                  </div>
                </el-select>
              </el-form-item>
              <el-form-item label="参与内容">
                <el-input v-model="item.contribute" placeholder="请输入参与内容" />
                <el-button type="danger" @click.prevent="removeContrib(item)" style="margin-top: 5px;">删除</el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addContrib">添加一项</el-button>
            </el-form-item>
          </el-form>
          <el-divider />
          <div style="text-align: center; margin-top: 30px;">
            <el-button size="large" type="primary" @click="submit('#result')"
              :style="isLargescreen ? 'width: 50%' : 'width: 100%'">
              提交
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="23" :span="12">
        <h3 style="margin-top: 20px">
          生成的JSON文件
        </h3>
        <div style="text-align: center; margin-left: 10px; border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px">
          <p id="result" style="text-align: left; width: 80%;">
          <pre id="code" v-html="jsonString" @click="onCopyDown()"></pre>
          </p>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
.title {
  text-align: center;
  margin-top: 35px;
  opacity: 0.8;
}
</style>