import { createRouter, createWebHistory } from "vue-router";

import SingleTeacherPage from '../pages/SingleTeacherPage.vue';
import MainPage from '../pages/MainPage.vue';
import Homepage from '../pages/Homepage.vue';
import Info from '../pages/Info.vue';

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/',
      name:'HomePage',
      component:Homepage,
    },
    {
      path:'/teachers',
      name:'teachers',
      component:MainPage,
    },
    {
      path:'/info',
      name:'info',
      component:Info,
    },
    {
      path:'/teacher/:id',
      name:'singleTeacher',
      component:SingleTeacherPage,
    }
  ]
})

export { router };