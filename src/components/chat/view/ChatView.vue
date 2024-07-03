<script setup>
import {useCounterStore} from "@/store/store.js";
import {onMounted, reactive, ref} from "vue";
import {ChatRequest} from "@/request/request.js";
import {ErrorInfo} from "@/utils/util.js";
import websocketService from "@/websocket/websocket.js";

const uid = ref()
const msgInfo = reactive({
  'msg': '',
  'uid': ''
})
const counterStore = useCounterStore();

const initWs = () => {
  websocketService.ws.onmessage = function (event) {
    var message = event.data;
    const tmp = JSON.parse(message)
    const msg = `${tmp.fromUid}:${tmp.body}`
    insertMsgToPage(msg)
  };
}

let detailHistory = reactive({
  arr: []
})
const getHistoryChat = () => {
  const data = {
    'to_uid': parseInt(counterStore.count)
  }
  ChatRequest.post('/detail', data).then((res) => {
    if (res.data.code === 200) {
      detailHistory.arr = res.data.data.list
    } else {
      ErrorInfo(res.data.msg)
    }
  })
}

const insertMsgToPage = (message) => {
  var messageElement = document.createElement("div");
  messageElement.innerText = message;
  document.getElementById("messages").appendChild(messageElement);
}
const initStore = () => {
  uid.value = counterStore.count
}

const sendMsg = () => {
  msgInfo.uid = String(counterStore.count)
  const curUid = localStorage.getItem("uid")
  ChatRequest.post('/send', msgInfo).then((res) => {
    if (res.data.code === 200) {
      console.log("ok")
      insertMsgToPage(`${curUid}:${msgInfo.msg}`)
      msgInfo.msg = ''
    } else {
      ErrorInfo("send failed")
    }
  })
}

onMounted(
    () => {
      initStore()
      initWs()
      getHistoryChat()
    }
)
</script>

<template>
  <div class="chat-container">
    <!--    todo: in fact ,this field should be nickname-->
    <div class="username">username:{{ uid }}</div>
    <div v-for="c in detailHistory.arr">
     {{c.send_id}}:{{c.msg}}
    </div>
    <div id="messages"></div>
    <div class="send">
      <el-input placeholder="input message..." v-model="msgInfo.msg" @keydown.enter="sendMsg"></el-input>
      <el-button @click="sendMsg()">send</el-button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* 让组件高度充满父容器 */
}

.send {
  margin-top: auto; /* 将发送区域推到容器的底部 */
  display: flex;
  flex-direction: row;
//padding: 10px; background-color: white; /* 根据需要设置背景颜色 */
}

.username {
  border-bottom-style: solid;
  margin-bottom: 5px;
  text-align: center;
}

/* 可选：增加消息区域样式 */
#messages {
  flex: 1;
  overflow-y: auto;
}
</style>
