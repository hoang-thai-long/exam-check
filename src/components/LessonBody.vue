<template>
    <div>
        <div class="header-exam-cb">
            <div class="title-hdecb">
                <h3 class="name-lesson">Lesson 1</h3>
                <span class="time-lesson">60 Phút</span>
                <span class="student-done">40/60</span>
            </div>
        </div>
        <hr />
        <table class="w-100" style="width: 700px;margin: auto;border-collapse: collapse">
            <tr v-for="(part, indexP) in data.lessonView.Part" :id="part.ID">
                <template v-if="part.Type == 'QUIZ1' || part.Type == 'QUIZ4'">
                    <template v-if="part.Questions.length == 1">
                        <td>
                            <table class="w-100">
                                <tr v-for="(quiz, indexQ) in part.Questions">
                                    <td>
                                        <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                            <div class="col-sm-12 p-0"><b>Câu {{ indexP + 1 }}: </b><span
                                                    v-html="renderMathML(quiz.Content)"></span></div>
                                            <div class="col-sm-12 p-0" v-html="renderMathML(part.Description)">
                                                <template v-if="quiz.Media != null && quiz.Media.Path != null">
                                                    <img :src="quiz.Media.Path" />
                                                </template>
                                            </div>
                                            <div class="form-group pl-3 m-0">
                                                <template v-for="(ans, idxA) in quiz.CloneAnswers">
                                                    @*<template
                                                        v-if="ans.IsCorrect || checkResultAns(ans, data.exam.Details)">*@
                                                        <div class="form-check col-sm-12 d-inline-flex"
                                                            :id="'ans-' + ans.ID"
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
                                                                    <span
                                                                        v-html="renderContentAns(ans.Content, idxA)"></span>
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
                                                        @*
                                                    </template>*@
                                                </template>
                                            </div>
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
                                                    v-html="renderMathML(part.Title)"></span></div>
                                            <div class="col-sm-12 p-0" v-html="renderMathML(part.Description)"></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(quiz, indexQ) in part.Questions">
                                    <td>
                                        <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                            <div class="col-sm-12 p-0" v-if="quiz.Content != null"><span
                                                    v-html="renderMathML(quiz.Content)"></span></div>
                                            <div class="form-group pl-3 m-0">
                                                <template v-for="(ans, idxA) in quiz.CloneAnswers">

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
                                                </template>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </template>
                </template>
                <template v-else-if="part.Type == 'QUIZ2'">
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ indexP + 1 }}: </b><span
                                                v-html="renderMathML(part.Title)"></span></div>
                                        <div class="col-sm-12 p-0" v-html="stripStyle(part, data.exam.Details)"></div>
                                        @*<div class="col-sm-12 p-0" v-html="renderMathML(part.Description)"></div>*@
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </template>
                <template v-else-if="part.Type == 'ESSAY'">
                    <td>
                        <table class="w-100">
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ indexP + 1 }}: </b><span
                                                v-html="renderMathML(part.Title)"></span></div>
                                        <div class="col-sm-12 p-0" v-html="renderMathML(part.Description)"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(quiz, indexQ) in part.Questions">
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0" v-if="quiz.Content != null"><span
                                                v-html="renderMathML(quiz.Content)"></span></div>
                                        <!--<div class="form-group pl-3 m-0" style="font-style:italic">-->
                                        @*{{ quiz.AnswerEssay }}*@
                                        <!--</div>-->
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
                            </tr>
                        </table>
                    </td>
                </template>
                <template v-if="part.Type == 'QUIZ3'">
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div class="row m-0 pt-3 pb-3" style="border-bottom: 0.5px dotted gray">
                                        <div class="col-sm-12 p-0"><b>Câu {{ indexP + 1 }} 1: </b><span
                                                v-html="renderMathML(part.Title)"></span></div>
                                        <div class="col-sm-12 p-0" v-html="renderMathML(part.Description)"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div :class="'row m-0 pt-3 pb-3 ' + part.Type" style="border-bottom: 0.5px dotted gray"
                                        v-html="renderQuiz3(part, data.exam.Details)"></div>
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

const renderMathML = function (obj?: string | null) {
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

</script>