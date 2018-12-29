import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    email = '';
    password = '';
    returnUrl: string;
    loading = false;
    submitted = false;
   
    resetPassword = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
            if (this.authService.isUserEmailLoggedIn) {
                this.router.navigate(['/home'])
            }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSignUp() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) 
            return;
        
        this.loading = true;      
        this.authService.signUpWithEmail(this.f.email.value as string, this.f.password.value as string)
            .then(() => {
                this.router.navigate(['/']);
            }).catch(_error => {
                this.alertService.error(_error);
                this.loading = false;
            })
    }
}
