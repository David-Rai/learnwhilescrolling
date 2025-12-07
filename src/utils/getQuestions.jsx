import useHomeStore from "../context/store"
import fetchQuestions from "./fetchQuestions"

//Initial questions
export default async function getQuestions() {
    const {
        lessons = [],
        currentLesson
    } = useHomeStore.getState()

    const selectedLesson = lessons.find(l => l.name === currentLesson.name)

    //if yes already fetch questions for initial
    if (selectedLesson?.questions.length > 0) return console.log("no initial fetch questions")

    //fetching questions
    fetchQuestions()
}

