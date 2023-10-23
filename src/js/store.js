import { reactive } from 'vue'

export const store = reactive({
    teacherQuery: {
        searchQuery: '',
        subjectQuery: ''
    },
    messageQuery:{
        name:'',
        content: '',
        teacher_id:null,
    },
    reviewQueryData:{
        name:'',
        content: '',
        teacher_id:null,
    },
    ratingQuery:{
        rating_id:'',
        teacher_id:null,
    },
    messageModalOpen:false,
    reviewModalOpen:false
})