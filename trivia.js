$(document).ready(function() {
  $("#start").on("click", trivia.startGame);
  $(document).on("click", ".option", trivia.guessChecker);
  var audio = new Audio("LiveItUp.mp3");
});

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  questions: {
    Q1: "The soccer World Cup takes place how often?",
    Q2: "Which country both hosted and won the very first World Cup, in 1930?",
    Q3: "How many teams took part in the main draw of the 2010 World Cup?",
    Q4:
      "The tournament was hosted exclusively by countries in either Europe or the Americas until 2002. Which two Asian countries co-hosted the event in that year?",
    Q5: "Which country has won the most FIFA World Cups?",
    Q6:
      "Which two countries have reached the final of the football World Cup the most number of times?",
    Q7:
      "Which is the only country to have reached three finals without winning any?",
    Q8:
      "Which player has scored the most number of goals at the FIFA World Cup?",
    Q9:
      "What percentage of the world's population watched the 2018 World Cup Final?",
    Q10: "Who is the youngest goalscorer at the World Cup?"
  },
  options: {
    Q1: [
      "Every four years",
      "Every two years",
      "Every year",
      "every six years"
    ],
    Q2: ["USA", "Brazil", "Uruguay", "England"],
    Q3: ["8", "16", "32", "64"],
    Q4: [
      "Iran and Iraq",
      "South Korea and Japan",
      "Qatar and China",
      "Vietman and Thailand"
    ],
    Q5: ["Brazil", "Italy", "Spain", "Argentina"],
    Q6: ["Brail, Italy", "Spain, Brazil", "Germany, Brazil", "Italy, Germany"],
    Q7: ["Spain", "England", "Netherlands", "France"],
    Q8: ["Pele", "Ronaldo", "Klose", "Zidane"],
    Q9: ["80%", "30%", "50%", "60%"],
    Q10: ["Maradona", "Pele", "Messi", "Owen"]
  },
  answers: {
    Q1: "Every four years",
    Q2: "Uruguay",
    Q3: "32",
    Q4: "South Korea and Japan",
    Q5: "Brazil",
    Q6: "Germany, Brazil",
    Q7: "Netherlands",
    Q8: "Klose",
    Q9: "50%",
    Q10: "Pele"
  },

  startGame: function() {
    foo(bar.foobar);
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $("#game").show();

    $("#results").html("");

    $("#timer").text(trivia.timer);

    $("#start").hide();

    $("#remaining-time").show();

    trivia.nextQuestion();
  },
  // method to loop through and display questions and options
  nextQuestion: function() {
    // set timer to 20 seconds each question
    trivia.timer = 10;
    //    $("#timer").removeClass("last-seconds");
    $("#timer").text(trivia.timer);

    // to prevent timer speed up
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, value) {
      $("#options").append(
        $('<button class="option btn btn-info btn-lg">' + value + "</button>")
      );
    });
  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning: function() {
    // if timer still has time left and there are still questions left to ask
    if (
      trivia.timer > -1 &&
      trivia.currentSet < Object.keys(trivia.questions).length
    ) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      //if (trivia.timer === 4) {
      //$("#timer").addClass("last-seconds");
      //}
    }
    // the time has run out and increment unanswered, run result
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html(
        "<h3>Out of time! The answer is " +
          Object.values(trivia.answers)[trivia.currentSet] +
          "</h3>"
      );
    }
    // if all the questions have been shown end the game, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      // adds results of game (correct, incorrect, unanswered) to the page
      $("#results").html(
        "<h3>Thank you for playing!</h3>" +
          "<p>Correct: " +
          trivia.correct +
          "</p>" +
          "<p>Incorrect: " +
          trivia.incorrect +
          "</p>" +
          "<p>Unaswered: " +
          trivia.unanswered +
          "</p>" +
          "<p>Please play again!</p>"
      );

      // hide game sction
      $("#game").hide();

      // show start button to begin a new game
      $("#start").show();
    }
  },
  // method to evaluate the option clicked
  guessChecker: function() {
    // timer ID for gameResult setTimeout
    var resultId;
    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if the text of the option picked matches the answer of the current question, increment correct
    if ($(this).text() === currentAnswer) {
      // turn button green for correct
      $(this)
        .addClass("btn-success")
        .removeClass("btn-info");

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h3>Correct Answer!</h3>");
    }
    // else the user picked the wrong option, increment incorrect
    else {
      // turn button clicked red for incorrect
      $(this)
        .addClass("btn-danger")
        .removeClass("btn-info");

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html(
        "<h3>Wrong!Correct answer is " + currentAnswer + "</h3>"
      );
    }
  },
  // method to remove previous question results and options
  guessResult: function() {
    // increment to next question set
    trivia.currentSet++;

    // remove the options and results
    $(".option").remove();
    $("#results h3").remove();

    // begin next question
    trivia.nextQuestion();
  }
};

function foo(number) {
  console.log("hi" + number);
}

var foofoo = 2;

var bar = {
  foobar: 1,
  barfoo: function() {
    console.log("bye" + foofoo);
  }
};
