import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([new FormControl(null, Validators.required)]),
      professionals: new FormArray([new FormControl(null, Validators.required)]),
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  generateFormField(value: string) {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get(value) as FormArray).push(control);
  }
}
