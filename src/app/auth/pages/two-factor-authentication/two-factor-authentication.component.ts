import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TwoFactorAuthenticationService } from '../../services/two-factor-authentication.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-two-factor-authentication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './two-factor-authentication.component.html',
  styleUrl: './two-factor-authentication.component.css'
})
export class TwoFactorAuthenticationComponent implements OnInit{

  private fb = inject(FormBuilder);

  private TFAService = inject(TwoFactorAuthenticationService);
  private authService = inject(AuthService);
  private route = inject(Router);

  public qrCode = signal<string>('');
  public user = computed(()=>this.authService.currentUser());
  public isTFA = computed(()=>this.TFAService.isTFA());
  public haveTFA = computed(()=>this.TFAService.haveTFA());

  public myForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  })

  ngOnInit(): void {
    this.checkTFA();
  }

  checkTFA(){
    const userName = this.user()?.userName;
    if(userName){
      this.TFAService.HaveTFA(userName).subscribe({
        next: () =>{
          console.log(this.haveTFA());

          if(this.isTFA()){
            this.TFAService.checkTFA(userName);
          }else{
            this.route.navigateByUrl('/home');
          }
        }
      })
    }
  }

  validateCode(){
    const userName = this.user()?.userName;
    const {code} = this.myForm.getRawValue()
    console.log({userName, code});

    if(userName && code){
      this.TFAService.validateCode(userName, code).subscribe({
        next: (res)=>{
          if(res === true){
            this.route.navigateByUrl('/home');
          }else{
            Swal.fire('Error', 'Código incorrecto, por favor valide de nuevo', 'error');
          }
        }
      })
    }
  }


}
