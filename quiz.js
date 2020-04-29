// make an array for quiz questions, choices and answers
let quizQuestions = [
    {
        question: 'The condition in an if/else statement is enclosed within ______.',
        choices:[
            'quotes',
            'curly brackets',
            'parentheses',
            'square brackets'
        ],
        correctAnswer: '3'
    },
    {
        question: 'Arrays in Javascript can be used to store ______.',
        choices:[
            'numbers and strings',
            'other arrays',
            'booleans',
            'all of the above'
        ],
        correctAnswer: '4'
    },
    {
        question: 'String values must be enclosed within ______ when being assigned to variables.',
        choices:[
          'commas',
          'curly brackets',
          'quotes',
          'parentheses'
        ],
        correctAnswer: '3'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices:[
          'JavaScript',
          'terminal/bash',
          'for loops',
          'console.log'
        ],
        correctAnswer: '4'
    },
    {
        question: 'Commonly used data types DO NOT include:',
        choices:[
          'strings',
          'booleans',
          'alerts',
          'numbers'
        ],
        correctAnswer: '3'
    }
]

// score variable
let score

function startCodeQuiz() {
    // hide the gameover and home page display
    document.getElementById('startPage').classList.add('d-none')
    document.getElementById('gameOverPage').classList.add('d-none')
    document.getElementById('quizPage').classList.remove('d-none')

    // restart timer/score
    score = 75
    startTimer()

    // start the quiz questions
    displayQuestion(0)
}

// set a timer for the quiz
let timer
// make a variable to display time
const displayTime = document.getElementById('displayTime')
// make a function to start timer
function startTimer(){
    // set an interval for the timer
    timer = setInterval(()=>{
        // timer/score number descends
        score--
        // display the time/score on quiz page
        displayTime.innerText = score;
        // when score reach 0 quiz is all done
        if(score <= 0){
            // go to game over page to see final result
            gameOver()
        }
      // goes down every 1 second 
    },1000)
}

// function to evaluate answers from question index and choice index
function evaluateAnswer(questionIndex, choiceIndex) {
    // if answer is incorrect then go to the next question and make sure to use number not strings
    if (Number(quizQuestions[questionIndex].correctAnswer) !== choiceIndex + 1){
        // subtract 10 if answer is wrong
        score = score-10
    }

    // if questions is not undefined display the question
    if(typeof quizQuestions[questionIndex+1] !== 'undefined'){
        displayQuestion(questionIndex+1)
    } else {
        // game over and go to game over page
        gameOver()
    }
}

// variable for question container
const questionContainer = document.getElementById('questionContainer')
// function to display question index
function displayQuestion(index) {
    // make sure to clear the previous question
    questionContainer.innerHTML = ""
    // get the variable for current question from the array
    let currentQuestion = quizQuestions[index]
    // create element to show the question on the page
    const questionHeadline = document.createElement('h3')
    // use innertext to display the question
    questionHeadline.innerText = currentQuestion.question
    // create element to show the choices on the page
    const choicesContainer = document.createElement('div')
    choicesContainer.className = "row justify-content-center"
    
    // grab choice from currentQuestion and for each choice
    currentQuestion.choices.forEach((choice,i) => {
        // make button for each choice
        let choiceButton = document.createElement('button')
        choiceButton.className = "btn btn-primary mr-2"
        // string each choice
        choiceButton.innerText = choice.toString()
        // add event listener to the button so it functions when clicked
        choiceButton.addEventListener('click', function(event){
            // evaluate answer when clicking the button
            evaluateAnswer(index, i)
        })
        // append to see the buttons
        choicesContainer.appendChild(choiceButton)
    })

    // we need to append to see it
    questionContainer.appendChild(questionHeadline)
    questionContainer.appendChild(choicesContainer)

}

// function to display score
const displayScore = document.getElementById('displayScore')
// function for the gameover page
function gameOver() {
    // hide the gameover and home page display
    document.getElementById('startPage').classList.add('d-none')
    document.getElementById('quizPage').classList.add('d-none')
    // show the game over page
    document.getElementById('gameOverPage').classList.remove('d-none')
    // clear timer
    clearInterval(timer)
    // display score on page
    displayScore.innerText = score
}

// add event listener to start quiz
document.querySelector('#startQuiz').addEventListener('click', startCodeQuiz)