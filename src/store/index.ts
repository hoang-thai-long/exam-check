import { createStore } from 'vuex'
import config from '@/utils/config';
import axios from 'axios';
import { Lesson, Part, Question, Student } from '@/utils/model';

const students: Student[] = [];
const lesson: Lesson | null = null;
const part:Part[] = [];
const questions : Question[] = [];
export default createStore({
  state: {
    ClassID: '',
    LessonID: '',
    Students: students,
    Lesson: lesson,
    Part: part,
    PartQuiz:part,
    PartNoQuiz:part,
    Questions:questions,
    Done:false
  },
  getters: {
  },
  mutations: {
    REBOOT(state){
      state.ClassID = "";
      state.LessonID = "";
      state.Lesson = null;
      state.Part = [];
      state.Questions = [];
      state.Students = [];
    },
    SET_CLASS_ID(state, classid) {
      state.ClassID == classid
    },
    SET_LESSON_ID(state, lessonid) {
      state.LessonID = lessonid
    },
    SET_STUDENT(state, listStudents) {
      state.Students = listStudents;
    },
    CLEAR_STUDENT(state) {
      state.Students = students;
    },
    SET_PART(state,part){
      state.Part = part;
      if(part && part.length > 0){
        state.PartQuiz = part.filter((z:Part)=>["QUIZ1","QUIZ2","QUIZ3","QUIZ4","ESSAY"].indexOf(z.type) > -1);
        state.PartNoQuiz = part.filter((z:Part)=>["QUIZ1","QUIZ2","QUIZ3","QUIZ4","ESSAY"].indexOf(z.type) == -1);
      }
      else{
        state.PartQuiz = [];
        state.PartNoQuiz = [];
      }
    },
    SET_LESSON(state,lesson){
      state.Lesson = lesson;
    },
    SET_QUESTIONS(state,questions){
      state.Questions = state.Questions.concat(questions);
    },
    SET_DONE(state,bl){
      state.Done = bl;
    }
  },
  actions: {
    async loadStudents({ commit }, classid: string) {
      const result = await axios.get(config.URL.BASE + config.URL.GET_STUDENTS + classid);
      if (result.status == 200 && result.data.code == 200) {
        commit("SET_STUDENT", result.data.data);
      }
      else {
        commit("CLEAR_STUDENT");
      }
    },
    async loadLesson({ commit }, lessonId: string) {
      const result = await axios.get(config.URL.BASE + config.URL.GET_LESSON + lessonId);
      if (result.status == 200 && result.data.code == 200) {
        commit("SET_LESSON", result.data.data.lesson)
        commit("SET_PART", result.data.data.parts)
      }
      else {
        commit("SET_LESSON", null);
        commit("SET_PART", null);
      }
    },
    async loađQuestions({commit},partId:string){
      const result = await axios.get(config.URL.BASE+config.URL.GET_QUESTION+partId);
      if(result && result.status == 200 && result.data.code == 200){
        commit("SET_QUESTIONS",result.data.data);
      }
      else{
        commit("SET_QUESTIONS",[]);
      }
    },
    async loadAnswers({commit},questions_id:string){
      const result = await axios.get(config.URL.BASE+config.URL.GET_ANSWER+questions_id);
      return result && result.data.code == 200 ? result.data.data : null;
    }
  },
  modules: {
  }
})
