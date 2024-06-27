<script setup>
import {onMounted} from "vue";

const initWs=()=>{
  var ws = new WebSocket("ws://localhost:7272/chat/ws");

  ws.onopen = function(event) {
    console.log("WebSocket connected");
    const uid= localStorage.getItem("uid")
    // JSON.parse(token)
    ws.send(`{"uid":"${uid}"}`)
  };

  ws.onmessage = function(event) {
    var message = event.data;
    console.log("return msg:",message)
    var messageElement = document.createElement("div");
    messageElement.innerText = message;
    document.getElementById("messages").appendChild(messageElement);
  };

  document.getElementById("messageForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value;
    ws.send(message);
    messageInput.value = "";
  });
}

onMounted(
    ()=>{
      initWs()
    }
)
</script>

<template>
<div>
  <div id="messages"></div>
  <form id="messageForm">
    <input type="text" id="messageInput" autocomplete="off" placeholder="Type your message...">
    <button type="submit">Send</button>
  </form>
</div>
</template>

<style scoped>

</style>