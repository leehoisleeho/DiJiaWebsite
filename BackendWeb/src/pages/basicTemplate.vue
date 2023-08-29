<script setup>
import {ref} from 'vue'

/**
 * 抽屉
 */
const visible = ref(false)
const showDrawer = () => {
  visible.value = true
}
const onConfirm = () => {
  setTimeout(() => {
    dataList.value.push({
      id: 5,
      name: "yaoyao"
    })
    visible.value = false
  }, 500)
}
// 确认删除
const onConfirmDel = (index) => {
  console.log('删除')
  console.log(index)
  dataList.value.splice(index, 1)
}
// 数据列表
const dataList = ref([
  {id: 1, name: "leeho"},
  {id: 2, name: "lihao"},
  {id: 3, name: "likunling"},
  {id: 4, name: "lapland"},
])
</script>

<template>
  <div class="container">
    <t-drawer v-model:visible="visible" header="新增项目" size="888px" @confirm="onConfirm">
      <p>内容</p>
    </t-drawer>
    <div class="infoBox">
      <div class="add">
        <t-button theme="success" style="margin-right: 20px" @click="showDrawer">新增</t-button>
      </div>
      <ul class="tableTitle">
        <li>序号</li>
        <li>合作项目</li>
        <li>联系人</li>
        <li>联系方式</li>
        <li>联系人行业</li>
        <li>操作</li>
      </ul>
      <TransitionGroup name="list" tag="div">
        <ul class="tableinfo" v-for="(item,index) in dataList" :key="index">
          <li>1</li>
          <li>2</li>
          <li>{{ item.name }}</li>
          <li>4</li>
          <li>5</li>
          <li class="operate">
            <t-button theme="primary" size="small" style="margin-right: 10px">查看</t-button>
            <t-popconfirm content="确认删除吗" @confirm="onConfirmDel(index)">
              <t-button theme="danger" size="small" style="margin-left: 10px">删除</t-button>
            </t-popconfirm>
          </li>
        </ul>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 300ms ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.tableinfo {
  display: flex;
  height: 60px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #efefef;
}

.add {
  padding: 20px 0;
  display: flex;
  flex-direction: row-reverse;
}

.operate {
  display: flex;
  justify-content: center;
}

.tableTitle {
  display: flex;
  height: 70px;
  align-items: center;
  font-weight: 600;
}

.tableinfo > li {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #333;
}

.tableTitle > li {
  flex: 1;
  text-align: center;
  font-size: 15px;
  color: #333;
}

.infoBox {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.container {
  padding: 30px;
}
</style>