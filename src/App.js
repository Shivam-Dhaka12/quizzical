import React, { useEffect } from "react"
import Question from "./components/Question";
import { nanoid } from 'nanoid'
import { useRef } from "react"
import Confetti from 'react-confetti'

export default function App(){
    
    const [quizArray,setQuizArray] = React.useState([]);
    const [questionEl,setQuestionEl] = React.useState([]);
    const [ans,setAns] = React.useState(0)
    const [show,setshow] = React.useState(false)
    const ref = [useRef(),useRef(),useRef(),useRef(),useRef()]
    

    async function getQuiz() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const data = await res.json()
        return (data.results)
    }
    
    // useEffect(()=>console.log(quizArray),[quizArray])

    async function start(){
        const quizEl = []
        const arr = await getQuiz()
        // console.log(arr)
        for (let index = 0; index < arr.length; index++) {
            let id = nanoid()
            const element = <Question
            ref={ref[index]}
            key = {id}
            id =  {id}
            value={arr[index].question}
            correct_option={arr[index].correct_answer}
            incorrect_option={arr[index].incorrect_answers}
            />
            console.log(arr[index].correct_answer)
            quizEl.push(element)
        }
        setQuizArray(arr)
        setQuestionEl(quizEl)
        setAns(0)
        setshow(false)
    }
    
    function checkAnswer(){
        let res = 0
        for(let i = 0; i < 5; i++){
            res += ref[i].current.checkAnswer()
        }
        setAns(res)
        setshow(true)
    }


    const height = window.document.body.offsetHeight
    return(
        <div>
        {   
            quizArray.length===0 ?
            <div className="landing">
                <div className="container">
                    <h1 className="title">Quizzical</h1>
                    <h4 className="sub-title">Test your knowledge!</h4>
                    <button className="start-btn" onClick={()=>start()}>Start quiz</button>
                </div>
            </div>
            :
            <div className="main">
                <div className="quiz-container">
                    {ans==5 && <Confetti height={height} className="confetti"/>}
                    {questionEl}
                    {!show && <button className="check-btn" onClick={()=>{checkAnswer()}}>Check answers</button>}
                    {show && 
                    <div className="play-again">
                        <span className="result">{`You scored ${ans} out of 5`}</span>
                        <button className="play-btn" onClick={()=>{start()}}>Play again</button>
                    </div>
                    }

                </div>
            </div>
        }
        </div>
    )
}