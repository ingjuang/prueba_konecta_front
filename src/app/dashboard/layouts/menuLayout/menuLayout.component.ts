import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, OnInit, inject, computed } from '@angular/core';
import { SideBarMenuItemComponent } from "../../components/sideBarMenuItem/sideBarMenuItem.component";
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../auth/services/auth.service';
import { TwoFactorAuthenticationService } from '../../../auth/services/two-factor-authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SideBarMenuItemComponent,
    ButtonModule
],
  templateUrl: './menuLayout.component.html',
  styleUrl: './menuLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLayoutComponent implements OnInit {
  @Output() optionClicked = new EventEmitter<string>()
  private authService = inject(AuthService);
  private TFAService = inject(TwoFactorAuthenticationService);

  public haveTFA = computed(()=>this.TFAService.haveTFA());
  public isTFA = computed(()=>this.TFAService.isTFA());
  public user = computed(()=>this.authService.currentUser());
  public qrCode = computed(()=>this.TFAService.qrCode());

  public routes = [
    {
      path: '/home',
      data: {
        icon: 'home',
        title: 'Inicio',
        description: ''
      }
    },
    {
      path: '/home/users',
      data:{
        icon: 'group',
        title: 'Usuarios',
        description: ''
      }
    }
  ]


  ngOnInit(): void {
    console.log(routes);

  }
  optionClick(option: string){
    this.optionClicked.emit(option);
  }
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
