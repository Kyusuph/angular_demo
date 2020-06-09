import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static forbiddenNames = ['John', 'Peter'];
  static forbiddenEmail = 'kaysonyusuph@gmail.com';
  genders = ['male', 'female'];
  signUpForm: FormGroup;

  static checkForbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (AppComponent.forbiddenNames.includes(control.value)) {
      return { forbiddenName: true };
    }
    return null;
  }

  static checkForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (AppComponent.forbiddenEmail === control.value) {
          resolve({ forbiddenEmail: true });
        }
        resolve(null);
      }, 3000);
    });
    return promise;
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, AppComponent.checkForbiddenNames]),
        email: new FormControl(null, [Validators.required, Validators.email], AppComponent.checkForbiddenEmail)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([new FormControl(null, Validators.required)]),
      professionals: new FormArray([new FormControl(null, Validators.required)]),
    });
    this.signUpForm.get('userData.email').statusChanges.subscribe(status => console.log({status}));
    this.signUpForm.setValue({
      userData: {
        username: 'John',
        email: 'kaysonyusuph@gmail.com',
      },
      gender: 'female',
      hobbies: ['Cooking'],
      professionals: ['Zoologist']
    });
    this.signUpForm.patchValue({
      userData: {
        username: 'Gift',
        email: 'giftLazaro@gmail.com'
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({
      gender: 'male'
    });
  }

  generateFormField(value: string) {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get(value) as FormArray).push(control);
  }
}
