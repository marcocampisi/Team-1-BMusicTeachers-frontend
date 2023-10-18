import { createRouter, createWebHistory } from "vue-router";

import SingleTeacherPage from '../pages/SingleTeacherPage.vue';
import MainPage from '../pages/MainPage.vue';

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/',
      name:'HomePage',
      component:MainPage,
    },
    {
      path:'/teacher/:id',
      name:'singleTeacher',
      component:SingleTeacherPage,
    }
  ]
})

export { router };