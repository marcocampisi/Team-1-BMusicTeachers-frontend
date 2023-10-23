<script>
import { store } from '../js/store';
import axios from 'axios';
export default {
  data(){
    return{
      textSendReview:'',
      errorSendReview:'',
      ratingArray: [],
      store
    }    
  },
  props:{
    teacherId:{
      type:Number,
      default:0
    }
  },
  created() {
    this.getRating();
  },
  methods:{
    getRating(){
        axios.get('http://localhost:8000/api/ratings')
            .then(res => {
                this.ratingArray = res.data.results;
            });
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
     
    sendReview(){
      this.store.reviewQueryData.teacher_id = this.teacherId;

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
        this.store.ratingQuery.teacher_id = this.teacherId;
        axios.post(`http://127.0.0.1:8000/api/ratings/create`, {
                data: this.store.ratingQuery,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
              this.store.ratingQuery.teacher_id = null;
              this.store.ratingQuery.rating_id = null;
            });
      }
    },

    openModal(modal){
      if(modal == 'message'){
        this.store.messageModalOpen = !this.store.messageModalOpen;
      }else{
        this.store.reviewModalOpen = !this.store.reviewModalOpen;
        
      }
    }
  }
}
</script>

<template>
     <div class="reviews-modal">
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

<style scoped lang="scss">
.reviews-modal{
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