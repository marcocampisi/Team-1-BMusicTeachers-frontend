<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import { store } from '../js/store'

export default {
    name: 'MainComponent',
    props: {
        filtersTeachers: Function
    },
    data() {
        return {
            teacherArray: [],
            filteredTeacherArray: [],
            store
        };
    },
    computed: {},
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.teacherArray = []

            axios.get('http://localhost:8000/api/teachers')
                .then(res => {
                this.teacherArray = res.data.results;
                console.log(this.teacherArray);
            });
        },
        filterTeachers(searchQuery) {
            this.filteredTeacherArray = this.teacherArray.filter(teacher => {
                const fullName = teacher.first_name + ' ' + teacher.last_name;
                return fullName.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }
    },
    components: { HeaderComponent }
}
</script>

<template>
    <HeaderComponent :filterTeachers="filterTeachers" />
    <main class="mt-3">
        <div class="container">
            <div class="row row-gap-2">
                <template v-if="store.searchQuery === ''">
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
                                <router-link class="link btn btn-success my-3 px-4" :to="{name: 'singleTeacher', params:{id: teacher.id}}">vedi</router-link>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="col-12 col-md-4 col-lg-3 mb-3" v-for="teacher in filteredTeacherArray" :key="teacher.id">
                        <div class="card h-100">
                            <div class="card-top">
                                <img :src="teacher.full_photo_img" alt="">
                            </div>
                            <div class="card-body">
                                <h2>{{ teacher.first_name }} {{ teacher.last_name }}</h2>
                                <p>{{ teacher.bio }}</p>
                                <p>+39 {{ teacher.phone }}</p>
                                <h5 class="text-danger" v-if="teacher.sponsored_until">Sponsorizzato</h5>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
    
</style>