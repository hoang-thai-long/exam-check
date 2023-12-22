<template>
    <div>
        {{ props.classId }}
        {{ props.lessonId }}
    </div>
</template>
<script lang="ts" setup>
// import { defineProps } from 'vue';ư
import config from '@/utils/config';
import axios from 'axios';
const props = defineProps({
    lessonId:String,
    classId:String
})

const getLesson = async function(){
   const result = await axios.get(config.URL.BASE+config.URL.GET_LESSON+props.lessonId);
   if(result && result.status == 200){
    console.log(result);
   }
}

getLesson();

</script>