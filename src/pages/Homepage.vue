<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import { store } from '../js/store';

export default {
    name: 'Homepage',
    data() {
        return {
            teacherArray: [],
            store,
            loading:false,
            subjectsArray: [],
        };
    },
    methods: {
        getData() {
            this.teacherArray = []
            this.loading = true

            axios.get('http://localhost:8000/api/teachers')
                .then(res => {
                    this.teacherArray = res.data.results;
                    this.loading = false
                });
        },
        getSubjects() {
            axios.get('http://localhost:8000/api/subjects')
                .then(res => {
                    this.subjectsArray = res.data.results;
                });
        },
     
        filterTeachers() {
            this.teacherArray = []
            this.loading = true

            axios.post(`http://localhost:8000/api/teachers/search`, {
                data: this.store.teacherQuery,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                this.teacherArray = res.data.results;
                this.loading = false

            });

            
        },
    },
    components: {
        HeaderComponent
    },
}
</script>

<template>
    <HeaderComponent/>
    <main class="mt-3 container">
        <div class="debug">
            <h1 class="text-left h1 text-light fw-bold">Musicisti<br>in Rete</h1>
            <h6 class="h6">Migliaia di insegnanti a portata di click</h6>
            <router-link :to="{name: 'teachers'}">
                <button class="mt-5">
                    <div class="text">
                        <span>Vai</span>
                        <span>al</span>
                        <span>tasto</span>
                    </div>
                    <div class="clone">
                        <span>Teachers</span>
                    </div>
                    <svg width="20px" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </button>
            </router-link>   

        </div>

        <!-- <form action="" class="input-search" @submit.prevent="filterTeachers()" role="search">
            <div class="input-box">
                <i class="icon ion-md-search"></i>
                <input type="search" placeholder="Cosa aspetti?cerca subito l'insegnante che fa per te">
                <button class="button-search">Cerca</button>
            </div>
        </form> -->
    </main>
</template>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');

.h1,
.h6{
    font-family: 'Titillium Web';
}
.search{
    max-width: 800px;
    margin-inline: auto;
    margin-block: 20px;
}

.loading{
    margin-inline: auto;
    margin-top: 20px;
}

button {
  width: 140px;
  height: 56px;
  overflow: hidden;
  border: none;
  color: rgba(11, 153, 163, 0.842);
  background: none;
  position: relative;
  padding-bottom: 2em;
}

button > div,button > svg {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}

button:before {
  content: "";
  position: absolute;
  height: 2px;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: scaleX(0);
  transform-origin: bottom right;
  background: currentColor;
  transition: transform 0.25s ease-out;
}

button:hover:before {
  transform: scaleX(1);
  transform-origin: bottom left;
}

button .clone > *,button .text > * {
  opacity: 1;
  font-size: 1.3rem;
  transition: 0.2s;
  margin-left: 4px;
}

button .clone > * {
  transform: translateY(60px);
}

button:hover .clone > * {
  opacity: 1;
  transform: translateY(0px);
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

button:hover .text > * {
  opacity: 1;
  transform: translateY(-60px);
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

button:hover .clone > :nth-child(1) {
  transition-delay: 0.15s;
}

button:hover .clone > :nth-child(2) {
  transition-delay: 0.2s;
}

button:hover .clone > :nth-child(3) {
  transition-delay: 0.25s;
}

button:hover .clone > :nth-child(4) {
  transition-delay: 0.3s;
}
/* icon style and hover */
button svg {
  width: 20px;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(-50deg);
  transition: 0.2s ease-out;
}

button:hover svg {
  transform: translateY(-50%) rotate(-90deg);
}

</style>