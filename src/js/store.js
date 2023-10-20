import { reactive } from 'vue'

export const store = reactive({
    teacherQuery: {
        searchQuery: '',
        subjectQuery: ''
    }
})