import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultQuestion = 'pet';
  questionAnswer = '';
  genders = ['male', 'female'];
  startingGender = 'male';


  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpForm.setValue({
      userData: {
        username: 'Kayson',
        email: '',
      },
      secret: '',
      questionAnswer: '',
      gender: '',
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  onSubmit() {
    console.log(this.signUpForm);
  }
}
