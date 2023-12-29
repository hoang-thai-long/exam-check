export default {
    REGEX:{
        BREAK_LINE:/[$][\S][^$]*$/g
    },
    URL:{
        STATIC :"https://static.eduso.vn",
        BASE:"https://localhost:56456/api/",
        GET_STUDENTS:"Exam/GetStudents?classid=",
        GET_LESSON:'Exam/GetLesson?lessonid=',
        GET_QUESTION:'Exam/GetQuestion?partid=',
        GET_ANSWER:'Exam/GetAnswer?questionid=',
        CHECK_QUETIONS:'Exam/CheckQuestions?',
        CHECK_LESSONS:'Exam/CheckLesson'
    }
}