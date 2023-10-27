
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
                <div class="badge-sponsorization w-100 justify-content-center" v-if="singleTeacher.sponsored_until">
                  <i class="icon ion-md-flame"></i>
                  <span class="fw-bold">In Evidenza</span>
                </div>
                <p class="mt-3 card-text">
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
              <button class="btn btn-outline-light mx-2" @click="openModal('message')">Invia Messaggio</button>
              <button class="btn btn-outline-light mx-2" @click="openModal('review')">Aggiungi Recensione</button>
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

@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');

*{
    font-family: 'Titillium Web';
}
.button-sponsorization {
  position: relative;
  background-color: rgb(243, 22, 22);
  border-radius: 5px;
  box-shadow: rgb(131, 1, 1) 0px 4px 0px 0px;
  padding: 12px;
  background-repeat: no-repeat;
  box-sizing: border-box;
  width: 145px;
  height: 40px;
  color: #fff;
  border: none;
  font-size: 15px;
  transition: all .3s ease-in-out;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

</style>