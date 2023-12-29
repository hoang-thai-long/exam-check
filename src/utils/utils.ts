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

export {
    renderMathML,
    renderContentAns
}