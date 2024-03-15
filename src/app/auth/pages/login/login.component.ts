import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [false]
  })

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
  }

  login() {

    this.loading = true;
    const {email, password, remember} = this.loginForm.value;
    if (email != null && password != null) {
      this.authService.login(email, password)
        .subscribe(resp => {
          if (resp) {
            this.loading = false;
            this.router.navigateByUrl('/dashboard');
          }
        })
    }

  }

  ngOnInit(): void {
    localStorage.getItem('remember') && this.loginForm.patchValue({
      email: localStorage.getItem('email'), remember: true
    })
  }

}
