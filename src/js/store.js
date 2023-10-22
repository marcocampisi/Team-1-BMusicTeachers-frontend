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
    }
})