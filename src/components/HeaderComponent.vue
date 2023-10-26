<script>
import { store } from '../js/store';
import axios from 'axios';
export default {
    name: 'HeaderComponent',
    props: {
       filterTeachers: Function
    },
    data() {
        return {
            store,
           
        }
    },
    methods: {
       
    }
}

</script>

<template>
    <header>
        <nav class="navbar navbar-dark navbar-expand-lg bg-transparent">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img class="logo" src="../assets/logo.png" alt="Musicisti in rete Logo">
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav nav-header ms-auto mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link color-lg fw-bold" :to="{name: 'HomePage'}">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link color-lg fw-bold" :to="{name: 'teachers'}">I Nostri Teachers</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link color-lg fw-bold" :to="{name: 'info'}">Chi Siamo</router-link>
                        </li>
                        <a class="button-64 m-l-1" href="http://127.0.0.1:8000/login" target="_blank"><span class="text"><i class="icon ion-md-person"></i>  Sei un professore?</span></a>
                    </ul>
                </div>
               
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');

.nav-header *{
  transition: all .35s ease;
}

.color-lg{
    color: rgb(57, 241, 11);
    font-family: 'Titillium Web';
    text-transform: uppercase;
    font-weight: 300;
}
.button-64{
    font-family: 'Titillium Web';
    text-transform: uppercase;

}
.nav-header .color-lg{
  padding: .5em .8em;
  color: rgba(255,255,255);
  position: relative;
  text-decoration: none;
  font-size: 13px;
}

.nav-header .color-lg::before,
.nav-header .color-lg::after {
  content: '';
  height: 14px;
  width: 14px;
  position: absolute;
  transition: all .35s ease;
  opacity: 0;
}

.nav-header .color-lg::before {
  content: '';
  right: 0;
  top: 0;
  border-top: 3px solid #3E8914;
  border-right: 3px solid #2E640F;
  transform: translate(-100%, 50%);
}

.nav-header .color-lg:after {
  content: '';
  left: 0;
  bottom: 0;
  border-bottom: 3px solid #2E640F;
  border-left: 3px solid #3E8914;
  transform: translate(100%, -50%)
}

.nav-header .color-lg:hover:before,
.nav-header .color-lg:hover:after{
  transform: translate(0,0);
  opacity: 1;
}

.nav-header .color-lg:hover {
  color: rgb(57, 241, 11);
}

</style>