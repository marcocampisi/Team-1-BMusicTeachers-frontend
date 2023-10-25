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
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link text-light fs-6 text-dark fw-bold" :to="{name: 'HomePage'}">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link text-light fs-6" :to="{name: 'teachers'}">I Nostri Teachers</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link text-light fs-6" :to="{name: 'HomePage'}">Chi Siamo</router-link>
                        </li>
                        <!-- <button class="btn">
                            <a href="http://127.0.0.1:8000/" target="_blank">
                                Sei un professore?</a>
                        </button> -->
                        <button class="button-64" role="button">
                            <a href="http://127.0.0.1:8000/" target="_blank"></a>
                            <span class="text"><i class="icon ion-md-person"></i>  Sei un professore?</span>
                        </button>
                    </ul>
                </div>
               
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss"></style>