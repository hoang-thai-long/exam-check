<template>
    <div>
        <div class="header-exam-cb">
            <div class="title-hdecb" v-if="lesson != null">
                <h3 class="name-lesson">{{ lesson.title }}</h3>
                <div class="time-lesson" v-if="lesson.timer > 0"> Thời gian : {{ lesson.timer }} phút</div>
                <div class="student-done">Học sinh tham gia : {{ studento.length }}/{{ students.length }}</div>
            </div>
        </div>
        <hr />
        <table class="w-100" style="width: 700px;margin: auto;border-collapse: collapse"
            v-if="partsQuiz && partsQuiz.length > 0">
            <tr v-for="(part, indexP) in partsQuiz" :id="part.id" :key="part.id">
                <template v-if="part.type == 'QUIZ1' || part.type == 'QUIZ4'">
                    <quiz-one :part="part" :questions="questions.filter(o => o.parentID == part.id).sort((a,b)=>a.order-b.order)" :index="indexP" :answers="answers"></quiz-one>
                </template>
                <template v-else-if="part.type == 'QUIZ2'">
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ (indexP + 1) }}: </b><span v-html="renderMathML(part.title)"></span></div>
                                        <div class="col-sm-12 p-0" :id="part.type + '_' + part.id" v-html="stripStyle(part, questions.filter(o => o.parentID == part.id))"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </template>
                <template v-else-if="part.type == 'ESSAY'">
                    <td>
                        <table class="w-100">
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ (indexP + 1) }}: </b><span
                                                v-html="renderMathML(part.title)"></span></div>
                                        <div class="col-sm-12 p-0" v-html="renderMathML(part.description)"></div>
                                    </div>
                                </td>
                            </tr>
                            <!-- <tr v-for="(quiz, indexQ) in part.Questions">
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0" v-if="quiz.Content != null"><span
                                                v-html="renderMathML(quiz.Content)"></span></div>
                                        <textarea :id="'inputES-' + quiz.ID" class="form-control" readonly
                                            style="overflow:hidden">{{ quiz.AnswerEssay }}</textarea>
                                        <div class="media-answer">
                                            <template v-if="!!quiz.Medias" v-for="(media, iM) in quiz.Medias">
                                                <template v-if="getTypeFile(media.Extension) == 'image'">
                                                    <img :src="media.Path" class="media-answer" />
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </td>
                            </tr> -->
                        </table>
                    </td>
                </template>
                <template v-if="part.type == 'QUIZ3'">
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ (indexP + 1) }} : </b><span
                                                v-html="renderMathML(part.title)"></span></div>
                                        <div class="col-sm-12 p-0" v-html="renderMathML(part.description)"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div :class="'row m-0 pt-3 pb-3 ' + part.type" style="border-bottom: 0.5px dotted gray"
                                        :id="part.id + '_' + part.type"
                                        :v-model="renderQuiz3(questions.filter(o => o.parentID == part.id), part.id + '_' + part.type)">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </template>
            </tr>
        </table>
        <div id="breadPage" class="m-0 text-center w-100" style="font-size:16px;font-weight:bold">---Hết---</div>
    </div>
</template>
<script lang="ts" setup>
import JQuery from 'jquery'
import QuizOne from './QuizOne.vue';
import $ from 'jquery';
import { computed, watch } from 'vue';
import store from '@/store';
import { Answer, Lesson, Part, Question } from '@/utils/model';
import config from '@/utils/config';


const questions = computed(() => store.state.Questions);
const answers = computed(() => store.state.Answers);
const partsQuiz = computed(() => store.state.PartQuiz);
const lesson = computed<Lesson | null>(() => store.state.Lesson);
const studento = computed<string[]>(()=>store.state.StudentDo);
const students = computed(()=>store.state.Students);
const exams = computed(()=>store.state.Exams);
const details =computed(()=>store.state.Details);

watch(questions,(n,o)=>{
    if(n != o && n.length > 0){
        store.dispatch("CheckQuestions",n.map(o=> "quetionids="+o.id).join("&"));
    }
})

const startAlpha = 65;

