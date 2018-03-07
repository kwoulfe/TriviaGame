var questions = [
  {
    question: "What was Kramer's first name?",
    choices: ['Connie', 'Cosmo', 'Kenny', 'Mulva'],
    answer: 1
  },
  {
    question:
      'What was the name of the male support garment that Kramer created for Frank Costanza?',
    choices: ['The Manzier', 'Spankys', 'The Bro', 'The Cup'],
    answer: 0
  },
  {
    question: 'Who supplied the voice for Yankees boss George Steinbrenner?',
    choices: [
      'George Steinbrenner',
      'Larry David',
      'Jerry Seinfeld',
      'Jason Alexander'
    ],
    answer: 1
  },
  {
    question:
      "Which New York Met was 'second spitter' in the 'JFK' parody sequence featuring Keith Hernandez?",
    choices: ['Mookie Wilson', 'Jesse Orosco', 'Roger McDowell', 'Gary Carter'],
    answer: 2
  },
  {
    question: 'WWhat was the name of the coffee shop where the gang hung out?',
    choices: ['The Big Salad', "Tom's Diner", "Monk's", "Poppy's"],
    answer: 2
  },
  {
    question: 'What was the name of the wealthy man who employed Elaine?',
    choices: ['Mr. Pitt', 'Mr. Peters', 'Mr. Park', 'Mr. Pink'],
    answer: 0
  },
  {
    question:
      'What embarrassment did George endure when he visited The Hamptons?',
    choices: [
      'He double dipped his chips at a fancy party',
      "He didn't bring enough money to dinner",
      "His car had a smell that he couldn't get rid of",
      'Shrinkage'
    ],
    answer: 3
  },
  {
    question: "What was the name of Jerry's annoying uncle?",
    choices: ['Marty', 'Jack', 'Leo', 'Phil'],
    answer: 2
  },
  {
    question: 'In the series finale, the main cast members',
    choices: [
      'fight and vow to never speak again.',
      'end up in jail.',
      'move to Singapore.',
      'all die.'
    ],
    answer: 1
  }
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {
  console.log('ready!');

  $('.container').hide();

  $('.btn').on('click', function() {
    timer();
    $('.container').show();
  });

  displayCurrentQuestion();
  $(this)
    .find('.result')
    .hide();
  $(this)
    .find('.nextButton')
    .on('click', function() {
      if (!quizOver) {
        value = $("input[type='radio']:checked").val();
        if (value == undefined) {
          $(document)
            .find('.result')
            .text('Pick an answer dummy!');
          $(document)
            .find('.result')
            .show();
        } else {
          $(document)
            .find('.result')
            .hide();
          if (value == questions[currentQuestion].answer) {
            alert('Correct');
            correctAnswers++;
          }

          // Trying to alert player the correct answer

          if (value != questions[currentQuestion].answer) {
            alert(
              'Wrong! The correct answer is ' +
                questions[currentQuestion].answer
            );
          }
          currentQuestion++;
          if (currentQuestion < questions.length) {
            displayCurrentQuestion();
          } else {
            showScore();
            $(document)
              .find('.nextButton')
              .text('Try Again?');
            quizOver = true;
            $(document)
              .find('.timer-div')
              .hide();
          }
        }
      } else {
        quizOver = false;
        $(document)
          .find('.nextButton')
          .text('Next Question');
        reset();
        displayCurrentQuestion();
        hideScore();
      }
    });
});

function displayCurrentQuestion() {
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find('.container > .quizQuestion');
  var quizChoices = $(document).find('.container > .quizChoices');
  var answerList = questions[currentQuestion].choices.length;
  $(questionClass).text(question);
  $(quizChoices)
    .find('li')
    .remove();
  var choice;
  for (i = 0; i < answerList; i++) {
    choice = questions[currentQuestion].choices[i];
    $(
      '<li><input type="radio" value=' +
        i +
        ' name="dynradio" /> ' +
        choice +
        '</li>'
    ).appendTo(quizChoices);
  }
}

function timer() {
  time = 60;
  intervalId = setInterval(count, 1000);
  console.log(intervalId);
}

function count() {
  time--;
  $('.timer-div').text('Time Remaining ' + time);
  if (time < 0) {
    $('.timer-div').text('Time Up!');
    $(document)
      .find('.nextButton')
      .text('Try Again?');
    $(document)
      .find('.quizChoices')
      .hide();
    $(document)
      .find('.quizQuestion')
      .hide();
  }
}

function reset() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
  $(document)
    .find('.timer-div')
    .show();
}

function hideScore() {
  $(document)
    .find('.score')
    .hide();
}

function showScore() {
  $(document)
    .find('.container > .score')
    .text(correctAnswers + ' out of ' + questions.length);
  $(document)
    .find('.container > .score')
    .show();
}
