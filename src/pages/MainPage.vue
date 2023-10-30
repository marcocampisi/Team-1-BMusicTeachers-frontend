<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import { store } from '../js/store';

export default {
    name: 'MainPage',
    data() {
        return {
            teacherArray: [],
            store,
            loading: false,
            subjectsArray: [],
        };
    },
    computed: {},
    mounted() {
        this.getData();
        this.getSubjects();
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
        truncatedBio(teacher) {
            if (teacher.bio.length > 100) {
                return teacher.bio.substring(0, 100) + '...';
            } else {
                return teacher.bio;
            }
        }
    },
    components: {
        HeaderComponent
    },
}
</script>

<template>
    <HeaderComponent />
    <main class="mt-3">
        <h1 class="text-center text-light fw-bold">Musicisti in Rete</h1>
        <div class="search px-4">
            <form @submit.prevent="filterTeachers()" class="d-flex me-2" role="search">

                <select class="form-select me-2" aria-label="Default select example"
                    v-model="store.teacherQuery.subjectQuery">
                    <option value="">All</option>
                    <option v-for="subject in subjectsArray" :key="subject.id" :value="subject.name">{{
                        subject.name
                    }}</option>
                </select>

                <input class="form-control me-2" type="search" placeholder="Cerca per nome..." aria-label="Search"
                    v-model="store.teacherQuery.searchQuery">
                <button class="btn btn-light fw-bold" type="submit">Cerca</button>
            </form>
        </div>
        <div v-if="teacherArray && !loading" class="container">
            <div class="row row-gap-3">
                <template v-if="this.teacherArray.length > 0">
                    <div class="col-12 col-md-4 col-lg-3 " v-for="teacher in teacherArray" :key="teacher.id">
                        <div
                            class="card mb-4 h-100 ms-bg-index-card border text-light position-relative text-center overflow-hidden">
                            <div class="card-top text-center">
                                <img class="img-fluid img-card" :src="teacher.full_photo_img" alt="">
                            </div>
                            <div
                                class="card-body d-flex flex-column justify-content-between align-items-center my-card-slug mt-2">
                                <h2>{{ teacher.first_name }} {{ teacher.last_name }}</h2>
                                <p>{{ truncatedBio(teacher) }}</p>
                                <p>+39 {{ teacher.phone }}</p>
                                <div class="badge-sponsorization w-100 justify-content-center" v-if="teacher.sponsored_until">
                                  <i class="icon ion-md-flame"></i>
                                  <span class="fw-bold">In Evidenza</span>
                                </div>
                            </div>
                            <div class="link-wrapper text-center">
                                <router-link class="link btn btn-light fw-bold py-2 my-3 px-4"
                                    :to="{ name: 'singleTeacher', params: { id: teacher.id } }">Maggiori
                                    Dettagli</router-link>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <h5 class="text-center mt-5 text-light fs-2">Nessun Insegnante corrisponde alla ricerca</h5>
                </template>
            </div>
        </div>
        <div v-else class="mt-5">
            <div class="loader">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 100 100">
                        <ellipse transform="rotate(-21.283 49.994 75.642)" cx="50" cy="75.651" rx="19.347" ry="16.432"
                            fill="currentColor"></ellipse>
                        <path fill="currentColor" d="M58.474 7.5h10.258v63.568H58.474z"></path>
                    </svg>
                </span>
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 100 100">
                        <ellipse transform="rotate(-21.283 49.994 75.642)" cx="50" cy="75.651" rx="19.347" ry="16.432"
                            fill="currentColor"></ellipse>
                        <path fill="currentColor" d="M58.474 7.5h10.258v63.568H58.474z"></path>
                    </svg>
                </span>
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 100 100">
                        <ellipse transform="rotate(-21.283 49.994 75.642)" cx="50" cy="75.651" rx="19.347" ry="16.432"
                            fill="currentColor"></ellipse>
                        <path fill="currentColor" d="M58.474 7.5h10.258v63.568H58.474z"></path>
                    </svg>
                </span>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');

* {
    font-family: 'Titillium Web';
}

.search {
    max-width: 800px;
    margin-inline: auto;
    margin-block: 20px;
}

.loading {
    margin-inline: auto;
    margin-top: 20px;
}
</style>