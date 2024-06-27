<script setup>
import {reactive, ref} from 'vue'
import {ErrorInfo, SuccessInfo} from "../../utils/util.js";
import {UserRequest} from "../../request/request";

import router from "../../router/index.js";


const form = reactive({
  email: 'bellingham07@163.com',
  password: '123'
})

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  },
};

const login = () => {
  UserRequest.post('/login', form).then((res) => {
    if (res.data.code === 200) {
      localStorage.setItem('token', res.data.data.access_token)
      localStorage.setItem('uid', res.data.data.uid)
      // localStorage.setItem('role', res.data.data.role)
      SuccessInfo("登录成功")
    }else{
      ErrorInfo(res.data.msg)
    }
    router.push('/index/message')
  })
}
</script>

<template>
  <div class="login">
    <el-input class="login-button" v-model="form.email"
              placeholder="email"/>
    <el-input type="password" class="login-button"
              v-model="form.password" placeholder="password"/>
    <br>
    <el-button @click="login()" class="login-button"
               type="success">LOGIN
    </el-button>
    <br>
<!--    <router-link to="/reg">没有账号？立即注册</router-link>-->
  </div>
</template>

<style scoped>
.login-button {
  width: 80%;
  height: 60px;
  margin-left: 10%;
  margin-top: 10px;
  font-size: 25px;
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
}

a {
  width: 80%;
  height: 60px;
  margin-left: 43%;
  margin-top: 10px;
}
</style>
