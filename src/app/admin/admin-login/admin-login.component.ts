import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm : FormGroup; 
  constructor(private fb: FormBuilder,
    private auth : AuthService,
    private router: Router) { 
      this.loginForm = this.fb.group ({});
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  public  loginSubmit(){
    if (this.loginForm.invalid) {
      return;
    }
      const value = this.loginForm.value;
      this.auth.adminSignIn(value).subscribe({next: auth => {
        if(!auth){
          return;
        } else {
          this.auth.adMinIsLogged(auth);
          this.router.navigateByUrl('/admin');
        }
        },error :err => {
          if( err.status === 401){
            this.loginForm.get('email')?.setErrors({'email': true});
            this.loginForm.get('email')?.markAsTouched();
            this.loginForm.get('password')?.setErrors({'password': true});
            this.loginForm.get('password')?.markAsTouched();
          } else if (err.status === 500) {
              alert('Nous avons rencontré un problème serveur')
          }
        }
      })
      ;
  }

}
