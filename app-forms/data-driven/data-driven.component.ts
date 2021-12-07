import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable, Subscription, of } from "rxjs";

@Component({
  selector: 'data-driven',
  templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent implements OnDestroy {
  myForm: FormGroup;
  hobbiesArray: FormArray;
  genders: string[] = [
    'male',
    'female'
  ];
  private subscription: Subscription | undefined;
  constructor(private formBuilder: FormBuilder) {
    // this.myForm = new FormGroup({
    //   'userData': new FormGroup({
    //     'username': new FormControl('Asaad', Validators.required),
    //     'email': new FormControl('', [
    //       Validators.required,
    //       Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    //     ])
    //   }),
    //   'password': new FormControl('', Validators.required),
    //   'gender': new FormControl('male'),
    //   'hobbies': new FormArray([
    //     new FormControl('Cooking', Validators.required)
    //   ])
    // });

    this.myForm = formBuilder.group({
      'username': ['', Validators.compose([Validators.required, this.notAsaadValidator])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],,
      'password': ['', Validators.required],
      'gender': ['male'],
      'hobbies': formBuilder.array([
        ['Cooking', null, this.asyncValidator.bind(this)] // default value, sync validators, async validators
      ])
    });
    this.hobbiesArray = this.myForm.get('hobbies') as FormArray;

    this.subscription = this.myForm?.get('username')?.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onAddHobby() {
    (<FormArray>this.myForm.controls['hobbies']).push(new FormControl('')));
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  notAsaadValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === 'Example') {
      return { example: true };
    }
    return null;
  }

  asyncValidator(control: FormControl): Promise<any> | Observable<any> {
       if (control.value === 'asaadsaad') {
      return of({ example: true });
    }
    return of(null);
  }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
