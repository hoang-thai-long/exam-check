import { createStore } from 'vuex'
import config from '@/utils/config';
import axios from 'axios';
import { Lesson, Part, Question, Student, Answer, ExamDetail, Exam } from '@/utils/model';

const students: Student[] = [];
const lesson: Lesson | null = null;
const part: Part[] = [];
const questions: Question[] = [];
const answers: Answer[] = [];
const details : ExamDetail[] = [];
const studento : string[] = [];
const exams : Exam[] = [];
export default createStore({
  state: {
    ClassID: '',
    LessonID: '',
    Students: students,
    Lesson: lesson,
    Part: part,
    PartQuiz: part,
    PartNoQuiz: part,
    Questions: questions,
    Done: true,
    Answers: answers,
    Details:details,
    StudentDo:studento,
    Exams:exams
  },
  getters: {
  },
  mutations: {
    REBOOT(state) {
      state.ClassID = "";
      state.LessonID = "";
      state.Lesson = null;
      state.Part = [];
      state.Questions = [];
      state.Students = [];
      state.Answers = [];
    },
    SET_CHECKLESSON(state,data){
      state.Exams = data.exams;
      state.StudentDo = data.students;
    },
    SET_DETAILS(state,data){
      state.Details = data;
    },
    SET_CLASS_ID(state, classid) {
      state.ClassID = classid
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
    SET_LESSON(state, data) {
      // console.log(data);
      if (data) {
        state.Questions = data.questions;
        state.Answers = data.answers;
        state.Lesson = data.lesson;
        state.Part = data.parts;
        if (data.parts && data.parts.length > 0) {
          const _part: Part[] = Array.from(data.parts);
          // console.log(_part);
          state.PartQuiz = _part.filter((z: Part) => ["QUIZ1", "QUIZ2", "QUIZ3", "QUIZ4", "ESSAY"].indexOf(z.type) > -1);
          state.PartNoQuiz = _part.filter((z: Part) => ["QUIZ1", "QUIZ2", "QUIZ3", "QUIZ4", "ESSAY"].indexOf(z.type) == -1);
        }
        else {
          state.PartQuiz = [];
          state.PartNoQuiz = [];
        }

      }
      else {
        state.Lesson = null;
        state.Part = [];
        state.Questions = [];
        state.Answers = [];
      }
    },
    SET_DONE(state, bl) {
      state.Done = bl;
    },
  },
  actions: {
    async checkLesson({commit}){
      const result = await axios.get(config.URL.BASE + config.URL.CHECK_LESSONS +"?lessonid="+this.state.LessonID+"&classid="+this.state.ClassID);
      if(result.status == 200 && result.data.code == 200){
        commit("SET_CHECKLESSON",result.data.data);
      }
      else{
        commit("SET_CHECKLESSON",{exams:[],students:[]});
      }
    },
    async CheckQuestions({commit},quetionids:string){
      const result = await axios.get(config.URL.BASE + config.URL.CHECK_QUETIONS+quetionids+"&lessonid="+this.state.LessonID+"&classid="+this.state.ClassID);
      if(result.status == 200 && result.data.code == 200){
        commit("SET_DETAILS",result.data.data);
      }
      else{
        commit("SET_DETAILS",[]);
      }
    },
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
        const data = result.data.data;
        commit("SET_LESSON", data)
      }
      else {
        commit("SET_LESSON", null);
      }
    },
  },
  modules: {
  }
})
