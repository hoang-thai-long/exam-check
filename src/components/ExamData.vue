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
console.log(props)
store.commit("REBOOT");
store.commit("SET_CLASS_ID", props.classId);
store.commit("SET_LESSON_ID", props.lessonId);
store.dispatch("checkLesson");
store.dispatch("loadStudents", props.classId);
store.dispatch("loadLesson", props.lessonId);


</script>