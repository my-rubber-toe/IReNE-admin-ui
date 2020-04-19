import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { ForbiddenUsernameValidator } from "src/app/shared/forbiddenUsername.directive"
import { ForbiddenPasswordValidator } from "src/app/shared/forbiddenPassword.directive"
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  incorrectFields = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
          Validators.required,
          ForbiddenUsernameValidator()
        ]),
      password: new FormControl('', [
          Validators.required,
          ForbiddenPasswordValidator()
        ])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/collaborators';
  }

  // Run login if user pressed enter on form
  keyDownLogin(e: KeyboardEvent){
    if(e.keyCode == 13){
      this.login()
    }
  }

  login(){
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(first())
        .subscribe(
          data => {
            // Simulate long request
            setTimeout(() => {
              this.router.navigate([this.returnUrl]);
            }, 1500);
          },
          error => {
            this.loading = false
            this.incorrectFields = true;
            //this.loginForm.reset()
            throw error;
          });
  }
  
  toDashboard() {
    this.router.navigate(['/']);

  }

}
