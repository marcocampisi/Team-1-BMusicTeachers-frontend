<script>
import { store } from '../js/store';
import axios from 'axios';
export default {
  data(){
    return{
      textSendMessage:'',
      errorSendMessage:'',
      store
    }    
  },
  props:{
    teacherId:{
      type:Number,
      default:0
    }
  },
  methods:{
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
    sendMessage(){
        this.store.messageQuery.teacher_id = this.teacherId;

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
    <div class="message-modal " >
      <div class="form-wrapper text-light mt-4 position-relative border rounded"> 
        <button class="close-button btn btn-danger" @click="openModal('message')">x</button>
        <h1 class="text-success fs-3" v-if="textSendMessage != '' && !errorSendMessage  ">{{ textSendMessage }}</h1>
        <h1 class="text-danger fs-3" v-else>{{ errorSendMessage }}</h1>
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
</template>

<style scoped lang="scss">
.message-modal{
    position: absolute;
    inset: 0;
    background: transparent;
    backdrop-filter:blur(15px);
    display: flex;
    align-items: center;
    justify-content: center;

    .form-wrapper{
      padding: 80px;
    }
    .close-button{
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>