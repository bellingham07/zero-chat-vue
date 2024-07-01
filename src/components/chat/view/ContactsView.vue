<script setup>
import {onMounted, reactive, ref} from "vue";
import {UserRequest} from "@/request/request.js";
import {ErrorInfo, SuccessInfo} from "@/utils/util.js";
import router from "@/router/index.js";
import {useCounterStore} from "@/store/store.js";
import {ElMessageBox} from "element-plus";

const allContacts = reactive({
  arr: []
})
const getContacts = () => {
  UserRequest.post("/get").then((res) => {
    if (res.data.code === 200) {
      allContacts.arr = res.data.data.list
    } else {
      ErrorInfo("get contacts error")
    }
  })
}

const uid = useCounterStore()

const sendMsg = (c) => {
  console.log("?")
  router.push("/index/chat")
  uid.set(c.id)
}

const searchValue = ref()
const searchContacts = () => {
  const data = {
    'key': searchValue.value
  }
  UserRequest.post('/search', data).then((res) => {
    if (res.data.code === 200) {
      allContacts.arr = res.data.data.list
    } else {
      ErrorInfo(res.data.data.msg)
    }
  })
}

let newContacts = reactive({
  'id': 0,
  'nickname': '',
  'email': ''
})
const addContactsVisible = ref(false)
const searchContactsVisible = ref(false)
const addContactUid = ref()
const searchContact = () => {
  const data = {
    'uid': addContactUid.value
  }
  UserRequest.post('/search/user', data).then((res) => {
    if (res.data.code === 200) {
      console.log("res:", res.data.data)
      newContacts = res.data.data
      searchContactsVisible.value = true
    }else{
      ErrorInfo(res.data.msg)
    }
  })
}
const closeContact = () => {
  addContactsVisible.value = false;
  searchContactsVisible.value = false;
  addContactUid.value = ''
}
const addContact=()=>{
  const data = {
    'uid': newContacts.id.toString()
  }
  UserRequest.post('/add', data).then((res) => {
    if (res.data.code === 200) {
      SuccessInfo("request successful")
      closeContact()
    }else{
      ErrorInfo(res.data.msg)
    }
  })
}

const del = () => {
  console.log("delete")
}

onMounted(() => {
  getContacts()
})
</script>

<template>
  <div class="big-box">
    <div class="header-box">
      <div class="header-box-2">
        <el-input v-model="searchValue" style="width: 100%" placeholder="search friends..."></el-input>
      </div>
      <div class="header-box-1">
        <el-button @click="searchContacts" style="width: 100%">🔍</el-button>
      </div>
      <div class="header-box-1">
        <el-button @click="addContactsVisible=true" style="width: 100%">➕</el-button>
      </div>
    </div>
    <div class="contacts-container">
      <div class="contacts-box" v-for="c in allContacts.arr" :key="c.id">
        <div>
          {{ c.email }}
          {{ c.nickname }}
        </div>
        <div>
          <el-button type="success" @click="sendMsg(c)">send msg</el-button>
          <el-popconfirm @confirm="del" title="Are you sure to delete this friend?">
            <template #reference>
              <el-button>Delete</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>

  <!--  add contacts visible-->
  <div class="mask" v-if="addContactsVisible">
    <div class="box">
      <div class="little-box">
        <el-input v-model="addContactUid" placeholder="please input uid..."></el-input>
        <el-button @click="searchContact">search</el-button>
      </div>
      <div v-if="searchContactsVisible">
        uid->{{ newContacts.id }}<br>
        nickname->{{ newContacts.nickname }}<br>
        email->{{ newContacts.email }}<br>
        <el-button @click="addContact">add</el-button>
      </div>
      <el-button type="danger" @click="closeContact">关闭</el-button>
      <!--      <el-button type="primary" @click="addPlantPlanButton()">添加</el-button>-->
    </div>
  </div>

</template>

<style scoped>
.little-box {
  padding: 10px;
  margin: 3px;
  display: flex;
  flex-direction: row;
//border-bottom: 1px solid black;
}

.box {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  width: 30%;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.header-box {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
}

.header-box-1 {
  flex: 2;
}

.header-box-2 {
  flex: 6;
}

.big-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh; /* Adjust based on your layout */
}

.contacts-container {
//flex: 1; height: 100vh; overflow-y: hidden;
}

.contacts-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
