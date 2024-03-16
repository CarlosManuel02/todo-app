import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

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
    public router: Router,
    public message: NzMessageService
  ) {
  }

  login() {

    this.loading = true;
    const {email, password, remember} = this.loginForm.value;
    if (email != null && password != null) {
      this.authService.login(email, password)
        .subscribe(resp => {
          if (resp.status == 200) {
            this.loading = false;
            this.message.success('Login successful');
            this.router.navigateByUrl('/todos/dashboard');
          } else {
            this.loading = false;
            this.message.error(resp.message);
          }
        }, (e) => {
          console.log(e)

        })
    }

  }

  ngOnInit(): void {
    localStorage.getItem('remember') && this.loginForm.patchValue({
      email: localStorage.getItem('email'), remember: true
    })

    this.loginForm.reset({
      email: "carlos@example.com",
      password: "12345678",
    })
  }

}
