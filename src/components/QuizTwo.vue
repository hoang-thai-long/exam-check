<template>
    <div v-if="part != null && questions != null && questions.length > 0 && anwsers != null && anwsers.length > 0"
        class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
        <div class="col-sm-12 p-0"><b>Câu {{ (index + 1) }}: </b><span v-html="renderMathML(part.title)"></span></div>
        <div class="col-sm-12 p-0" v-html="stripStyle(part, questions, anwsers)"></div>
    </div>
</template>
<script lang="ts" setup>
import $ from 'jquery';
import { Answer, Part, Question } from '@/utils/model';
import { renderMathML } from '@/utils/utils'

defineProps<{
    part: Part,
    questions: Question[],
    index: number,
    anwsers: Answer[]
}>();

const stripStyle = (part: Part, questions: Question[], answers: Answer[]) => {
    const str = part.description ?? '';
    //return str;
    const html = $.parseHTML(str);
    const totalQuiz = questions == null ? 0 : questions.length;
    const fillquizs = $(html).find("fillquiz");
    if (fillquizs && fillquizs.length > 0) {
        for (var i = 0; questions != null && i < totalQuiz; i++) {
            var item = questions[i];
            const holder = fillquizs[i];
            holder.id = item.id
            // const input = $("<span>", { class: "fillquiz" });
            const input = $(holder).find(".fillquiz");
            input.remove();
            const label = $("<label>", { class: 'fillquiz', style: 'border-bottom: 1px solid #000;font-weight: 600;padding: 0 10px;' });

            $(holder).append(label);
            const res = answers.filter(o => o.parentID == item.id);
            if (res != null && res.length > 0) {
                const value = res.map(o => o.content).join(' | ');
                label.html(value);
            }
        }
    }
    const ret = $("<div>").append(html).html();
    return ret;
}

</script>