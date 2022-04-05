import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup; 

  constructor(
    private fb: FormBuilder,
    private auth : AuthService,
    private router: Router
    ) { 
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
      this.auth.signIn(value).subscribe({next: auth => {
        if(!auth){
          return;
        } else {
          // si tout est ok j'apelle la fonction pour stocker les valeurs dans le service auth
          this.auth.isLogged(auth);
          this.router.navigateByUrl('/');
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
