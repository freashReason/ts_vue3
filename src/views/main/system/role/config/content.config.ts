const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '角色名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '权限介绍', prop: 'intro', width: '150px' },
    // { type: 'normal', label: '上级部门', prop: 'parentId', width: '150px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
    // { type: 'custom', label: '666', prop: 'leader', slotName: 'leader' },
    // { type: 'custom', label: '777', prop: 'parentId', slotName: 'parent' }
  ]
  // 1.selection 2.index
  // { type: 'selection', label: '选择', width: '80px' },
  // { type: 'index', label: '序号', width: '80px' },
  // { type: 'normal', label: '部门名称', prop: 'name', width: '150px' },
  // { type: 'normal', label: '部门领导', prop: 'leader', width: '150px' },
  // { type: 'normal', label: '上级部门', prop: 'parentId', width: '150px' },
  // {
  //   type: 'custom',
  //   label: '部门领导',
  //   prop: 'leader',
  //   width: '150px',
  //   slotName: 'leader'
  // },
  // {
  //   type: 'custom',
  //   label: '上级部门',
  //   prop: 'parentId',
  //   width: '150px',
  //   slotName: 'parent'
  // },
  // { type: 'timer', label: '创建时间', prop: 'createAt' },
  // { type: 'timer', label: '更新时间', prop: 'updateAt' },
  // { type: 'handler', label: '操作', width: '150px' }
  // ]
}

export default contentConfig
