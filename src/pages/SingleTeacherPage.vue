
<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import { store } from '../js/store';
export default {
  data(){
    return{
      store,
      singleTeacher:null,
      ratingArray: [],
      loading:false,
      textSendMessage:'',
      errorSendMessage:'',
      textSendReview:'',
      errorSendReview:'',
      messageModalOpen:false,
      reviewModalOpen:false
    }
  },
  components:{
    HeaderComponent
  },
  created() {
    this.getSingleTeacher();
    this.getRating();
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
      getRating(){
            axios.get('http://localhost:8000/api/ratings')
                .then(res => {
                    this.ratingArray = res.data.results;
                });
      },
      addMessageFeedback(res) {
        if(res){
          this.textSendMessage = res.data.message;
          setTimeout(() => {
            this.textSendMessage = '';
          }, 2000);
        }else{
          this.errorSendMessage = "Riempi tutti i campi";
          setTimeout(() => {
            this.errorSendMessage = '';
          }, 2000);
        }
      },
      addReviewFeedback(res) {
        if(res){
          this.textSendReview = res.data.message;
          setTimeout(() => {
            this.textSendReview = '';
          }, 2000);
        }else{
          this.errorSendReview = "Riempi tutti i campi";
          setTimeout(() => {
            this.errorSendReview = '';
          }, 2000);
        }
      },
      sendMessage(){
        this.store.messageQuery.teacher_id = this.singleTeacher.id;

        if(this.store.messageQuery.content != ''){
          axios.post(`http://127.0.0.1:8000/api/message/create`, {
                data: this.store.messageQuery,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                this.store.messageQuery.teacher_id = null
                this.store.messageQuery.name = ''
                this.store.messageQuery.content = ''
                this.addMessageFeedback(res)
                setTimeout(() => {
                this.openModal('message');
              }, 1000);
            });
          }
        else{
          this.addMessageFeedback()
        }
      },
      sendReview(){
        this.store.reviewQueryData.teacher_id = this.singleTeacher.id;

        if(this.store.reviewQueryData.content != '' && this.store.reviewQueryData.name != ''){
          axios.post(`http://127.0.0.1:8000/api/reviews/create`, {
                data: this.store.reviewQueryData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                this.store.reviewQueryData.teacher_id = null
                this.store.reviewQueryData.name = ''
                this.store.reviewQueryData.content = ''
                this.addReviewFeedback(res)
                setTimeout(() => {
                this.openModal('ratings');
              }, 1000);
            });
          }
        else{
          this.addReviewFeedback()
        }

        if(this.store.ratingQuery != ''){
          this.store.ratingQuery.teacher_id = this.singleTeacher.id;
          axios.post(`http://127.0.0.1:8000/api/ratings/create`, {
                  data: this.store.ratingQuery,
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              })
              .then(res => {
                this.store.ratingQuery.teacher_id = null;
                this.store.ratingQuery.rating_id = null;
                setTimeout(() => {
                  this.openModal('ratings');
                }, 1000);
              });
        }
      },
      openModal(modal){
        if(modal == 'message'){
          this.messageModalOpen = !this.messageModalOpen;
        }else{
          this.reviewModalOpen = !this.reviewModalOpen;
          
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
        <diV v-else class="mt-5">
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
    </main>

      <div class="message-modal"  v-if="messageModalOpen">
        <div class="form-wrapper text-light mt-4 position-relative"> 
          <button class="close-button" @click="openModal('message')">x</button>
          <h1 class="text-success" v-if="textSendMessage != '' && !errorSendMessage  ">{{ textSendMessage }}</h1>
          <h1 class="text-danger" v-else>{{ errorSendMessage }}</h1>
          <h2>Contatta il nostro Insegnante</h2>
          <form @submit.prevent="sendMessage()">
            <div class="mb-3">
              <label for="name" name="name" class="form-label" >Digita il tuo nome</label>
              <input type="text" class="form-control" id="name" v-model="store.messageQuery.name">
            </div>
            <div class="mb-3">
              <label for="content" name="content" class="form-label">Inserisci il tuo messaggio</label>
              <textarea class="form-control" id="content" rows="3"  required v-model="store.messageQuery.content"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Invia</button>
          </form>
        </div>
      </div>

      <div class="reviews-modal" v-if="reviewModalOpen">
        <div class="form-wrapper text-light mt-4 position-relative"> 
          <button class="close-button" @click="openModal('review')">x</button>
          <h1 class="text-success" v-if="textSendReview != '' && !errorSendReview  ">{{ textSendReview }}</h1>
          <h1 class="text-danger" v-else>{{ errorSendReview }}</h1>
          <h2>Lascia una recensione</h2>
          <form @submit.prevent="sendReview()">
            <div class="mb-3">
              <label for="name" name="name" class="form-label" >Digita il tuo nome</label>
              <input type="text" class="form-control" id="name" v-model="store.reviewQueryData.name">
            </div>
            
            <p class="mb-1">Valuta l'insegnante</p>
            <select class="form-select me-2" aria-label="Default select example" v-model="store.ratingQuery.rating_id">
                <option v-for="rating in ratingArray" :key="rating.id" :value="rating.id">{{
                    rating.value
                }}</option>
            </select>

            <div class="my-3">
              <label for="content" name="content" class="form-label">Inserisci il testo della recensione</label>
              <textarea class="form-control" id="content" rows="3"  required v-model="store.reviewQueryData.content"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Invia</button>
          </form>
        </div>
      </div>


</template>

<style lang="scss" scoped>
  .message-modal,
  .reviews-modal {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;

    .form-wrapper{
      padding: 80px;
    }
    .close-button{
      position: absolute;
      top: 0px;
     right: 0px;
    }
  }
</style>