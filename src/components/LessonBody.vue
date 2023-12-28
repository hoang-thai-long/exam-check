<template>
    <div>
        <div class="header-exam-cb">
            <div class="title-hdecb" v-if="lesson != null">
                <h3 class="name-lesson">{{ lesson.title }}</h3>
                <span class="time-lesson" v-if="lesson.timer > 0"> {{ lesson.timer }} phút</span>
                <span class="student-done"></span>
            </div>
        </div>
        <hr />
        <table class="w-100" style="width: 700px;margin: auto;border-collapse: collapse"
            v-if="partsQuiz && partsQuiz.length > 0">
            <tr v-for="(part, indexP) in partsQuiz" :id="part.id" :key="part.id">
                <template v-if="part.type == 'QUIZ1' || part.type == 'QUIZ4'">
                    <template v-if="questions.filter(o => o.parentID == part.id).length == 1">
                        <td>
                            <table class="w-100">
                                <tr v-for="(quiz) in questions.filter(o => o.parentID == part.id)" :key="quiz.id">
                                    <td>
                                        <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                            <div class="col-sm-12 p-0"><b>Câu {{ (indexP + 1) }}: </b><span
                                                    v-html="renderMathML(quiz.content)"></span></div>
                                            <div class="col-sm-12 p-0">{{ renderMathML(part.description) }}
                                                <template v-if="quiz.media != null && quiz.media.path != null">
                                                    <img :src="quiz.media.path" />
                                                </template>
                                            </div>
                                            <div class="form-group pl-3 m-0"
                                                :bind="renderQuiz14(quiz.id, part.id + '_' + quiz.id, part.type)"
                                                :id="part.id + '_' + quiz.id"></div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </template>
                    <template v-else>
                        <td>
                            <table class="w-100">
                                <tr>
                                    <td>
                                        <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                            <div class="col-sm-12 p-0"><b>Câu {{ indexP + 1 }}: </b><span
                                                    v-html="renderMathML(part.title)"></span></div>
                                            <div class="col-sm-12 p-0" v-html="renderMathML(part.description)"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(quiz) in questions.filter(o => o.parentID == part.id)" :key="quiz.id">
                                    <td>
                                        <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                            <div class="col-sm-12 p-0" v-if="quiz.content != null"><span
                                                    v-html="renderMathML(quiz.content)"></span></div>
                                            <div class="form-group pl-3 m-0">
                                                <!-- <template v-for="(ans, idxA) in quiz.CloneAnswers">

                                                    <div class="form-check col-sm-12 d-inline-flex" :id="'ans-' + ans.ID"
                                                        v-bind:class="ans.IsCorrect ? 'text-success' : ''">
                                                        <template v-if="checkResultAns(ans, data.exam.Details)">
                                                            <input class="form-check-input" :id="ans.ID"
                                                                v-bind:type="[part.Type == 'QUIZ1' ? 'radio' : 'checkbox']"
                                                                checked>
                                                            <label class="form-check-label">
                                                                <span style="font-weight:bold"
                                                                    v-html="renderContentAns(ans.Content, idxA)"></span>
                                                                <template
                                                                    v-if="ans.Media != null && ans.Media.Path != null">
                                                                    <img :src="ans.Media.Path" />
                                                                </template>
                                                            </label>
                                                        </template>
                                                        <template v-else>
                                                            <input class="form-check-input" :id="ans.ID"
                                                                v-bind:type="[part.Type == 'QUIZ1' ? 'radio' : 'checkbox']">
                                                            <label class="form-check-label">
                                                                <span v-html="renderContentAns(ans.Content, idxA)"></span>
                                                                <template
                                                                    v-if="ans.Media != null && ans.Media.Path != null">
                                                                    <img :src="ans.Media.Path" />
                                                                </template>
                                                            </label>
                                                        </template>
                                                        <template
                                                            v-if="!ans.IsCorrect && checkResultAns(ans, data.exam.Details)">
                                                            <i class="fas fa-times text-danger ml-2"></i>
                                                        </template>
                                                        <template
                                                            v-else-if="ans.IsCorrect && checkResultAns(ans, data.exam.Details)">
                                                            <i class="fas fa-check text-success ml-2"></i>
                                                        </template>
                                                    </div>
                                                </template> -->

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </template>
                </template>
                <template v-else-if="part.type == 'QUIZ2'">
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ (indexP + 1) }}: </b><span
                                                v-html="renderMathML(part.title)"></span></div>
                                        <!-- <div class="col-sm-12 p-0" v-html="stripStyle(part, data.exam.Details)"></div> -->
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
import $ from 'jquery';
import { computed } from 'vue';
import store from '@/store';
import { Answer, Lesson, Part, Question } from '@/utils/model';
import config from '@/utils/config';

