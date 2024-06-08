import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { UserLoginRes } from '../../../types/User';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email] ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    // console.log(this.loginForm.value);

    this.authService.register(this.loginForm.value).subscribe({
      next: () => {
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
        Swal.fire({
          title: "Dang Ky Thai Bai",
          text: error.message,
          icon: "error"
        });
      },
    });
  }
}
