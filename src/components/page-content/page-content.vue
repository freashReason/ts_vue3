<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border v-bind="contentConfig.childrenTree" style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template></el-table-column
            ></template
          >

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item" v-if="isDelete && isUpdate">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button></template
              >
            </el-table-column></template
          >
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
              </template> </el-table-column
          ></template>

          <template v-else> <el-table-column align="center" v-bind="item" /> </template>
        </template>
        <!-- <el-table-column align="center" type="selection" width="50px" />
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
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total,sizes,jumper, prev, pager, next"
        :total="pageTotalCount"
        v-model:current-page="currentPage"
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
import useLoginStore from '@/store/login/login'

//配置文件
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
// 定义事件
const emit = defineEmits(['newClick', 'editClick'])
//定义权限
const loginStore = useLoginStore()
const { permissions } = loginStore
const isCreate = permissions.find((item) => item.includes(`${props.contentConfig.pageName}:create`))
const isDelete = permissions.find((item) => item.includes(`${props.contentConfig.pageName}:delete`))
const isUpdate = permissions.find((item) => item.includes(`${props.contentConfig.pageName}:update`))
const isQuery = permissions.find((item) => item.includes(`${props.contentConfig.pageName}:query`))

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()

const pageSize = ref(10)

// onMounted(() => {
//   console.log(`the component is now mounted.`)
//   const { pageList, pageTotalCount, currentPage } = storeToRefs(systemStore)

// })
// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount, currentPage } = storeToRefs(systemStore)
console.log('currentPage :>> ', currentPage)
fetchPageListData()
// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数, 用于发送网络请求
function fetchPageListData(formData: any = {}) {
  // 1.获取offset/size
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // const offset = 0
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
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
