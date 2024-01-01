<template>
    <div title="click vào đây để xem chi tiết" @click="viewDetails" style="cursor: pointer;">
        <div class="progress">
            <div class="progress-bar" role="progressbar" :style="'width:' + percent() + '%'" :aria-valuenow="studentDo"
                aria-valuemin="0" :aria-valuemax="siso">
                <template v-if="studentDo == 0">Không có học sinh trọn</template>
                <template v-else>{{ studentDo }}/{{ siso }}</template>
            </div>
        </div>
        <hr style="margin: 0;" />
    </div>
</template>
<script lang="ts" setup>
import store from '@/store';
import { Answer, Part, Question } from '@/utils/model';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    part: Part,
    question: Question,
    answer: Answer | undefined
}>();

const id = ref<string>(props.answer ? props.answer.id : '');

const details = computed(() => store.state.Details);
const siso = computed(() => store.state.Students.length);


const studentDo = ref<number>(0);

watch(details, (o, n) => {
    if (o != n) {
        studentDo.value = Array.from(new Set(details.value.filter(o => o.answerID && (o.answerID == id.value ||
            o.answerID.split(',').includes(id.value))).map(o => o.studentID))).length
    }
});


const percent = function () {
    console.log(studentDo);
    const data = studentDo.value * 100 / siso.value;
    return Math.round(data);
}

const viewDetails = () => {
    console.log("chi tiết");
}

</script>

<style lang="scss">
.percent-ans {
    padding-left: 10px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px #ccc;
        font-weight: 600;
    }
}
</style>