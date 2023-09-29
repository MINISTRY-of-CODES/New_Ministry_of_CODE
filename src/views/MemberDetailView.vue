<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
const router = useRouter();
const id = ref(router.currentRoute.value.params.id);
const memberInfo = ref<any>({});

const loadingMember = ref(true);
const infoURL = "https://raw.githubusercontent.com/MINISTRY-of-CODES/New_Ministry_of_CODE/master/static/members/" +
      id.value + "/info.json";

onMounted(async () => {
  memberInfo.value = await fetch(infoURL).then(res => res.json()).catch(err => {
    console.log(err);
    router.push("/404");
  });
  console.log(memberInfo.value);



  loadingMember.value = false;
})


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
        </el-col>
        <el-col :xs="22" :span="11">
        
        
        
        </el-col>
      </el-row>
      


    </el-skeleton>
  </div>
</template>