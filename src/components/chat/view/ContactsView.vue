<script setup>
import {onMounted, reactive, ref} from "vue";
import {UserRequest} from "@/request/request.js";
import {ErrorInfo} from "@/utils/util.js";
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
  router.push("/index/chat")
  uid.set(c.id)
}

const del = () => {
  console.log("delete")
}

onMounted(
    () => {
      getContacts()
    }
)
</script>

<template>
  <div>
    <div class="big-box">
      <div class="header-box">
        <div class="header-box-2">
          <el-input style="width: 100%" placeholder="search friends..."></el-input>
        </div>
        <div class="header-box-1">
          <el-button style="width: 100%">🔍</el-button>
        </div>
        <div class="header-box-1">
          <el-button style="width: 100%">➕</el-button>
        </div>
      </div>
      <div class="contacts-box" v-for="c in allContacts.arr" :key="c">
        {{ c.email }}
        {{ c.nickname }}
        <el-button type="success" @click="sendMsg(c)">send msg</el-button>
        <el-popconfirm @confirm="del" title="Are you sure to delete this friends?">
          <template #reference>
            <el-button>Delete</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-box {
  display: flex;
//flex-direction: row; justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-style: solid;
  margin: 5px 0 5px 0;
}

.header-box-1 {
  flex: 2;
//flex-grow: 1;
}

.header-box-2 {
  flex: 6;
}

.big-box {
  display: flex;
  flex-direction: column;
  //margin : 10px;
}

.contacts-box {
  width: 100%;
  height: 100px;
//background-color: red; //border-left-style: solid; //border-right-style: solid; border-bottom-style: solid;

}
</style>