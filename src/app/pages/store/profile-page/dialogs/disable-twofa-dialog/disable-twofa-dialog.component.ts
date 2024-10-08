import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

interface IData {
  twofa: string;
}

@Component({
  selector: 'app-store-disable-twofa-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDialogContent,
    MatDialogActions,
  ],
  providers: [provideNgxMask()],
  templateUrl: './disable-twofa-dialog.component.html',
  styleUrl: './disable-twofa-dialog.component.css',
})
export class StoreDisableTwofaDialogComponent {
  twofaForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<StoreDisableTwofaDialogComponent>) {
    this.twofaForm = new FormGroup({
      twofa: new FormControl('', Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  disable(): void {
    this.dialogRef.close(this.twofaForm.value.twofa);
  }
}
