import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
  }

  register() {
    this.loading = true;
    const {username, email, password} = this.registerForm.value;
    if (username && email && password) {
      this.authService.register(username, email, password).subscribe((res) => {
        this.loading = false;
        if (res) {
          this.router.navigate(['/login']);
        }
      }, (error) => {
        this.loading = false;
      });
    }

  }

  ngOnInit(): void {
  }
}