const lesson = computed<Lesson | null>(() => store.state.Lesson)
const questions = computed(() => store.state.Questions);
const partsQuiz = computed(() => store.state.PartQuiz);
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

const stripStyle = (data: { Description: any; Questions: string | any[] | null; }, obj: any[]) => {
    var str = data.Description
    //return str;
    var html = $.parseHTML(str);
    var totalQuiz = data.Questions == null ? 0 : data.Questions.length;
    var fillquizs = $(html).find("fillquiz");
    for (var i = 0; data.Questions != null && i < data.Questions.length; i++) {
        var item = data.Questions[i];
        var userAns = obj.find((x: { QuestionID: any; }) => x.QuestionID == item.ID)

        try {
            //var container = $("#" + data.ParentID + " .quiz-wrapper .part-description");
            var holder = fillquizs[i];
            holder.id = item.ID
            var input = $("<span>", { class: "fillquiz" });
            $(holder).find(".fillquiz").remove();
            if (userAns == undefined) {
                $(input).text("Không có câu trả lời");
            }
            else {
                $(input).text(userAns.AnswerValue);
            }
            $(holder).append(input);


            var arrayRealAnswer = item.CloneAnswers.filter((x: { IsCorrect: any; }) => x.IsCorrect).map(function (v: { Content: any; }) {
                return v.Content;
            });

            var idxCorrect = item.CloneAnswers.findIndex((x: { ID: any; }) => x.ID == userAns.RealAnswerID);//check xem trong arrayRealAnswer có chứa đáp án của học sinh k, > -1 => hs làm đúng
            var isCorrect = false
            if (idxCorrect > -1) isCorrect = true

            var realAnswer = ""
            if (arrayRealAnswer != undefined)
                realAnswer = arrayRealAnswer.join(' | ')
            if (realAnswer != "" && !isCorrect) {
                var span = $("<span>", { text: realAnswer.trim(), class: "text-success ml-1 d-inline-block" })
                $(holder).after(span[0])
            }

            if (!isCorrect) {
                holder.setAttribute("style", "color:#dc3545")
            }
            else {
                holder.setAttribute("style", "color:#28a745")
            }
        }
        catch (e) {
            console.log("No placeholder found");
        }
    }

    var ret = $("<div>").append(html).html()
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

const renderMediaContent = (data: Question, wrapper: $<HTMLElement>, type = "") => {
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
    console.log(questions, questions.length)
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
const QuizLoad: string[] = [];
const renderQuiz14 = (id: string, elid: string, partType: string) => {
    console.log(QuizLoad, QuizLoad.indexOf(id));
    if (QuizLoad.indexOf(id) > -1) return;
    const el = document.getElementById(elid);
    if (el) {
        QuizLoad.push(id);
        store.dispatch("loadAnswers", id).then((res: Answer[]) => {
            renderAnswerQuiz14(res, el, partType);
        });
    }
}
const renderAnswerQuiz14 = (answers: Answer[], el: HTMLElement, type: string) => {
    // <div class="" :id="" v-bind:class="ans.IsCorrect ? '' : ''"> 
    // <input class="form-check-input" :id="ans.ID"
    //         v-bind:type="[part.Type == 'QUIZ1' ? 'radio' : 'checkbox']"
    //         checked>
    let html = "";
    for (let i = 0; i < answers.length; i++) {
        const ans = answers[i];
        if (ans.isCorrect) {
            html += '<div class="form-check col-sm-12 d-inline-flex text-success" :id="ans-' + ans.id + '">';
            if (type == "QUIZ1") {
                html += '<input class="form-check-input" id="' + ans.id + '" type="radio" checked>';
            }
            else {
                html += '<input class="form-check-input" id="' + ans.id + '" type="checkbox" checked>';
            }
        }
        else {
            html += '<div class="form-check col-sm-12 d-inline-flex" :id="ans-' + ans.id + '">';
            if (type == "QUIZ1") {
                html += '<input class="form-check-input" id="' + ans.id + '" type="radio">';
            }
            else {
                html += '<input class="form-check-input" id="' + ans.id + '" type="checkbox">';
            }
        }
        html += '<label class="form-check-label">';
        html += ' <span style="font-weight:bold">'+renderContentAns(ans.content, i)+'</span>';
        if(ans.media != null && ans.media.path != null){
            html += '<img src="'+ans.media.path+'" />';
        }
        html += "</label>";

        html += "</div>";
    }
    el.innerHTML = html;
}
const renderAnswerQuiz3 = async (answer_part: $<HTMLElement>, id: string) => {
    const answers = await store.dispatch("loadAnswers", id);
    for (var j = 0; answers && j < answers.length; j++) {
        var item = answers[j];
        // arrayAns.push(item)
        // var realQuizID = item.parentID

        var txtContent = item.content == null || item.Content == "" ? "" : item.content.replace(/mml:/g, "");
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
</script>