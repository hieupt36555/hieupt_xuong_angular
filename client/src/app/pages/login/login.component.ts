import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginRes } from '../../../types/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),]),
  });

  handleSubmit() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', (data as UserLoginRes).token);
        localStorage.setItem('userId', (data as UserLoginRes).user._id);

        
          Swal.fire({
            title: "Success!",
            text: "Dang Ky Thanh Cong.",
            icon: "success",
            showConfirmButton: false,
            timer: 1100
          });
          this.router.navigate(['/'])
       
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
}
