const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    // { type: 'selection', label: '选择', width: '80px' },
    // { type: 'index', label: '序号', width: '80px' },
    { label: '菜单名称', prop: 'name', width: '150px' },
    { label: '级别', prop: 'type', width: '150px' },
    { label: '菜单url', prop: 'url', width: '150px' },
    { label: '菜单icon', prop: 'icon', width: '150px' },
    { label: '排序', prop: 'sort', width: '150px' },
    { label: '权限', width: '150px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
    // { type: 'custom', label: '666', prop: 'leader', slotName: 'leader' },
    // { type: 'custom', label: '777', prop: 'parentId', slotName: 'parent' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: 'chdren'
  }
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