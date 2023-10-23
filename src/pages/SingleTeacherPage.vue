
<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import MessageModalComponent from '../components/MessageModalComponent.vue';
import ReviewModalComponent from '../components/ReviewModalComponent.vue';
import { store } from '../js/store';
export default {
  data(){
    return{
      store,
      singleTeacher:null,
      loading:false,
     
    }
  },
  components:{
    HeaderComponent,
    MessageModalComponent,
    ReviewModalComponent
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
                this.loading = false;
          });
      },
      openModal(modal){
        if(modal == 'message'){
          this.store.messageModalOpen = !this.store.messageModalOpen;
        }else{
          this.store.reviewModalOpen = !this.store.reviewModalOpen;
          
        }
      }
  },
}
</script>

<template>
  <HeaderComponent/>
    <main class="text-light">
      <div class="container">
        <div class="card mb-3 ms-bg-index-card text-white" v-if="singleTeacher && !loading">
          <div class="row g-0">
            <div class="col-md-4 ">
              <img :src="singleTeacher.full_photo_img" class="card-img-top" :alt="singleTeacher.first_name">
            </div>
            <!--end col card header-->
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">{{ singleTeacher.first_name }} {{ singleTeacher.last_name }}</h2>
                <h5 class="text-danger" v-if="singleTeacher.sponsored_until">Sponsorizzato</h5>
                <p class="card-text">
                  <span class="fw-bold">Descrizione :</span> 
                  {{ singleTeacher.bio }}
                </p>
                <p>
                  <span class="fw-bold">Contatti :</span> 
                  +39 {{ singleTeacher.phone }}
                </p>
                <h3>Cosa insegno?</h3>
                <ul class="list-unstyled">
                  <li v-for="subject in singleTeacher.subjects">
                    {{ subject.name }}
                  </li>
                </ul>
              </div>
              <button @click="openModal('message')">+ messaggi</button>
              <button @click="openModal('review')">+ recezione</button>
            </div>
            <!--end col card body-->
          </div>
           <!--end row-->
        </div>
        <!--end card-->
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
        <!--end loader-->
      </div>
      <!--end container-->
      <MessageModalComponent v-if="store.messageModalOpen" :teacherId="singleTeacher.id" />
      <ReviewModalComponent  v-if="store.reviewModalOpen" :teacherId="singleTeacher.id"/>
    </main>
</template>

<style lang="scss" scoped>
</style>