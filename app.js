/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  questions: [
    {
      question: 'What color is a fish?',
      answers: [
        'Red',
        'Green',
        'Blue',
        'Gold'
      ],
      correctAnswer: 'Gold',
      currentA: -1,
      currentQ: true
    },
    {
      question: 'How big is a bird?',
      answers: [
        'Birds aren\'t real',
        'Big enough',
        '10 inches',
        '8 feet'
      ],
      correctAnswer: 'Big enough',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'Is cereal a soup?',
      answers: [
        'Yes, obviously',
        'Yes, but to be specific it\'s a stew',
        'It\'s actually a salad. Milk is a dressing',
        'No, I like being wrong'
      ],
      correctAnswer: 'Yes, but to be specific it\'s a stew',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'How much milk is there in the Milky Way?',
      answers: [
        'Technically all of it',
        'At least 3',
        '6.7 * 10^5 1km^3',
        '1 Liter'
      ],
      correctAnswer: 'Technically all of it',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'What tempurature is the "hot potato"?',
      answers: [
        '95°C',
        'Hot',
        '0°K',
        '210°F'
      ],
      correctAnswer: '210°F',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'How fast is a car?',
      answers: [
        'Faster than mine',
        '120 mph',
        'Fast?',
        'Fast AND Furious'
      ],
      correctAnswer: 'Fast AND Furious',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'Is a hotdog a sandwich?',
      answers: [
        'No, I\'m to scared to face the truth',
        'Yes, and any sandwich with a seam is, in fact, a hot dog',
        'It\'s closer to a wrap',
        'No, the buns surface is not perpindicular to the crust'
      ],
      correctAnswer: 'Yes, and any sandwich with a seam is, in fact, a hot dog',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'What kind of fruit is in Juicy Fruit?',
      answers: [
        'Lemon, Orange, Pineapple and Banana',
        'Artificial flavors',
        'Jackfruit',
        'Juicy'
      ],
      correctAnswer: 'Lemon, Orange, Pineapple and Banana',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'How loud is sound?',
      answers: [
        'Loud',
        '70 dB',
        'Silent',
        'Yes'
      ],
      correctAnswer: 'Loud',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'If batmans parents are dead, how was he born?',
      answers: [
        'Magic',
        'Alfred spawned Bruce inside a test tube who was incubated by the biggest bat Alfred could find',
        'Robin laid an egg',
        'Batman never had any parents because he is, secretly, just a clone of Bruce Wayne.'
      ],
      correctAnswer: 'Robin laid an egg',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'How dead is the dead sea?',
      answers: [
        'Not dead',
        'Pretty dead',
        'Extremely dead',
        'So dead it doesn\'t exist'
      ],
      correctAnswer: 'So dead it doesn\'t exist',
      currentA: -1,
      currentQ: false
    },
    {
      question: 'What color is Blue from Blue’s Clues?',
      answers: [
        'Blue',
        '#99dbff',
        'Blue\'s Clues is a lie',
        'The same color as Violet from that one scene in Willy Wonka'
      ],
      correctAnswer: '#99dbff',
      currentA: -1,
      currentQ: false
    },
  ],
  answered: false,
  answerIndex: -1,
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
    store.answerIndex = -1;
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

function handleRetry() {
  $('.form').on('click', '.retry', function (e) {
    e.preventDefault();
    store.questionNumber = 0;
    store.questions.forEach(i => i.currentA = -1); // reset all answers to first option
    store.score = 0;
    store.answered = false;
    renderQuestion();
  });
}

function selectAnswerForAnswers(answerSelected, qId) {
  store.questions[qId].currentA = answerSelected;
  store.answerIndex = store.questions[qId].answers.findIndex(i => i === store.questions[qId].correctAnswer);
  if(store.answerIndex === answerSelected) store.score++;
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
    selectAnswerForAnswers(id, qId);
    store.answered=true;
    renderQuestion();
  });
}

function generateQuestionElement(question) {
  let pBar = '<div class="pBar">';
  for(let i = 0; i<store.questions.length; i++){
    pBar += `<label ${i === store.questionNumber - 1 ? 'class="selected"': ''}>${i+1} </label>`;
  }
  pBar +='</div>';

  return `  
    <label class="pLabel">Current Question</label>
    ${pBar}
    <label class="pLabel">Current Score: ${store.score}/${store.questions.length}</label>
    <label class="question" data-answer-selected="${question.currentA}">${question.question}</label>
    <input type="button" class="answer${question.currentA === 0? (store.answerIndex === 0? ' selected': ' incorrect') : ''}${store.answered===true? (store.answerIndex === 0? ' selected notClickable': ' notClickable') : ''}" value="${question.answers[0]}">
    <input type="button" class="answer${question.currentA === 1? (store.answerIndex === 1? ' selected': ' incorrect') : ''}${store.answered===true? (store.answerIndex === 1? ' selected notClickable': ' notClickable') : ''}" value="${question.answers[1]}">
    <input type="button" class="answer${question.currentA === 2? (store.answerIndex === 2? ' selected': ' incorrect') : ''}${store.answered===true? (store.answerIndex === 2? ' selected notClickable': ' notClickable') : ''}" value="${question.answers[2]}">
    <input type="button" class="answer${question.currentA === 3? (store.answerIndex === 3? ' selected': ' incorrect') : ''}${store.answered===true? (store.answerIndex === 3? ' selected notClickable': ' notClickable') : ''}" value="${question.answers[3]}">
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