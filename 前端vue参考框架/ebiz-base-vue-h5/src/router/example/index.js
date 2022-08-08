//定义相关组件
const rate = () => import('@/views/example/Rate')
const formValidate = () => import('@/views/example/FormValidate')
const test1 = () => import('@/views/example/Test1')
const test2 = () => import('@/views/example/Test2')
const test3 = () => import('@/views/example/Test3')
const test4 = () => import('@/views/example/Test4')

export default [
  {
    path: '/rate',
    name: 'rate',
    component: rate,
    meta: {
      title: '评分示例',
      index: 1
    }
  },
  {
    path: '/formValidate',
    name: 'formValidate',
    component: formValidate,
    meta: {
      title: '表单校验示例',
      auth: true,
      index: 1
    }
  },
  {
    path: '/test1',
    name: 'test1',
    component: test1,
    meta: {
      title: '测试一',
      index: 1
    }
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2,
    meta: {
      title: '测试二',
      index: 1
    }
  },
  {
    path: '/test3',
    name: 'test3',
    component: test3,
    meta: {
      title: '测试三',
      index: 1
    }
  },
  {
    path: '/test4',
    name: 'test4',
    component: test4,
    meta: {
      title: '测试四',
      index: 1
    }
  }
]
