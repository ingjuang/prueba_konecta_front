import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { TwoFactorAuthenticationService } from '../../../auth/services/two-factor-authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomepageComponent {

  private authService = inject(AuthService);
  private TFAService = inject(TwoFactorAuthenticationService);

  public haveTFA = computed(()=>this.TFAService.haveTFA());
  public isTFA = computed(()=>this.TFAService.isTFA());
  public user = computed(()=>this.authService.currentUser());
  public qrCode = computed(()=>this.TFAService.qrCode());

  public onLogout(){
    this.authService.logout();
  }

  public activateMFA(){
    const userName = this.user()?.userName
    if(userName){
      this.TFAService.getQRCode(userName).subscribe({
        next: () => {
          console.log(this.qrCode());
        },
        error: ()=> {Swal.fire('Error', 'Error al generar Qr, por favor intente de nuevo', 'error')}
      });
    }

  }
}
