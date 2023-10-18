<script>
import { store } from '../js/store'
export default {
    name: 'HeaderComponent',
    props: {
        filterTeachers: Function
    },
    data(){
        return {
            store
        }
    },
    methods: {
        filterTeachers() {
            this.filterTeachers(this.store.searchQuery)
        }
    }
}
</script>

<template>
    <header>

        <nav class="navbar navbar-dark navbar-expand-lg bg-transparent">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">BMusicTeachers</a>
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
                        <input class="form-control me-2" type="search" v-model="store.searchQuery" @input="filterTeachers" placeholder="Cerca per nome..." aria-label="Search">
                        <button class="btn btn-light" type="submit">Cerca</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss"></style>