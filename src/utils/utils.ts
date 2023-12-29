import config from "./config"
import { Question, Answer } from "./model"
import $ from 'jquery';
const renderMathML = function (obj: string | null) {
    //MathJax.typesetPromise()
    if (obj == null) return ""
    else {
        const txt = obj.replace(/mml:/g, "")
        return txt
    }
}
const renderContentAns = (obj: string | null, idx: number) => {
    //MathJax.typesetPromise()
    if (obj == null) return ""
    else {
        const start = 65 + idx
        const txt = String.fromCharCode(start) + ". " + obj.replace(/mml:/g, "")
        return txt
    }
}
const renderMediaContent = (data: Question | Answer | null | undefined, wrapper: JQuery | null, type = "") => {
    if (data && data.media) {
        const mediaHolder = $("<div>", { "class": "media-holder mt-2 mb-2 " + type });
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
                            $("<img>", { "class": "img-fluid lazy", "src": cacheStaticV2(data.media.path.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn").replace("http:///", "/")) }));
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
        if(wrapper){
            wrapper.append(mediaHolder);
        }
        else{
            return $('<div>').append(mediaHolder).html();
        }
        
    }

    return "";
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

const replaceGooglePath = function (str: string) {
    return str.replace("https://drive.google.com/uc?export=view&id=", "https://drive.google.com/file/d/") + "/preview";
}
const cacheStaticV2 = (src: string) => {
    if (src == "" || src == null) return "";
    if (src.startsWith("http"))
        return src;
    return config.URL.STATIC + src;
}
const breakLine = (data: string) => {
    if (!data)
        return "";
    let returnData = data.replace("http://publisher.edusolution.vn", "https://publisher.eduso.vn")
        .replace(/mml:/g, "");
    const matData = returnData.match(config.REGEX.BREAK_LINE);
    for (let i = 0; matData != null && i < matData.length; i++) {
        const str = matData[i];
        returnData = returnData.replace(str, changeTexToLaTex(str));
    }
    return returnData;
    //return data.replace(/\n/g, "<br/>");
}
const changeTexToLaTex = function (str: string) {
    return "\\(" + str.substring(1, str.length - 1).replace(/</g, "< ").replace(/>/g, " >") + "\\)";
}
export {
    renderMathML,
    renderContentAns,
    isMobileDevice,
    replaceGooglePath,
    renderMediaContent,
    cacheStaticV2,
    breakLine,
    changeTexToLaTex
}