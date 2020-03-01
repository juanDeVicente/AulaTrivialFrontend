export class QuestionApi {
  public constructor(public category: string, public type: string, public question: string, public correct_answer: string, public incorrect_answers: Array<string>) {
  }
}
