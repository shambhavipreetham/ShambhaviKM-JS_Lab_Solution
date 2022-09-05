function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
  }

  Quiz.prototype.CheckOptionWithAnswer = function(answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
  }

  Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
  }

  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
  }

  function loadQuestions() {
    if(quiz.isEnded()) {
        displayScores();
    }
    else {
        // Display Question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        // Display Options
        var choices = quiz.getQuestionByIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("Button" + i, choices[i]);
        }

        showProgress();
    }
  };

  function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
  };

  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };

  function displayScores() {
    var quizOverHTML = "<h1>Result</h1>";
    quizOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";
    var element = document.getElementById("Quiz");
    element.innerHTML = quizOverHTML;
  };

  // Creating questions here
  var questions = [
    new Question("Javascript is --------- language", ["Object-Oriented", "Object-Based","Procedural", "None of the above"], "Object-Oriented"),
    new Question("Which of the following keywords is used to define a variable in Javascript?", ["var", "let", "Both var and let", "None of the above"], "Both var and let"),
    new Question("Upon encountering empty statements, what does the Javascript Interpreter do?", ["Throws an error", "Ignores the statement","Gives a warning", "None of the above"], "Ignores the statement"),
    new Question("How can a datatype be declared to be a constant type?", ["const", "var", "let", "constant"], "const"),
    new Question("What keyword is used to check whether a given property is valid or not? ", ["in", "is in", "exists", "lies"], "in")
  ];

  // Create Quiz
  var quiz = new Quiz(questions);
  
  // Display Quiz
  loadQuestions();