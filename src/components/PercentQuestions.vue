<template>
    <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" :style="'width:' + getPercent(true) + '%'"
            :aria-valuenow="studentPass" aria-valuemin="0" :aria-valuemax="siso">{{ studentPass }}</div>
        <div class="progress-bar bg-danger" role="progressbar" :style="'width:' + getPercent(false) + '%'"
            :aria-valuenow="studentFail" aria-valuemin="0" :aria-valuemax="siso">{{ studentFail }}</div>
    </div>
</template>
<script lang="ts" setup>
import store from '@/store';
import { Question, Part, isQuestion } from '@/utils/model';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    part: Part,
    question?: Question | Question[]
}>();

const details = computed(() => store.state.Details);
const siso = computed(() => store.state.Students.length);

const studentDo = ref<number>(0);
const studentPass = ref<number>(0);
const studentFail = ref<number>(0);

watch(details, (n, o) => {
    if (n != o) {
        let ids: string[] = [];
        if (props.question) {
            if (isQuestion(props.question)) ids = props.question.id.split(',');
            else if (props.question instanceof Array) ids = props.question.map(o => o.id);
            
            const choise = details.value.filter(o => ids.includes(o.questionID));
            if(ids.includes('658ee931c27d912e2c5601a4')){
                console.log(choise.length)
            }
            if (choise && choise.length > 0) {
                const choisePass = choise.filter(o => o.point > 0);
                const choiseFail = choise.filter(o => o.point == 0);
                studentDo.value = Array.from(new Set(choise.map(o => o.studentID))).length;
                if (choisePass && choisePass.length > 0) {
                    studentPass.value = Array.from(new Set(choisePass.map(o => o.studentID))).length;
                }
                if (choiseFail && choiseFail.length > 0) {
                    studentFail.value = Array.from(new Set(choiseFail.map(o => o.studentID))).length;
                }

            }
        }
    }
})

const getPercent = (isPass: boolean) => {
    const data = isPass ? studentPass.value * 100 / siso.value : studentFail.value * 100 / siso.value;
    return Math.round(data);
}

</script>