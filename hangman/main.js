var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var newWord = '';
var over = false;
var strikes = 0;
var bodyParts = ["hangHead", "hangLArm", "hangBody", "hangRArm", "hangLLeg", "hangRLeg"];
var version = "0.0.5 Typist";
var guessedArray = [];

function buildLetters() {
  for (var j = 0; j < 13; j++) {
    document.getElementById("AL").innerHTML += "<td id=\'" + alphabet[j] + "\'> " + alphabet[j] + "</td>";
  }
  for (j = 13; j < 26; j++) {
    document.getElementById("MZ").innerHTML += "<td id=\'" + alphabet[j] + "\'> " + alphabet[j] + "</td>";
  }
  for (var i = 0; i < 26; i++) {
    document.getElementById(alphabet[i]).setAttribute("onclick", "guess(\"" + alphabet[i] + "\")");
  }
}

function getWord() {
  var x = (1 + Math.floor(Math.random() * (wordList.length - 1)));
  newWord = wordList[x].toUpperCase();
  for (i = 0; i < newWord.length; i++) {
    if (alphabet.includes(newWord[i])) {
      document.getElementById("word").innerHTML += "<td id=\'" +
        i + "\' class=\'hiddenLetter\'>" + newWord[i].toUpperCase() + "</td>";
    } else {
      document.getElementById("word").innerHTML += "<td class=\'hiddenPunc\'>" + newWord[i] + "</td>";
    }
  }
}

function guess(letter) {
  if (!guessedArray.includes(letter)) {
    var guessed = [];
    var gotOne = false;
    for (i = 0; i < newWord.length; i++) {
      if (letter === newWord[i]) {
        document.getElementById(i).setAttribute("style", "color:black;");
        gotOne = true;
      }
    }
    if (!gotOne) {
      document.getElementById(bodyParts[strikes]).setAttribute("style", "color:black;");
      strikes += 1;
    }
    for (j = 0; j < newWord.length; j++) {
      if (!document.getElementById(j).hasAttribute("style")) {
        guessed.push(false);
      }
    }
    if (guessed.length === 0) {
      document.getElementById("winButton").setAttribute("style", "visibility: visible;");
      document.getElementById("AL").setAttribute("style", "visibility:hidden;");
      document.getElementById("MZ").setAttribute("style", "visibility:hidden;");
      over = true;
    }
    if (strikes === 6) {
      youLose();
      over = true;
    }
  }
  guessedArray.push(letter);
  for (i = 0; i < guessedArray.length; i++) {
    document.getElementById(guessedArray[i]).setAttribute("style", "opacity:0;");
    document.getElementById(guessedArray[i]).setAttribute("onclick", "");
  }

}


function winner() {
  document.getElementById("word").innerHTML = "";
  document.getElementById("AL").innerHTML = "";
  document.getElementById("MZ").innerHTML = "";
  buildLetters();
  getWord();
  document.getElementById("winButton").setAttribute("style", "visibility:hidden;");
  document.getElementById("loseButton").setAttribute("style", "visibility:hidden;");
  document.getElementById("AL").setAttribute("style", "visibility:visible;");
  document.getElementById("MZ").setAttribute("style", "visibility:visible;");
  strikes = 0;
  for (i = 0; i < bodyParts.length; i++) {
    document.getElementById(bodyParts[i]).setAttribute("style", "color:white;");
  }
  guessedArray = [];
  over = false;
}

document.addEventListener("DOMContentLoaded", function() {
  buildLetters();
  getWord();
});

function youLose() {
  for (j = 0; j < newWord.length; j++) {
    if (!document.getElementById(j).hasAttribute("style")) {
      document.getElementById(j).setAttribute("style", "color:red;");
    }
  }
  document.getElementById("loseButton").setAttribute("style", "visibility: visible;");
  document.getElementById("AL").setAttribute("style", "visibility:hidden;");
  document.getElementById("MZ").setAttribute("style", "visibility:hidden;");
}

window.addEventListener("keypress", keyListen, false);

function keyListen(e) {
  if (!over) {
    guess(e.key.toUpperCase());
  } else {
    if (e.code == "Space") {
      winner();
    }
  }
}
