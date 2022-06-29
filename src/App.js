import React, { useEffect } from "react"
import Question from "./components/Question";
import { nanoid } from 'nanoid'
import { useRef } from "react"
import Confetti from 'react-confetti'
import { eventWrapper } from "@testing-library/user-event/dist/utils";

export default function App(){
    
    const [quizArray,setQuizArray] = React.useState([]);
    const [questionEl,setQuestionEl] = React.useState([]);
    const [ans,setAns] = React.useState(0)
    const [show,setshow] = React.useState(false)
    const [category,setcategory] = React.useState(false)
    const [category_name,setcategory_name] = React.useState("")
    const [ difficulty,setdifficulty] = React.useState(false)
    const [difficulty_name,setdifficulty_name] = React.useState("")
    const ref = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef()]
    

    async function getQuiz(category_name,difficulty_name) {
        const link = "https://opentdb.com/api.php?amount=10&category="+category_name+"&difficulty="+difficulty_name+"&type=multiple"
        // console.log(link)
        const res = await fetch(link)
        const data = await res.json()
        return (data.results)
    }
    
    // useEffect(()=>console.log(quizArray),[quizArray])

    async function start(){
        const quizEl = []
        const arr = await getQuiz(category_name,difficulty_name)
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

    function setcategoryfn(){
        setcategory(!category)
    }    
    
    function setdifficultyfn(){
        setdifficulty(!difficulty)
    }
    
    function checkAnswer(){
        let res = 0
        for(let i = 0; i < 10; i++){
            res += ref[i].current.checkAnswer()
        }
        setAns(res)
        setshow(true)
    }

    const selectcategory = e => {
        setcategory_name(e.target.id);
        setcategoryfn();
    };

    const selectdifficulty = e => {
        setdifficulty_name(e.target.id);
        setdifficultyfn();
    };


    const height = window.document.body.offsetHeight
    return(
        <div>
        {   
            quizArray.length===0 ?
            <div className="landing">
                <div className="container">
                    <h1 className="title">Quizzical</h1>
                    <h4 className="sub-title">Test your knowledge!</h4>
                    {!category && <button className="cat-btn" onClick={()=>setcategoryfn()}>Category</button>}
                    {category && 
                    <div className="cat-option">
                        <button id="18" className="option-cat" onClick={selectcategory}>Computers</button>    
                        <button id="21" className="option-cat" onClick={selectcategory}>Sports</button>    
                        <button id="23" className="option-cat" onClick={selectcategory}>History</button>    
                        <button id="24" className="option-cat" onClick={selectcategory}>Politics</button>    
                        <button id="25" className="option-cat" onClick={selectcategory}>Art</button>    
                        <button id="27" className="option-cat" onClick={selectcategory}>Animals</button>    
                        <button id="29" className="option-cat" onClick={selectcategory}>Comics</button>    
                        <button id="30" className="option-cat" onClick={selectcategory}>Gadgets</button>    
                    </div>
                    }
                    {!difficulty && <button className="cat-btn" onClick={()=>setdifficultyfn()}>Difficulty</button>}
                    {difficulty && 
                    <div className="dif-option">
                        <button id="easy" className="dif-cat" onClick={selectdifficulty}>Easy</button>    
                        <button id="medium" className="dif-cat" onClick={selectdifficulty}>Medium</button>    
                        <button id="hard" className="dif-cat" onClick={selectdifficulty}>Hard</button>   
                    </div>
                    }
                    <button className="start-btn" onClick={()=>start()}>Start quiz</button>
                </div>
            </div>
            :
            <div className="main">
                <div className="quiz-container">
                    {ans===10 && <Confetti height={height} className="confetti"/>}
                    {questionEl}
                    {!show && <button className="check-btn" onClick={()=>{checkAnswer()}}>Check answers</button>}
                    {show && 
                    <div className="play-again">
                        <span className="result">{`You scored ${ans} out of 10`}</span>
                        <button className="play-btn" onClick={()=>{start()}}>Play again</button>
                    </div>
                    }

                </div>
            </div>
        }
        </div>
    )
}