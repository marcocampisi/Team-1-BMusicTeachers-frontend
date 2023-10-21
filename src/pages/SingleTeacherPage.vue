
<script>
import axios from 'axios';
import HeaderSingleComponent from '../components/HeaderSingleComponent.vue';
export default {
  data(){
    return{
      singleTeacher:null,
      loading:false
    }
  },
  components:{
    HeaderSingleComponent
  },
  created() {
    this.getSingleTeacher();
  },
  methods: {
        getSingleTeacher() {
            this.singleTeacher = null
            this.loading = true

            axios.get('http://127.0.0.1:8000/api/teachers/'+ this.$route.params.id)
                .then(res => {
                  this.singleTeacher = res.data.results;
                  console.log(res.data.results);
                  this.loading = false;
            });
        },
       
  },
}
</script>

<template>
  <HeaderSingleComponent/>
    <main v-if="singleTeacher && !loading" class="text-light">
      <div class="card" style="width: 18rem;">
        <img :src="singleTeacher.full_photo_img" class="card-img-top" :alt="singleTeacher.first_name">
        <div class="card-body">
          <h5 class="card-title">{{ singleTeacher.first_name }}</h5>
          <p class="card-text">{{ singleTeacher.bio }}</p>
          <p>+39 {{ singleTeacher.phone }}</p>
          <h5 class="text-danger" v-if="singleTeacher.sponsorization.length > 0">Sponsorizzato</h5>
        </div>
      </div>
    </main>
</template>

<style scoped>
</style>