import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import Task1 from '../components/Task1.vue'
import Task2 from '../components/Task2.vue'
import Task3 from '../components/Task3.vue'

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
    component: Task1
  },
  {
    path: '/task2',
    name: 'Task2',
    component: Task2
  },
  {
    path: '/task3',
    name: 'Task3',
    component: Task3
  }
]

const router = new VueRouter({
  routes
})

export default router
