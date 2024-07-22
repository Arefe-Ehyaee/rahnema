var TypingTest = /** @class */ (function () {
    function TypingTest(words, state, text, input, timerElement) {
        this.words = words;
        this.state = state;
        this.text = text;
        this.input = input;
        this.timerElement = timerElement;
        this.remainingTime = 30;
    }
    TypingTest.prototype.initialize = function () {
        var _this = this;
        this.input.addEventListener("keydown", function (event) {
            if ((event.key === " ") && (_this.input.value.trim() !== "")) {
                _this.checkWords();
                if (_this.timerInterval === undefined) {
                    _this.startTimer();
                }
            }
        });
        this.generateWords();
        this.updateTimerDisplay();
    };
    TypingTest.prototype.startTimer = function () {
        var _this = this;
        this.timerInterval = setInterval(function () {
            _this.remainingTime--;
            _this.updateTimerDisplay();
            if (_this.remainingTime <= 0) {
                _this.endTest();
            }
        }, 1000);
    };
    TypingTest.prototype.updateTimerDisplay = function () {
        this.timerElement.innerText = "Time remaining: ".concat(this.remainingTime, "s");
    };
    TypingTest.prototype.generateWords = function () {
        this.state.wordsToShow = [];
        this.state.currentIndex = 0;
        for (var i = 0; i < 12; i++) {
            this.state.wordsToShow.push(this.words[Math.floor(Math.random() * this.words.length)]);
        }
        this.text.innerHTML = this.state.wordsToShow
            .map(function (word, index) { return "<span id=\"word-".concat(index, "\">").concat(word, "</span>"); })
            .join(" ");
        this.highlightWords();
    };
    TypingTest.prototype.checkWords = function () {
        var userWord = this.input.value.trim();
        var currentSpan = document.getElementById("word-".concat(this.state.currentIndex));
        if (userWord === this.state.wordsToShow[this.state.currentIndex]) {
            this.state.corrects++;
            this.input.value = "";
            if (currentSpan) {
                currentSpan.className = "correct";
                currentSpan.style.color = "green";
            }
            this.state.currentIndex++;
        }
        else {
            this.input.value = "";
            if (currentSpan) {
                currentSpan.className = "wrong";
                currentSpan.style.color = "red";
            }
            this.state.currentIndex++;
        }
        this.highlightWords();
        if (this.state.wordsToShow.length === this.state.currentIndex) {
            this.generateWords();
        }
    };
    TypingTest.prototype.highlightWords = function () {
        var previousSpan = document.querySelector(".highlight");
        if (previousSpan) {
            previousSpan.classList.remove("highlight");
        }
        var currentSpan = document.getElementById("word-".concat(this.state.currentIndex));
        if (currentSpan) {
            currentSpan.classList.add("highlight");
        }
    };
    TypingTest.prototype.endTest = function () {
        clearInterval(this.timerInterval);
        this.input.disabled = true;
        this.input.value = "";
        alert("Time's up! You typed ".concat(this.state.corrects, " words correctly."));
    };
    return TypingTest;
}());
var text = document.getElementById("text");
var input = document.getElementById("input");
var timerElement = document.getElementById("timer");
var initialState = {
    wordsToShow: [],
    corrects: 0,
    currentIndex: 0,
};
var words = [
    "hello", "car", "apple",
    "bye", "there", "hi",
    "small", "with", "on",
    "orange", "different", "place",
    "father", "need", "head",
    "follow", "out", "animal",
    "show", "children", "should",
    "what", "water", "operation", "good",
];
var typingTest = new TypingTest(words, initialState, text, input, timerElement);
typingTest.initialize();
