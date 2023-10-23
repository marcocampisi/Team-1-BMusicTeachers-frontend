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
        value:'',
        teacher_id:null,
    },
})