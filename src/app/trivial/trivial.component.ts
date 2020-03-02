import { Component, OnInit } from '@angular/core';
import {TrivialService} from '../servicies/trivial/trivial.service';
import {QuestionApi} from '../models/question.api';
import {QuestionShuffled} from '../models/question.shuffled';
import {ServoService} from '../servicies/servo/servo.service';

declare function modalFunction(idModal, func) : any;

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.css']
})
export class TrivialComponent implements OnInit
{
  public questions = Array<QuestionApi>();
  public selectedQuestion: QuestionShuffled;

  selectedRandomQuestionIndex = -1;

  constructor(private trivialService: TrivialService, private servoService: ServoService) { }

  ngOnInit(): void
  {
    this.trivialService.getQuestions().subscribe(
      next =>{
        console.log(next);
        this.questions = next;
        console.log(this.questions[0]);
        this.selectRandomQuestion();
      },
      error => {
        console.log(error);
      }
    );
  }

  selectRandomQuestion()
  {
    this.selectedRandomQuestionIndex = Math.floor(Math.random() * (this.questions.length));
    let randomQuestion: QuestionApi = this.questions[this.selectedRandomQuestionIndex];
    this.selectedQuestion = new QuestionShuffled(randomQuestion.question, new Array<string>(randomQuestion.correct_answer, randomQuestion.incorrect_answers[0], randomQuestion.incorrect_answers[1], randomQuestion.incorrect_answers[2]));

  }

  checkQuestion(answerText: string){
    let modalTitle = '';
    let modalBody = '';
    if (this.selectedQuestion.checkCorrectAnswer(this.questions[this.selectedRandomQuestionIndex], answerText)){
      modalTitle = 'Correcto!';
      modalBody = 'Recoge la recompensa de la caja';
      (<HTMLInputElement>document.getElementById('generateNewQuestionButton')).disabled = true;
      this.servoService.moveServo().subscribe(
        next=>{
          console.log(next);
          (<HTMLInputElement>document.getElementById('generateNewQuestionButton')).disabled = false;
        },
        error => {
          console.log(error);
          (<HTMLInputElement>document.getElementById('generateNewQuestionButton')).disabled = false;
        }
      );
    }
    else {
      modalTitle = 'Incorrecto';
      modalBody = 'Inténtalo de nuevo';
    }
    document.getElementById('nextQuestionModalLongTitle').textContent = modalTitle;
    document.getElementById('nextQuestionModalBody').textContent = modalBody;
    modalFunction('nextQuestionModal', 'show')
  }

  generateNewQuestion()
  {
    this.selectRandomQuestion();
    modalFunction('nextQuestionModal', 'hide');
  }

}
