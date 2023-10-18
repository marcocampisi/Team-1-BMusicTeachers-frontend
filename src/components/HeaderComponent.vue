<script>
export default {
    name: 'HeaderComponent',
    props: {
        filterTeachers: Function
    },
    data(){
        return {
            searchQuery: ''
        }
    },
    methods: {
        filterTeachers() {
            this.filterTeachers(this.searchQuery)
        }
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" v-model="searchQuery" @input="filterTeachers" placeholder="Cerca per nome..." aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Cerca</button>
                    </form>
                </div>
            </div>
        </nav>
</header></template>

<style scoped lang="scss"></style>