const getTypeFile = (type: string) => {
    var typeIMG = [".jpg", ".jpeg", ".png", ".gif", ".tiff"]
    var typeDoc = [".doc", ".docx"]
    if (typeIMG.includes(type)) {
        return "image"
    }
    else if (typeDoc.includes(type)) {
        return "docx"
    }
    else if (type.includes(".pdf")) {
        return "pdf"
    }
    else {
        return ""
    }
}

const renderContentAns = (obj: string | null, idx: number) => {
    //MathJax.typesetPromise()
    if (obj == null) return ""
    else {
        var start = startAlpha + idx
        var txt = String.fromCharCode(start) + ". " + obj.replace(/mml:/g, "")
        return txt
    }
}

const renderMathML = function (obj: string | null) {
    //MathJax.typesetPromise()
    if (obj == null) return ""
    else {
        var txt = obj.replace(/mml:/g, "")
        return txt
    }
}
const checkResultAns = (ans: { ParentID: string, ID: string }, obj: { QuestionID: string, AnswerID: string }[]) => {
    var realQuizID = ans.ParentID
    var cloneAns = obj.find(x => x.QuestionID == realQuizID)
    if (cloneAns == null) return false
    else {
        if (cloneAns.AnswerID == null) cloneAns.AnswerID = ""
        if (ans.ID == cloneAns.AnswerID) return true
        else if (cloneAns.AnswerID.includes(ans.ID)) return true
        else return false
    }
}
const stripStyle = (part: Part, questions: Question[]) => {
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
            const res = answers.value.filter(o=>o.parentID == item.id);
            if (res != null && res.length > 0) {
                const value = res.map(o => o.content).join(' | ');
                label.html(value);
            }
        }
    }
    const ret = $("<div>").append(html).html();
    return ret; 
}
const isMobileDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        console.log("Mobile detected");
        return true;
    } else {
        // false for not mobile device
        console.log("Desktop detected");
        return false;
    }
}

const cacheStaticV2 = (src: string) => {
    if (src == "" || src == null) return "";
    if (src.startsWith("http"))
        return src;
    return config.URL.STATIC + src;
}

const replaceGooglePath = function (str: string) {
    return str.replace("https://drive.google.com/uc?export=view&id=", "https://drive.google.com/file/d/") + "/preview";
}

