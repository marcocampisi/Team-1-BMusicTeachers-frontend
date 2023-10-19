<script>
import { store } from '../js/store';
import axios from 'axios';
export default {
    name: 'HeaderComponent',
    props: {
        filterTeachers: Function
    },
    data(){
        return {
            store,
            subjectsArray: [],
        }
    },
    created() {
        this.getSubjects();
    },
    methods: {
        filterTeachers() {
            this.filterTeachers(this.store.searchQuery)
        },
        getSubjects(){
            axios.get('http://localhost:8000/api/subjects')
                .then(res => {
                this.subjectsArray = res.data.results;
                console.log(this.subjectsArray);
            });
        }
    }
}
</script>

<template>
    <header>

        <nav class="navbar navbar-dark navbar-expand-lg bg-transparent">
      <div class="container">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo.png" alt="Musicisti in rete Logo" width="50" height="50">
            </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Messaggi</a>
                        </li>
                    </ul>

                    <form class="d-flex me-2" role="search">
                        
                        <select class="form-select me-2" aria-label="Default select example">
                            <option v-for="subject in subjectsArray" :key="subject.id" :value="subject.name">{{ subject.name }}</option>
                        </select>
                        
                        <input class="form-control me-2" type="search" v-model="store.searchQuery" @input="filterTeachers" placeholder="Cerca per nome..." aria-label="Search">
                        <button class="btn btn-light" type="submit">Cerca</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss"></style>