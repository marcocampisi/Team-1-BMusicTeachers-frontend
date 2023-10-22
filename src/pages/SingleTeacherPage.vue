
<script>
import axios from 'axios';
import HeaderSingleComponent from '../components/HeaderSingleComponent.vue';
import { store } from '../js/store';
export default {
  data(){
    return{
      store,
      singleTeacher:null,
      loading:false,
      messageSendMessage:'',
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
                this.loading = false;
          });
      },
      addMessageFeedback(res) {
        this.messageSendMessage = res.data.message;
        setTimeout(() => {
          this.messageSendMessage = '';
        }, 2000);
      },
      sendMessage(){
      this.store.messageQuery.teacher_id = this.singleTeacher.id;

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
        });
      }
  },
}
</script>

<template>
  <HeaderSingleComponent/>
    <main  class="text-light">
      <div class="container">
        <div class="card mb-3" v-if="singleTeacher && !loading">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="singleTeacher.full_photo_img" class="card-img-top" :alt="singleTeacher.first_name">
            </div>
            <!--end col card header-->
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">{{ singleTeacher.first_name }} {{ singleTeacher.last_name }}</h2>
                <h5 class="text-danger" v-if="singleTeacher.sponsored_until">Sponsorizzato</h5>
                <p class="card-text">
                  <span class="fw-bold">Descrizione:</span> 
                  {{ singleTeacher.bio }}
                </p>
                <p>
                  <span class="fw-bold">Contatti:</span> 
                  +39 {{ singleTeacher.phone }}
                </p>
                <h3>Cosa insegno?</h3>
                <ul class="list-unstyled">
                  <li v-for="subject in singleTeacher.subjects">
                    {{ subject.name }}
                  </li>
                </ul>
              </div>
            </div>
            <!--end col card body-->
          </div>
           <!--end row-->
        </div>
        <!--end card-->
        <div v-else class="text-center mt-5">
          <div class="spinner-border text-light fs-4" style="width: 4rem; height: 4rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <!--end loader-->
      </div>
      <!--end container-->
    </main>

      <div class="container">
        <div class="form-wrapper text-light mt-4"> 
          <h1 class="text-success" v-if="messageSendMessage != '' ">{{ messageSendMessage }}</h1>
          <h2>Invia un messaggio al nostro teacher</h2>
          <form @submit.prevent="sendMessage()">
            <div class="mb-3">
              <label for="name" name="name" class="form-label" >Digita il tuo nome</label>
              <input type="text" class="form-control" id="name" v-model="store.messageQuery.name">
            </div>
            <div class="mb-3">
              <label for="content" name="content" class="form-label">Inserisci il tuo messaggio</label>
              <textarea class="form-control" id="content" rows="3" v-model="store.messageQuery.content"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>


</template>

<style scoped>
</style>