type WordList = string[];

interface TypeState {
  wordsToShow: WordList;
  corrects: number;
  currentIndex: number;
}

class TypingTest {
  words: WordList;
  state: TypeState;
  text: HTMLElement;
  input: HTMLInputElement;
  timerElement: HTMLElement;
  remainingTime: number;
  timerInterval: number | undefined;

  constructor(
    words: WordList,
    state: TypeState,
    text: HTMLElement,
    input: HTMLInputElement,
    timerElement: HTMLElement,
  ) {
    this.words = words;
    this.state = state;
    this.text = text;
    this.input = input;
    this.timerElement = timerElement;
    this.remainingTime = 30;
  }

  initialize() {
    this.input.addEventListener("keydown", (event) => {
      if ((event.key === " ") && (this.input.value.trim() !== "")) {
        this.checkWords();
        if (this.timerInterval === undefined) {
          this.startTimer();
        }
      }
    });
    this.generateWords();
    this.updateTimerDisplay();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      this.updateTimerDisplay();
      if (this.remainingTime <= 0) {
        this.endTest();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.timerElement.innerText = `Time remaining: ${this.remainingTime}s`;
  }

  generateWords() {
    this.state.wordsToShow = [];
    this.state.currentIndex = 0;

    for (let i = 0; i < 12; i++) {
      this.state.wordsToShow.push(this.words[Math.floor(Math.random() * this.words.length)]);
    }
    this.text.innerHTML = this.state.wordsToShow
    .map((word, index) => `<span id="word-${index}">${word}</span>`)
    .join(" ");

    this.highlightWords();
  }

  checkWords() {
    let userWord = this.input.value.trim();
    
    let currentSpan = document.getElementById(`word-${this.state.currentIndex}`);

    if (userWord === this.state.wordsToShow[this.state.currentIndex]) {
      this.state.corrects++;
      this.input.value = "";
      if(currentSpan){
        currentSpan.className ="correct";
        currentSpan.style.color = "green";
      }
      this.state.currentIndex++;
    } else {
      this.input.value = "";
      if(currentSpan){
        currentSpan.className ="wrong";
        currentSpan.style.color = "red";
      }
      this.state.currentIndex++;
    }

    this.highlightWords();

    if (this.state.wordsToShow.length === this.state.currentIndex) {
      this.generateWords();
    }
  }

  highlightWords() {

    const previousSpan = document.querySelector(".highlight");
    if (previousSpan) {
      previousSpan.classList.remove("highlight");
    }

    const currentSpan = document.getElementById(`word-${this.state.currentIndex}`);
    if (currentSpan) {
      currentSpan.classList.add("highlight");
    }


  }

  endTest() {
    clearInterval(this.timerInterval);
    this.input.disabled = true;
    this.input.value = "";
    alert(`Time's up! You typed ${this.state.corrects} words correctly.`);
  }
}

const text = document.getElementById("text") as HTMLElement;
const input = document.getElementById("input") as HTMLInputElement;
const timerElement = document.getElementById("timer") as HTMLElement;

const initialState: TypeState = {
  wordsToShow: [],
  corrects: 0,
  currentIndex: 0,
};

const words: WordList = [
  "hello", "car", "apple",
  "bye", "there", "hi",
  "small", "with", "on",
  "orange", "different", "place",
  "father", "need", "head",
  "follow", "out", "animal",
  "show", "children", "should",
  "what", "water", "operation", "good",
];

const typingTest = new TypingTest(words, initialState, text, input, timerElement);
typingTest.initialize();
