import { inject, Injectable, Type } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  ref: DynamicDialogRef | undefined;
  dialogService = inject(DialogService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  constructor() { }

  openComponent(component: Type<unknown>, config: DynamicDialogConfig): DynamicDialogRef | undefined {
    config = { ...config, baseZIndex: 999 };
    this.ref = this.dialogService.open(component, config);
    return this.ref;
  }

  closeComponent() {
    this.ref?.close();
  }

}
