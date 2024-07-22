<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="createUser">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />
        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <template #default="scope"
            ><el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'">
              {{ scope.row.enable ? '启用' : '禁用' }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope"> {{ formatUTC(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}</template
          ></el-table-column
        >

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button size="small" icon="Edit" type="primary" text @click="handleEdit(scope)">
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button></template
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        v-model:page-size="pagesize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total,sizes,jumper, prev, pager, next"
        :total="usersTotalCount"
        v-model:current-page="currentpage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'

const emit = defineEmits(['createClick'])
// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
// systemStore.postUsersListAction()

// 2.获取usersList数据,进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)
//新建用户
const createUser = function () {
  emit('createClick')
}
//修改用户
function handleEdit(userinfo: any) {
  console.log('userinfo :>> ', userinfo)
}
//删除
const handleDeleteBtnClick = (id: any) => {
  console.log(' 1111111111111111111 ', id)
  systemStore.deleteUserAction(id)
}
//分页定义
let pagesize = ref(10)
let currentpage = ref(1)
const handleCurrentChange = () => {
  fetchUserListData()
}
const handleSizeChange = () => {
  fetchUserListData()
}
//网络请求定义
fetchUserListData()
function fetchUserListData(formData: any = {}) {
  const size = pagesize.value
  const offset = (currentpage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  console.log('queryInfo :>> ', queryInfo)
  console.log('typeof queryInfo :>> ', typeof queryInfo)
  systemStore.postUsersListAction(queryInfo)
}

defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 10px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
