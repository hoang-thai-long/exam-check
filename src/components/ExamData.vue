<template>
    <div>
        <lesson-body></lesson-body>
    </div>
</template>
<script lang="ts" setup>
import store from '@/store';
import LessonBody from './LessonBody.vue';

const props = defineProps({
    lessonId: String,
    classId: String
})
store.commit("REBOOT");

store.commit("SET_CLASS_ID", props.classId);
store.commit("SET_LESSON_ID", props.lessonId);

store.dispatch("loadStudents", props.classId);
let done = 0;
store.dispatch("loadLesson", props.lessonId).then((res) => {
    const data = store.state.Part;
    if (data != null && data.length > 0) {
        done = data.length;
        store.commit("SET_DONE",false);
        for (let i = 0; i < data.length; i++) {
            const part = data[i];
            store.dispatch("loađQuestions", part.id).then(()=>{
                done--;
                if(done == 0) store.commit("SET_DONE",true);
            });
        }
    }
});


</script>