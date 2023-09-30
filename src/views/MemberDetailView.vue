<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
const router = useRouter();
const id = ref(router.currentRoute.value.params.id);
const memberInfo = ref<any>({});

const loadingMember = ref(true);
const infoURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members/" +
      id.value + "/info.json";

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

onMounted(async () => {
  memberInfo.value = await fetch(infoURL).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });
  console.log(memberInfo.value);



  loadingMember.value = false;
})

//点击按钮跳转网址
const goTo = (URL: string) => {
  window.open(URL, "_blank");
}

</script>

<template>
  <div>
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
        <div v-for="item in memberInfo.website" :key="item" style="display: flex; justify-content: center;">
          <el-button size="large" type="primary" @click="goTo(item.URL)" class="websiteBtn" 
          :style="isLargescreen? 'width: 50%' : 'width: 100%'">
            {{ item.name }}
          </el-button>
        </div>
        </el-col>

        <el-col :xs="22" :span="11">
        
        
        
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

</style>