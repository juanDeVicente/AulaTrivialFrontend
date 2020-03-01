import {QuestionApi} from './question.api';

export class QuestionShuffled {
  constructor(public question: string, public answers: Array<string>) {
    this.shuffle();
  }
  shuffle() {
    let currentIndex = this.answers.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.answers[currentIndex];
      this.answers[currentIndex] = this.answers[randomIndex];
      this.answers[randomIndex] = temporaryValue;
    }
  }
  checkCorrectAnswer(question: QuestionApi, answer: string)
  {
    return question.correct_answer == answer;
  }
}
