import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = '';
  password = '';
  returnUrl: string;
  loading = false;
  submitted = false;
 
  constructor(public authService: AuthenticationService, 
                private formBuilder: FormBuilder, 
                private alertService: AlertService, 
                private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
     });

        // reset login status
        this.authService.signOut();
   

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    }

      // convenience getter for easy access to form fields
      get f() { return this.loginForm.controls; }


   onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) 
            return;
        
        this.loading = true;      
        this.authService.loginWithEmail(this.f.email.value as string, this.f.password.value as string)
            .then(() => {
                 this.router.navigate([this.returnUrl]);
            }).catch(_error => {
                this.alertService.error(_error);
                this.loading = false;
            })
    }
  
}
