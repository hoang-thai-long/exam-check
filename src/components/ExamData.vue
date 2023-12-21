<template>
    <div>
        {{ props.classId }}
        {{ props.lessonId }}
    </div>
</template>
<script lang="ts" setup>
// import { defineProps } from 'vue';
const props = defineProps({
    lessonId:String,
    classId:String
})
</script>