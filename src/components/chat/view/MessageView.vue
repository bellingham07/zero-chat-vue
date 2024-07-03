<script setup>
import {onMounted, reactive} from "vue";
import {ChatRequest, UserRequest} from "@/request/request.js";
import {ErrorInfo} from "@/utils/util.js";
import {useCounterStore} from "@/store/store.js";
import router from "@/router/index.js";

const chatHistoryTmp = reactive({
  arr: []
})
const getAllHistory = () => {
  ChatRequest.get('/all').then((res) => {
    if (res.data.code === 200) {
      chatHistoryTmp.arr = res.data.data.list
    } else {
      ErrorInfo(res.data.msg)
    }
  })
}

const uid = useCounterStore()


const jumpPage=(userId)=>{
  router.push("/index/chat")
  uid.set(userId)
}

onMounted(() => {
  getAllHistory()
})
</script>

<template>
  <div class="big-box">
    <div style="text-align: center;border-bottom-style: solid;color: #535bf2">
      <span>click to enter chat</span>
    </div>
    <div @click="jumpPage(c.to_uid)" class="little-box" v-for="c in chatHistoryTmp.arr" :key="c.to_uid">
<!--      {{ c.to_uid }}-->
      {{ c.to_user }}:
      {{ c.last_msg }}
    </div>
  </div>
</template>

<style scoped>
.little-box{
  border-bottom-style: solid;
}
.big-box {
  display: flex;
  flex-direction: column;
}
</style>