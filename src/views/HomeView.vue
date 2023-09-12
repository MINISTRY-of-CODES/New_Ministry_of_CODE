<script setup lang="ts">

import {ref} from "vue";

const width = ref(window.innerWidth);

</script>

<template>

  <div>
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
      <h1>社团介绍</h1>
    </div>
    <el-divider />
    <div id="members">
      <h1>
        人员介绍
      </h1>
    </div>
  </div>

</template>