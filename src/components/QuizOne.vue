
<template>
    <div>
        <template v-if="questions.length > 1">
            <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                <div class="col-sm-12 p-0"><b>Câu {{ index + 1 }}: </b><span v-html="renderMathML(part.title)"></span>
                </div>
                <div class="col-sm-12 p-0" v-html="renderMathML(part.description)"></div>
            </div>
        </template>
        <div v-for="(quiz, i) in questions" :key="quiz.id">
            <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">

                <percent-questions :part="part" :question="quiz"></percent-questions>
                <!-- <span v-html="questionDo(quiz.id, part.type)"></span> -->
                <template v-if="questions.length == 1">
                    
                    <div class="col-sm-12 p-0">
                        <b>Câu {{ (index + 1) }}: </b>
                        <span v-html="renderMathML(quiz.content)"></span>
                    </div>
                </template>
                <template v-else>
                    <div class="col-sm-12 p-0">
                        <b>{{ (i + 1) }}: </b>
                        <span v-html="renderMathML(quiz.content)"></span>

                    </div>
                </template>
                <div class="col-sm-12 p-0">{{ renderMathML(part.description) }}
                    <template v-if="quiz.media != null && quiz.media.path != null">
                        <img :src="quiz.media.path" />
                    </template>
                </div>
                <div class="form-group pl-3 m-0">
                    <div v-for="(ans, i) in answers.filter(o => o.parentID == quiz.id)" :key="ans.id + i"
                        :class="ans.isCorrect ? 'form-check col-sm-12 text-success box-answer' : 'form-check col-sm-12 box-answer'"
                        :id="'ans-' + ans.id">
                        <percent-answer class="box-ans__info" :part="part" :question="quiz" :answer="ans"></percent-answer>
                        <div class="box-answer__info">
                            <template v-if="ans.isCorrect">
                                <input class="form-check-input" :id="ans.id"
                                    :type="part.type == 'QUIZ1' ? 'radio' : 'checkbox'" checked disabled>
                            </template>
                            <template v-else>
                                <input class="form-check-input" :id="ans.id"
                                    :type="part.type == 'QUIZ1' ? 'radio' : 'checkbox'" disabled>
                            </template>
                            <label class="form-check-label">
                                <span style="font-weight:bold" v-html="renderContentAns(ans.content, i)"></span>
                                <img v-if="ans.media && ans.media.path" :src="ans.media.path" />
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div v-if="quiz.description" class="quiz-extend mt-2 rounded show" style="color: #6495ed;border: 0.5px solid"
                v-html="quiz.description"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import PercentAnswer from './PercentAnswer.vue'
import PercentQuestions from './PercentQuestions.vue';
import { renderMathML, renderContentAns } from '@/utils/utils';
import { Part, Question, Answer } from '@/utils/model';
defineProps<{
    part: Part,
    questions: Question[],
    index: number,
    answers: Answer[],
}>();

</script>
<style lang="scss">
.box-answer{
    border:1px solid;
    border-radius: 10px;
    padding: 0;
    input{
        display: none;
    }
    &__info{
        padding-left: 10px;
    }
}
</style>