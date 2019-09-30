// vars to store question number and score //
let questionNumber = 0;
let totalScore = 0;

//Basic To Generate Question
function generateQuestion (){
  if (questionNumber < QUESTIONS.length){
    return createQuestion(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore()
    $('.questionNum').text(10)
    
  }
}
//Basic Update Score +1
function updateScore(){
  totalScore++
  $('.score').text(totalScore)
}

//update question number variable and in app
function updateQuestionNumber(){
  questionNumber++
  $('.questionNum').text(questionNumber + 1)
  console.log(`ran`)
}
// resets the stats for both variables and on the app face
function resetStats (){
  totalScore = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNum').text(0)
  console.log(`ran`)
}

function startQuiz(){
$('.altBox').hide();
$('.divRe').hide();
$('.divRe2').hide();
$('.startQuizBox').on('click','.startButton', function (e){
  $('.startQuizBox').hide();
  $('.questionNum').text(1);
  $('.questionBox').show();
  $('.questionBox').append(generateQuestion());
  $('.finalBox').hide();
  $('.restartButton').hide();
});
console.log(`ran`)
}
function submitAnswer (){
  $('.bigBox').on('submit', function(e){
    e.preventDefault();
    $('.responseBox').show();
    $('.questionBox').hide();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = QUESTIONS[questionNumber].correctAnswer;
    if (answer == correct){
      correctAnswer();
    } else {
      wrongAnswer()
      
    }
    })};
//Creates question 
function createQuestion(index) {
  let formBuild = $(`<form class='form'>
    <fieldset>
      <legend> <span class='questionText'>${QUESTIONS[index].question}
      </span></legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formBuild).find('fieldset');

  QUESTIONS[index].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formBuild;
}
// Correct answer feedback response
function correctAnswer(){
  $('.divRe').show()
  $('.responseBox').html(
    `<p class='correct'>You've got it!</p>
      <img src='images/americanFlagGuy.png' alt='guyFieriExcited' class='guyFlag'>
     <p class='correct p2'>Guy is happy.</p>
     <button type='button' class='nextButton'>NEXT</button>`
  );
  updateScore()

}
function wrongAnswer() {
  $('.divRe').show();
  $('.responseBox').html(
    `<p class='p3'>Not this time.</p>
    <img src='images/guySad.jpg' class='guySad' alt='guyFieriSadFace'>
    <p class='wrongAnswerP'>The answer was:</p>
    <p class='sizeIt'>${QUESTIONS[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">NEXT</button>`
    
  );
}
//next question!
function nextQuestion() {
  $('.bigBox').on('click', '.nextButton', function (event) {
    
    $('.divRe').hide();
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.responseBox').hide()
    $('.questionBox form').replaceWith(generateQuestion());
  });
}
//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.altBox').hide();
  $('.finalBox').show();
  $('.divRe').hide();
  $('.divRe2').show();
  $('.questionNumScore').hide();
  $('.content').hide();
  
  $('images/guySpace.jpg').addClass('images');
  $('images/guyGood.jpg').addClass('images');
  $('images/guyWeird.jpeg').addClass('images');


  const great = [
    'Great job! You know too much about Guy Fieri!',
    'images/guyWeird.jpeg'
  ];

  const good = [
    'Pretty odd that you know this much.',
    'images/guySpace.jpg',
    '..but its up to you to decide.'
  ];

  const bad = [
    'I mean, weird or no?',
    'images/guyGood.jpg'
    
  ];

  if (totalScore >= 8) {
    array = great;
  } else if (totalScore < 8 && totalScore >= 5) {
    array = good;
  } else {
    array = bad;
  }
  return $('.finalBox').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${totalScore} / 10</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`,
      $('.questionNum').hide())
      $('.score').hide()

  
};
function restartQuiz() {
  $('.bigBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuizBox').show();
    $('.questionNum').show()
  })}

function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
  }

  makeQuiz()
  
  
