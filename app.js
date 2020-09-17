/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green',
      currentA: 0,
      // id: cuid(),
      currentQ: true
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019',
      currentA: 0,
      // id: cuid(),
      currentQ: false
    },
    {
      question: 'What is the current month?',
      answers: [
        'Jan',
        'Feb',
        'Mar',
        'Other'
      ],
      correctAnswer: 'Other',
      currentA: 0,
      // id: cuid(),
      currentQ: false
    }
  ],
  answered: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// function generateHome(){}
// function generateQuestion(){}
// function generateTotal(){}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
// function renderHome(){}
// function renderQuestion(){}
// function renderTotal(){}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
// function submitAnswer(){}
// function checkAnswer(){}
// function returnResult(){}
// function keepScore(){}
// function resetQuiz(){}

function handleNext() {
  $('.form').on('click', '.next', function (e) {
    e.preventDefault();
    store.questionNumber++;
    store.answered = false;
    renderQuestion();
  });
}

function handleStart() {
  $('.form').on('click', '.start', function (e) {
    e.preventDefault();
    store.questionNumber++;

    renderQuestion();
  });
}

function showCorrect(){

}

function handleRetry() {
  $('.form').on('click', '.retry', function (e) {
    e.preventDefault();
    store.questionNumber = 0;
    store.questions.forEach(i => i.currentA = 0); // reset all answers to first option
    store.score = 0;
    store.answered = false;
    renderQuestion();
  });
}

function selectAnswerForAnswers(answerSelected, qId) {
  store.questions[qId].currentA = answerSelected;
  let answerIn = store.questions[qId].answers.findIndex(i => i === store.questions[qId].correctAnswer);
  if(answerIn  === answerSelected) store.score++;
  
}

function getAnswerIdFromAnswers(answerId, qId) {
  const val = $(answerId).val();
  return store.questions[qId].answers.findIndex(answer => answer === val);
}

function getQuestionIdFromQuestions(qId) {
  const question = $(qId).siblings('.question').text();
  return store.questions.findIndex(q => q.question === question);
}

function handleAnswerClicked() {
  $('.form').on('click', '.answer', e => {
    console.log('`handleAnswerClicked` ran');
    const qId = getQuestionIdFromQuestions(e.currentTarget);
    const id = getAnswerIdFromAnswers(e.currentTarget, qId);
    // console.log('id ' + id + ' qId ' + qId);
    selectAnswerForAnswers(id, qId);
    store.answered=true;
    renderQuestion();
  });
}

function generateQuestionElement(question) {
  let pBar = '<div class="pBar">';
  for(let i = 0; i<store.questions.length; i++){
    pBar += `<label ${i<=store.questionNumber - 1 ? 'class="selected"': ''}>${i+1} </label>`;
  }
  pBar +='</div>';

  return `  
    <label class="pLabel">Current Question</label>
    ${pBar}
    <label class="pLabel">Current Score: ${store.score}/${store.questions.length}</label>
    <label class="question" data-answer-selected="${question.currentA}">${question.question}</label>
    <input type="button" class="answer${question.currentA === 0 ? ' selected' : ''}${store.answered===true?' notClickable' : ''}" value="${question.answers[0]}">
    <input type="button" class="answer${question.currentA === 1 ? ' selected' : ''}${store.answered===true?' notClickable' : ''}" value="${question.answers[1]}">
    <input type="button" class="answer${question.currentA === 2 ? ' selected' : ''}${store.answered===true?' notClickable' : ''}" value="${question.answers[2]}">
    <input type="button" class="answer${question.currentA === 3 ? ' selected' : ''}${store.answered===true?' notClickable' : ''}" value="${question.answers[3]}">
    <button type="submit" class="next${store.answered===false?' notVisible': ''}">Next</button>
  `;
} 


function generateQuestionString(questionList) {
  console.log('Generate question element');
  const arr = questionList.questions;
  // const questions = arr.map(question => generateQuestionElement(question));
  const questions = generateQuestionElement(arr[store.questionNumber - 1]);
  return questions;//.join('');
}

function generateHomeString(){
  return '<button type="submit" class="start">Start Quiz?</button>';
}

function generateEndString(){
  return '<button type="submit" class="retry">Try Again!</button>';
}

function renderQuestion() {
  console.log('`renderQuestion` ran');
  if (store.questionNumber > 0 && store.questionNumber <= store.questions.length) {
    const questionString = generateQuestionString(store);
    $('.form').html(questionString);
  } else if (store.questionNumber === 0) {
    const questionString = generateHomeString(store);
    $('.form').html(questionString);
  } else {
    const questionString = generateEndString(store);
    $('.form').html(questionString);
  }
}

function renderForm() {
  $('main').html('<form class="form"></form>');
}

function main() {
  renderForm();
  renderQuestion();
  handleNext();
  handleAnswerClicked();
  handleStart();
  handleRetry();
}

$(main);