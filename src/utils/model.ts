interface Student {
    id: string,
    name: string
}
interface Lesson {
    id: string,
    startDate: Date,
    endDate: Date,
    timer: number,
    title: string
}
interface Media {
    name: string,
    originalName: string,
    path: string,
    extension: string,
    created: Date,
    size: number
}
interface Part {
    id: string,
    media: Media | null,
    description: string | null,
    title: string,
    type: string
}
interface Question {
    id: string,
    content: string,
    parentID: string,
    description: string | null,
    media: Media | null,
    order: number
}

interface Answer {
    content: string,
    id: string,
    isCorrect: boolean,
    media: Media | null,
    order: number,
    parentID: string
}
interface ExamDetail {
    answerID: string,
    answerValue: string,
    examID: string,
    id: string,
    point: number,
    questionID: string,
    questionValue: string,
    studentID: string,
}
interface Exam {
    created: Date,
    id: string,
    maxPoint: number,
    number: number,
    point: number,
    status: boolean,
    studentID: string,
    updated: Date,
}

export {
    Student, Lesson, Media, Part, Question, Answer, ExamDetail, Exam
}