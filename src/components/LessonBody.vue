<template>
    <div class="container">
        <div class="header-exam-cb">
            <div class="title-hdecb" v-if="lesson != null">
                <h3 class="name-lesson">{{ lesson.title }}</h3>
                <div class="time-lesson" v-if="lesson.timer > 0"> Thời gian : {{ lesson.timer }} phút</div>
                <div class="student-done">(Học sinh tham gia : {{ studento.length }}/{{ students.length }})</div>
            </div>
        </div>
        <hr />
        <div class="w-100" style="width: 700px;margin: auto;border-collapse: collapse"
            v-if="partsQuiz && partsQuiz.length > 0">
            <div v-for="(part, indexP) in partsQuiz" :id="part.id" :key="part.id">
                <template v-if="part.type == 'QUIZ1' || part.type == 'QUIZ4'">
                    <quiz-one :part="part"
                        :questions="questions.filter(o => o.parentID == part.id).sort((a, b) => a.order - b.order)"
                        :index="indexP" :answers="answers"></quiz-one>
                </template>
                <template v-else-if="part.type == 'QUIZ2'">
                    <quiz-two :anwsers="answers" :index="indexP" :part="part"
                        :questions="questions.filter(o => o.parentID == part.id)"></quiz-two>
                </template>
                <template v-else-if="part.type == 'ESSAY'">
                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                        <div class="col-sm-12 p-0"><b>Câu {{ (indexP + 1) }}: </b><span
                                v-html="renderMathML(part.title)"></span></div>
                        <div class="col-sm-12 p-0" v-html="renderMathML(part.description)"></div>
                    </div>
                </template>
                <template v-if="part.type == 'QUIZ3'">
                    <quiz-three :part="part" :index="indexP" :quetions="questions.filter(o => o.parentID == part.id)"
                        :answers="answers"></quiz-three>
                </template>
            </div>
        </div>
        <div id="breadPage" class="m-0 text-center w-100" style="font-size:16px;font-weight:bold">---Hết---</div>
    </div>
</template>
<script lang="ts" setup>
import QuizThree from './QuizThree.vue';
import QuizOne from './QuizOne.vue';
import QuizTwo from './QuizTwo.vue';
import { computed, watch } from 'vue';
import store from '@/store';
import { Lesson } from '@/utils/model';
import {renderMathML} from '@/utils/utils'


const questions = computed(() => store.state.Questions);
const answers = computed(() => store.state.Answers);
const partsQuiz = computed(() => store.state.PartQuiz);
const lesson = computed<Lesson | null>(() => store.state.Lesson);
const studento = computed<string[]>(() => store.state.StudentDo);
const students = computed(() => store.state.Students);
// const exams = computed(() => store.state.Exams);
// const details = computed(() => store.state.Details);

watch(questions, (n, o) => {
    if (n != o && n.length > 0) {
        store.dispatch("CheckQuestions", n.map(o => "quetionids=" + o.id).join("&"));
    }
})



</script>