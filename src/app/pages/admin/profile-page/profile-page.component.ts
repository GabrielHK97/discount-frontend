import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DisableTwofaDialogComponent } from './dialogs/disable-twofa-dialog/disable-twofa-dialog.component';
import { ITwoFA } from '../../../interfaces/twofa.interface';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NavbarComponent, MatCardModule, MatButtonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class AdminProfilePageComponent implements OnInit {
  statusQRCode: boolean | undefined;
  qrCode: string = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.checkStatusQRCode();
    console.log(this.statusQRCode);
  }

  async checkStatusQRCode(): Promise<void> {
    try {
      const response = await this.adminService.statusQRCode();
      this.statusQRCode = response.data!.status;
      if (this.statusQRCode) await this.generateQRCode();
    } catch (error) {}
  }

  async generateQRCode(): Promise<void> {
    try {
      const response = await this.adminService.generateQRCode();
      this.qrCode = response.data!.qrCode;
    } catch (error: any) {
      this.qrCode = '';
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  async enableQRCode(): Promise<void> {
    try {
      await this.adminService.enableQRCode();
      await this.checkStatusQRCode();
      const snackBarRef = this.snackBar.open('QRCode ativado!', 'Fechar', {
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    } catch (error: any) {
      const snackBarRef = this.snackBar.open(error.error.message, 'Fechar', {
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  async disableQRCode(): Promise<void> {
    try {
      const dialogRef = this.dialog.open(DisableTwofaDialogComponent);
      dialogRef.afterClosed().subscribe(async (twofa) => {
        if (twofa) {
          const twofaDto: ITwoFA = { twofa };
          await this.adminService.disableQRCode(twofaDto);
          await this.checkStatusQRCode();
          const snackBarRef = this.snackBar.open(
            'QRCode desativado!',
            'Fechar',
            {
              duration: 2000,
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
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }
}
