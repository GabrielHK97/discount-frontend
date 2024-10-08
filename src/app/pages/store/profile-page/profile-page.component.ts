import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreDisableTwofaDialogComponent } from './dialogs/disable-twofa-dialog/disable-twofa-dialog.component';
import { ITwoFA } from '../../../utils/interfaces/twofa.interface';
import { StoreNavbarComponent } from '../../../components/navbar-store/navbar-store.component';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-store-profile-page',
  standalone: true,
  imports: [StoreNavbarComponent, MatCardModule, MatButtonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class StoreProfilePageComponent implements OnInit {
  statusQRCode: boolean | undefined;
  qrCode: string = '';

  constructor(
    private storeService: StoreService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.checkStatusQRCode();
  }

  async checkStatusQRCode(): Promise<void> {
    try {
      const response = await this.storeService.statusQRCode();
      this.statusQRCode = response.data!.status;
      if (this.statusQRCode) await this.generateQRCode();
    } catch (error) {}
  }

  async generateQRCode(): Promise<void> {
    try {
      const response = await this.storeService.generateQRCode();
      this.qrCode = response.data!.qrCode;
    } catch (error: any) {
      this.qrCode = '';
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  async enableQRCode(): Promise<void> {
    try {
      await this.storeService.enableQRCode();
      await this.checkStatusQRCode();
      const snackBarRef = this.snackBar.open('QRCode ativado!', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  async disableQRCode(): Promise<void> {
    try {
      const dialogRef = this.dialog.open(StoreDisableTwofaDialogComponent);
      dialogRef.afterClosed().subscribe(async (twofa) => {
        if (twofa) {
          const twofaDto: ITwoFA = { twofa };
          await this.storeService.disableQRCode(twofaDto);
          await this.checkStatusQRCode();
          const snackBarRef = this.snackBar.open(
            'QRCode desativado!',
            'Fechar',
            {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          snackBarRef.onAction().subscribe(() => {
            this.snackBar.dismiss();
          });
        }
      });
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }
}
