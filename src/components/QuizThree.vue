<template>
    <div v-if="part && quetions.length > 0 && answers.length > 0">
        <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
            <div class="col-sm-12 p-0"><b>Câu {{ (index + 1) }} : </b><span v-html="renderMathML(part.title)"></span></div>
            <div class="col-sm-12 p-0" v-html="renderMathML(part.description)"></div>
        </div>
        <div :class="'row m-0 pt-3 pb-3 ' + part.type" style="border-bottom: 0.5px dotted gray">
            <div class="part-box QUIZ3">
                <div class="row w-100 m-auto">
                    <div class="quiz-wrapper">
                        <div class="quiz-item" v-for="(quiz, iq) in quetions" :id="quiz.id" :data-part-id="part.id"
                            :key="quiz.id + iq">
                            <div class="quiz-pane">
                                <div class="pane-item row">
                                    <div class="col-6">
                                        <template v-if="quiz.media">
                                            <div class="quiz-media" v-html="renderMediaContent(quiz, null)">
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="quiz-text">
                                                {{ quiz.content.replace(/mml:/g, "") }}
                                            </div>
                                        </template>
                                    </div>
                                    <div class="col-6">
                                        <template v-if="answers.find(o => o.parentID == quiz.id)">
                                            <fieldset class="answer-item"
                                                :id="answers.find(o => o.parentID == quiz.id)?.id">
                                                <input type="hidden"
                                                    :value="answers.find(o => o.parentID == quiz.id)?.content.replace(/mml:/g, '')">
                                                <div v-if="answers.find(o => o.parentID == quiz.id) && answers.find(o => o.parentID == quiz.id)?.media"
                                                    v-html="renderMediaContent(answers.find(o => o.parentID == quiz.id), null)">
                                                </div>
                                                <label v-else class="answer-text"
                                                    v-html="breakLine(answers.find(o => o.parentID == quiz.id)?.content ?? '')"></label>
                                            </fieldset>
                                        </template>
                                    </div>
                                    <div class="col-12">
                                        <div v-html="quiz.description"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { renderMathML, breakLine, renderMediaContent } from '@/utils/utils'
import { Answer, Part, Question } from '@/utils/model';

defineProps<{
    part: Part,
    quetions: Question[],
    index: number,
    answers: Answer[]
}>();


</script>