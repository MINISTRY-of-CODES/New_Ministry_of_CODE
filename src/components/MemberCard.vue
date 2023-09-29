<template>
  <div>
    <el-card style="text-align: center;" :body-style="{ padding: '0px' }" @click="goTo(props.member.name)">
      <img v-if="width >= 460" :src="props.member.avatar" alt="avatar" style="width: 100%; max-width: 150px; max-height: 150px; object-fit:scale-down; object-position: bottom;">
      <img v-else :src="props.member.avatar" alt="avatar" style="width: 100%;max-width: 90px; max-height: 90px; object-fit:scale-down; object-position: bottom;">
      <h2 style="margin-bottom: 10px">
        {{ props.member.name }}
      </h2>
      <p style="font-size: 15px;margin-top: 1px; opacity: 0.7; font-weight: bold">
        {{ props.member.role }}
      </p>
    </el-card>
</div>
</template>

<script setup lang="ts">
import {onMounted, ref, type PropType} from "vue";

// 检测屏幕大小
const width = ref(window.innerWidth);
onMounted(() => {
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})

// 父传子数据
type Member = {
  name: string,
  role: string,
  avatar: string
}
const props = defineProps({
  member: {
    type: Object as PropType<Member>,
    required: true
  }
})

// 点击跳转成员详情页面
const goTo = (member: string) => {
  member = member.replace(/\s+/g, '').toLowerCase(); // 去除空格，转换为小写
  window.open("/member/" + member, "_blank")
}

</script>