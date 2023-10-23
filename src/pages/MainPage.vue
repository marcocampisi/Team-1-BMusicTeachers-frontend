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
            loading:false
        };
    },
    computed: {},
    mounted() {
        this.getData();
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
        }
    },
    components: {
        HeaderComponent
    },
}
</script>

<template>
    <HeaderComponent :filterTeachers="filterTeachers"/>
    <main class="mt-3">
        <div v-if="teacherArray && !loading" class="container">
            <div class="row row-gap-2">
                <template v-if="this.teacherArray.length > 0">
                    <div class="col-12 col-md-4 col-lg-3 " v-for="teacher in teacherArray" :key="teacher.id">
                        <div class="card h-100">
                            <div class="card-top text-center">
                                <img class="img-fluid img-card" :src="teacher.full_photo_img" alt="">
                            </div>
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h2>{{ teacher.first_name }} {{ teacher.last_name }}</h2>
                                <p>{{ teacher.bio }}</p>
                                <p>+39 {{ teacher.phone }}</p>
                                <h5 class="text-danger" v-if="teacher.sponsored_until">Sponsorizzato</h5>
                            </div>
                            <div class="link-wrapper text-center">
                                <router-link class="link btn btn-success my-3 px-4"
                                    :to="{ name: 'singleTeacher', params: { id: teacher.id } }">vedi</router-link>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                   <h5 class="text-center mt-5 text-light fs-2">Teacher not found</h5>
                </template>
            </div>
        </div>
        <div v-else class="mt-5">
            <div class="loader">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 100 100">
                        <ellipse transform="rotate(-21.283 49.994 75.642)" cx="50" cy="75.651" rx="19.347" ry="16.432" fill="currentColor"></ellipse>
                        <path fill="currentColor" d="M58.474 7.5h10.258v63.568H58.474z"></path>
                    </svg>
                </span>
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 100 100">
                        <ellipse transform="rotate(-21.283 49.994 75.642)" cx="50" cy="75.651" rx="19.347" ry="16.432" fill="currentColor"></ellipse>
                        <path fill="currentColor" d="M58.474 7.5h10.258v63.568H58.474z"></path>
                    </svg>
                </span>
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 100 100">
                        <ellipse transform="rotate(-21.283 49.994 75.642)" cx="50" cy="75.651" rx="19.347" ry="16.432" fill="currentColor"></ellipse>
                        <path fill="currentColor" d="M58.474 7.5h10.258v63.568H58.474z"></path>
                    </svg>
                </span>
            </div>
      </div>
    </main>
</template>

<style scoped lang="scss"></style>