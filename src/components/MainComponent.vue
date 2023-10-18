<script>
import axios from 'axios';

export default {
    name: 'MainComponent',
    data() {
        teacherArray: []
    },
    computed: {

    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            axios.get('http://localhost:8000/api/teachers')
                .then(res => {
                    this.teacherArray = res.data.results
                    console.log(this.teacherArray)
                })
        }
    }
}
</script>

<template>
    <div>
        
    </div>
</template>

<style scoped lang="scss">
    
</style>