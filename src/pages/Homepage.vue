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
            <h6 class="text-success h6">Migliaia di insegnanti a portata di click</h6>
        </div>
        <form action="" class="input-search" @submit.prevent="filterTeachers()" role="search">
            <div class="input-box">
                <i class="icon ion-md-search"></i>
                <input type="search" placeholder="Quale strumento vuoi imparare oggi?">
                <button class="button-search">Cerca</button>
            </div>
        </form>
    </main>
</template>

<style scoped lang="scss">
.search{
    max-width: 800px;
    margin-inline: auto;
    margin-block: 20px;
}

.loading{
    margin-inline: auto;
    margin-top: 20px;
}

</style>