const renderMediaContent = (data: Question | Answer, wrapper: JQuery, type = "") => {
    if (data.media) {
        var mediaHolder = $("<div>", { "class": "media-holder mt-2 mb-2 " + type });
        //var contentWrapper = $("<div>", { class: "m-content" });
        //console.log(type);
        switch (type) {
            case "IMG":
                mediaHolder.append(
                    $("<img>", { "class": "img-fluid lazy", "src": cacheStaticV2(data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/")) }));
                break;
            case "VIDEO":

                //mediaHolder.append("<video controls><source src='" + data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/") + "' type='" + data.media.extension + "' />Your browser does not support the video tag</video>");
                mediaHolder.append("<video controls><source src='" + data.media.path + "' type='video/mp4' />Your browser does not support the video tag</video>");
                break;
            case "AUDIO":
                mediaHolder.append("<audio id='audio' controls><source src='" + data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/") + "' type='" + data.media.extension + "' />Your browser does not support the audio tag</audio>");
                break;
            case "DOC":
                //console.log(data.media);
                if (!isMobileDevice()) {
                    if (data.media.path.startsWith("https://drive.google.com")) {
                        mediaHolder.append($("<iframe>", { "src": replaceGooglePath(data.media.path) + "", "class": "embed-frame", "frameborder": "0" }));
                    }
                    else {
                        if (data.media.name.endsWith("doc") || data.media.name.endsWith("docx") ||
                            data.media.name.endsWith("ppt") || data.media.name.endsWith("pptx") ||
                            data.media.name.endsWith("xls") || data.media.name.endsWith("xlsx") ||
                            data.media.path.endsWith("doc") || data.media.path.endsWith("docx") ||
                            data.media.path.endsWith("ppt") || data.media.path.endsWith("pptx") ||
                            data.media.path.endsWith("xls") || data.media.path.endsWith("xlsx")) {
                            mediaHolder.append($("<iframe>", { "src": "https://view.officeapps.live.com/op/embed.aspx?src=https://" + window.location.hostname + data.media.path.replace("http:///", "/") + "", "class": "embed-frame", "frameborder": "0" }));
                        }
                        else {
                            if (data.media != null)
                                mediaHolder.append($("<embed>", { "src": data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/") + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH", "class": "embed-frame" }));
                        }
                    }
                }
                else {
                    mediaHolder.append($("<a>", { "href": data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/"), "class": "btn btn-primary", "onclick": "ViewFile(this)", text: data.media.originalName, "target": "_blank" }));
                }
                break;
            default:
                if (data.media.extension != null)
                    if (data.media.extension.indexOf("image") >= 0)
                        mediaHolder.append(
                            //$("<img>", { "class": "img-fluid lazy", "src": cacheStaticV2(data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/")) }));
                            $("<img>", { "class": "img-fluid lazy", "src": data.media.path }));
                    else if (data.media.extension.indexOf("video") >= 0)
                        mediaHolder.append("<video controls><source src='" + data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/") + "' type='" + data.media.extension + "' />Your browser does not support the video tag</video>");
                    else if (data.media.extension.indexOf("audio") >= 0)
                        mediaHolder.append("<audio id='audio' controls><source src='" + data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/") + "' type='" + data.media.extension + "' />Your browser does not support the audio tag</audio>");
                    else {
                        if (data.media.name.endsWith("doc") || data.media.name.endsWith("docx") ||
                            data.media.name.endsWith("ppt") || data.media.name.endsWith("pptx") ||
                            data.media.name.endsWith("xls") || data.media.name.endsWith("xlsx") ||
                            data.media.path.endsWith("doc") || data.media.path.endsWith("docx") ||
                            data.media.path.endsWith("ppt") || data.media.path.endsWith("pptx") ||
                            data.media.path.endsWith("xls") || data.media.path.endsWith("xlsx")
                        ) {
                            mediaHolder.append($("<iframe>", { "src": "https://view.officeapps.live.com/op/embed.aspx?src=https://" + window.location.hostname + data.media.path.replace("http:///", "/") + "", "class": "embed-frame", "frameborder": "0" }));
                        }
                        else
                            mediaHolder.append($("<embed>", { "src": data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/") + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH" }));
                    }

                break;
        }
        wrapper.append(mediaHolder);
    }
}
const changeTexToLaTex = function (str: string) {
    return "\\(" + str.substring(1, str.length - 1).replace(/</g, "< ").replace(/>/g, " >") + "\\)";
}
const breakLine = (data: string) => {
    if (!data)
        return "";
    let returnData = data.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn")
        .replace(/mml:/g, "");
    const matData = returnData.match(config.REGEX.BREAK_LINE);
    for (var i = 0; matData != null && i < matData.length; i++) {
        var str = matData[i];
        returnData = returnData.replace(str, changeTexToLaTex(str));
    }
    return returnData;
    //return data.replace(/\n/g, "<br/>");
}
const dataRequest: string[] = [];
const renderQuiz3 = (questions: Question[], id: string) => {
    if (!store.state.Done) return;
    if (dataRequest.indexOf(id) > -1) return;
    dataRequest.push(id);
    const el = document.getElementById(id) as HTMLElement;
    if (el == null) return;
    var boxQuiz3 = $("<div>", { class: "part-box QUIZ3" })
    var row = $("<div>", { class: "row w-100 m-auto" })

    var quizWrapper = $("<div>", { class: "quiz-wrapper col-8" })
    // var ansWrapper = $("<div>", { class: "answer-wrapper no-child col-4" });
    if (questions && questions.length > 0) {
        for (var i = 0; i < questions.length; i++) {
            var question = questions[i]
            var quizItem = $("<div>", { class: "quiz-item", id: question.id, "data-part-id": question.parentID })
            var quizPane = $("<div>", { class: "quiz-pane col-6" })
            var paneItem = $("<div>", { class: "pane-item" })

            if (question.media) {
                renderMediaContent(question, paneItem)
            }
            else {
                var strMathML = question.content.replace(/mml:/g, "")
                paneItem.append($("<div>", { class: "quiz-text", html: strMathML }))
            }
            quizPane.append(paneItem)

            var answer_part = $("<div>", {
                "class": "answer-pane col-6",
                "data-question-id": question.id,
                "data-part-id": question.parentID,
                //"data-lesson-id": config.lesson_id,
                "data-type": "QUIZ3"
            });

            quizItem.append(quizPane)
            quizItem.append(answer_part)
            quizWrapper.append(quizItem)

            renderAnswerQuiz3(answer_part, question.id);

        }
    }
    row.append(quizWrapper)
    // row.append(ansWrapper)
    boxQuiz3.append(row)
    el.appendChild(boxQuiz3[0]);
}
const renderQuiz14 = (id: string, partType: string) => {
    return renderAnswerQuiz14(answers.value.filter((o: Answer) => o.parentID == id), partType);
}
const renderAnswerQuiz14 = (answers: Answer[], type: string) => {
    // console.log(answers);
    let html = "";
    for (let i = 0; i < answers.length; i++) {
        const ans = answers[i];
        if (ans.isCorrect) {
            html += '<div class="form-check col-sm-12 d-inline-flex text-success" :id="ans-' + ans.id + '">';
            if (type == "QUIZ1") {
                html += '<input class="form-check-input" id="' + ans.id + '" type="radio" checked disabled>';
            }
            else {
                html += '<input class="form-check-input" id="' + ans.id + '" type="checkbox" checked disabled>';
            }
        }
        else {
            html += '<div class="form-check col-sm-12 d-inline-flex" :id="ans-' + ans.id + '">';
            if (type == "QUIZ1") {
                html += '<input class="form-check-input" id="' + ans.id + '" type="radio" disabled>';
            }
            else {
                html += '<input class="form-check-input" id="' + ans.id + '" type="checkbox" disabled>';
            }
        }
        html += '<label class="form-check-label">';
        html += ' <span style="font-weight:bold">' + renderContentAns(ans.content, i) + '</span>';
        if (ans.media != null && ans.media.path != null) {
            html += '<img src="' + ans.media.path + '" />';
        }
        html += "</label>";

        html += "</div>";
    }
    return html;
}
const renderAnswerQuiz3 = (answer_part: JQuery, id: string) => {
    const _answers = answers.value.filter(o => o.parentID == id);
    for (var j = 0; _answers && j < _answers.length; j++) {
        var item = _answers[j];
        // arrayAns.push(item)
        // var realQuizID = item.parentID

        var txtContent = item.content == null || item.content == "" ? "" : item.content.replace(/mml:/g, "");
        item.content = txtContent
        var answer = $("<fieldset>", { "class": "answer-item", id: item.id });
        if (item.content)
            answer.append($("<input>", { "type": "hidden", "value": item.content.replace(/mml:/g, "") }));
        if (item.media) {
            renderMediaContent(item, answer);
        }
        else {
            answer.append($("<label>", { "class": "answer-text", "html": breakLine(item.content) }));
        }
        answer_part.append(answer);
    }
}
const questionDo = (id:string, type:string)=>{
   const _answers = details.value.filter(o=>o.questionID == id);
   const realAnswers = answers.value.filter(o=>o.parentID== id && o.isCorrect == true);
   let tyleDung = 0, tyleSai = 0;
   if(_answers && _answers.length > 0){
        if(type == "QUIZ4"){

            // chọn nhiều
            console.log(type);
        }
        if(type == "QUIZ1"){
            const real = realAnswers[0];
            const wrong = _answers.filter(o=>o.answerID != real.id);
            const right = _answers.filter(o=>o.answerID == real.id);
            tyleSai = (wrong.length/_answers.length)*100;
            tyleDung = (right.length/_answers.length)*100;
            // chọn 1
            // console.log(realAnswers,_answers);
            
        }
        if(type == "QUIZ3"){
            // nối
            console.log(type);
        }
        if(type == "QUIZ2"){
            // điền từ
            console.log(realAnswers,_answers);
        }
        // const right = _answers.filter(o=>o.point > 0);
        // const wrong = _answers.filter(o=>o.point == 0);
   }

   return $("<span>").html("Tỷ lệ đúng : "+tyleDung.toFixed(1) +"%").html();
}
</script>