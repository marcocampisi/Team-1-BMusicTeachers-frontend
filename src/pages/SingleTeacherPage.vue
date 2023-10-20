
<script>
import axios from 'axios';
import HeaderSingleComponent from '../components/HeaderSingleComponent.vue';
export default {
  components:{
    HeaderSingleComponent
  },
  created() {
    this.getSingleTeacher();
  },
  methods: {
        getSingleTeacher() {
            this.teacherArray = []

            axios.get('http://127.0.0.1:8000/api/teachers/'+ this.$route.params.id)
                .then(res => {
                // this.teacherArray = res.data.results;
                console.log(res.data.results);
            });
        },
       
  },
}
</script>

<template>
  <HeaderSingleComponent/>
  
</template>

<style lang="">
  
</style>