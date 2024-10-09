import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LocationService } from '../../../services/location.service';
import { OrderByEnum } from '../../../utils/enums/order-by.enum';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { IState } from '../../../utils/interfaces/state.interface';
import { ICity } from '../../../utils/interfaces/city.interface';
import { IStore } from '../../../utils/interfaces/store.interface';
import { CustomValidators } from '../../../utils/functions/validator.function';
import { StoreService } from '../../../services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-create-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './create-store-page.component.html',
  styleUrl: './create-store-page.component.css',
})
export class StoreCreatePageComponent implements OnInit {
  phoneMask: string;
  storeFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  accountFormGroup: FormGroup;
  states: IState[];
  cities: ICity[];
  filteredStates: Observable<IState[]>;
  filteredCities: Observable<ICity[]>;
  created: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private locationService: LocationService,
    private storeService: StoreService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.phoneMask = '(00) 0000-0000';
    this.states = [];
    this.cities = [];
    this.filteredStates = new Observable<IState[]>();
    this.filteredCities = new Observable<ICity[]>();
    this.storeFormGroup = new FormGroup({
      realName: new FormControl('', Validators.required),
      fantasyName: new FormControl('', Validators.required),
      cnpj: new FormControl('', {
        validators: [Validators.required, CustomValidators.cnpj()],
      }),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });
    this.addressFormGroup = new FormGroup({
      place: new FormControl('', Validators.required),
      number: new FormControl(''),
      complement: new FormControl(''),
      zipCode: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl<string | ICity>(
        { value: '', disabled: true },
        Validators.required
      ),
      state: new FormControl<string | IState>('', Validators.required),
    });
    this.accountFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  switchPasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  switchConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  async ngOnInit(): Promise<void> {
    this.states = await this.locationService.getStates(
      OrderByEnum.ALPHABET,
      'nome'
    );

    this.filteredStates = this.addressFormGroup.get('state')!.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this.filter<IState>(name as string, 'nome', this.states)
          : this.states.slice();
      })
    );
  }

  async getCities(): Promise<void> {
    const uf = this.addressFormGroup.value.state;
    if (uf) {
      this.cities = await this.locationService.getCitiesByState(
        uf,
        OrderByEnum.ALPHABET,
        'nome'
      );
      this.filteredCities = this.addressFormGroup
        .get('city')!
        .valueChanges.pipe(
          startWith(''),
          map((value: any) => {
            const name = typeof value === 'string' ? value : value?.name;
            return name
              ? this.filter<ICity>(name as string, 'nome', this.cities)
              : this.cities.slice();
          })
        );
      this.addressFormGroup.get('city')!.setValue('');
      this.addressFormGroup.get('city')!.enable();
    }
  }

  private filter<T>(name: string, field: string, array: T[]): T[] {
    const filterValue = name.toLowerCase();

    return array.filter((element: any) =>
      element[field]
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(filterValue)
    );
  }

  displayState(state: IState): string {
    return state && state.nome ? state.nome : '';
  }

  displayCity(state: ICity): string {
    return state && state.nome ? state.nome : '';
  }

  updatePhoneMask(): void {
    this.phoneMask =
      this.storeFormGroup.value.phone.length > 10
        ? '(00) 00000-0000'
        : '(00) 0000-00009';
  }

  async createStore(): Promise<void> {
    if (
      this.storeFormGroup.valid &&
      this.addressFormGroup.valid &&
      this.accountFormGroup.valid
    ) {
      try {
        const createStoreDto: IStore = {
          username: this.accountFormGroup.value.username,
          password: this.accountFormGroup.value.password,
          confirmPassword: this.accountFormGroup.value.confirmPassword,
          realName: this.storeFormGroup.value.realName,
          fantasyName: this.storeFormGroup.value.fantasyName,
          cnpj: this.storeFormGroup.value.cnpj,
          email: this.storeFormGroup.value.email,
          phone: this.storeFormGroup.value.phone,
          address: {
            place: this.addressFormGroup.value.place,
            number: this.addressFormGroup.value.number,
            complement: this.addressFormGroup.value.complement,
            zipCode: this.addressFormGroup.value.zipCode,
            neighborhood: this.addressFormGroup.value.neighborhood,
            city: this.addressFormGroup.value.city.nome,
            state: this.addressFormGroup.value.state.nome,
          },
        };
        await this.storeService.register(createStoreDto);
        this.created = true;
        const snackBarRef = this.snackBar.open(
          'Loja criada com sucesso!',
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
    } else {
      const snackBarRef = this.snackBar.open('Dados incorretos!', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['store']);
  }
}
