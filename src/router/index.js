import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Task1 from '../pages/Task1.vue'
import Task2 from '../pages/Task2.vue'
import Task3 from '../pages/Task3.vue'
import Task4 from '../pages/Task4.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/task1',
    name: 'Task1',
    component: Task1,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/task2',
    name: 'Task2',
    component: Task2,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/task3',
    name: 'Task3',
    component: Task3,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/task4',
    name: 'Task4',
    component: Task4,
    props: (route) => ({ query: route.query.q })
  }
]

const router = new VueRouter({
  routes
})

export default router
