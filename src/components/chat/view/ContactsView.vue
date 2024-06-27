<script setup>
import {onMounted, reactive} from "vue";
import {UserRequest} from "@/request/request.js";
import {ErrorInfo} from "@/utils/util.js";

const allContacts=reactive({
  arr:[]
})
const getContacts=()=>{
  UserRequest.post("/get").then((res)=>{
    if (res.data.code===200){
      allContacts.arr=res.data.data.list
    }else {
      ErrorInfo("get contacts error")
    }
  })
}

onMounted(
    ()=>{
      getContacts()
    }
)
</script>

<template>
<div>
  <div class="big-box">
    <div class="contacts-box" v-for="c in allContacts.arr" :key="c">
      {{c.email}}
      {{c.nickname}}
    </div>
  </div>
</div>
</template>

<style scoped>
.big-box{
  display: flex;
  flex-direction: column;
}
.contacts-box{
  width: 100%;
  height: 100px;
  //background-color: red;
  //border-left-style: solid;
  //border-right-style: solid;
  border-bottom-style: solid;
}
</style>