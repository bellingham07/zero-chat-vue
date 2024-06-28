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
    console.log("return msg:", message)
    var messageElement = document.createElement("div");
    messageElement.innerText = message;
    document.getElementById("messages").appendChild(messageElement);
  };
}

const initStore = () => {
  uid.value = counterStore.count
}

const sendMsg = () => {
  msgInfo.uid = String(counterStore.count)
  ChatRequest.post('/sub', msgInfo).then((res) => {
    if (res.data.code === 200) {
      console.log("ok")
    } else {
      ErrorInfo("send failed")
    }
  })
}

onMounted(
    () => {
      initStore()
      initWs()
    }
)
</script>

<template>
  <div>chat
    {{ uid }}
    <div>
      <div id="messages"></div>
      <el-input placeholder="input message..." v-model="msgInfo.msg"></el-input>
      <el-button @click="sendMsg()">send</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>