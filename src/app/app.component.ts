import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalService } from './presentation/services/modal.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicDialogModule, ConfirmDialogModule, ToastModule],
  providers: [DialogService, ModalService, ConfirmationService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private primeConfig = inject(PrimeNGConfig);
  public authStatus = computed(() => this.authService.authStatus());
  public finishedAuthCheck = computed<boolean>(() => {
    return this.authStatus() !== AuthStatus.checking;
  });

  ngOnInit(): void {
    this.setPrimeNGConfig();
    this.handleAuthStatusChanged();
  }

  private handleAuthStatusChanged(): void {
    const status = this.authStatus();

    switch (status) {
      case AuthStatus.checking:
        return;

      case AuthStatus.autheticated:
        this.router.navigateByUrl('auth/tfa-authentication');
        return;

      case AuthStatus.noAuthenticated:
        this.router.navigateByUrl('auth/login');
        return;
    }
  }

  private setPrimeNGConfig(): void {
    this.setTranslations();
    this.setZIndex();
  }

  private setTranslations(): void {
    this.primeConfig.setTranslation({
      accept: 'OK',
      reject: 'NO',
      choose: 'Seleccionar',
      lt: 'Menor que',
      lte: 'Menos o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que'
    });
  }

  private setZIndex(): void {
    this.primeConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    };
  }
}
