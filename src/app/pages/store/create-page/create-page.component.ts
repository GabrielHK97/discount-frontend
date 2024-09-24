import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { IState } from '../../../utils/interfaces/state.interface';
import { ICity } from '../../../utils/interfaces/city.interface';
import { cnpjValidator } from '../../../utils/functions/validator.function';

@Component({
  selector: 'app-store-create-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  providers: [provideNgxMask()],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css',
})
export class StoreCreatePageComponent implements OnInit {
  phoneMask: string;
  storeFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  states: IState[];
  filteredStates: Observable<IState[]>;
  cities: ICity[];
  filteredCities: Observable<ICity[]>;

  constructor(private locationService: LocationService) {
    this.phoneMask = '(00) 0000-0000';
    this.states = [];
    this.cities = [];
    this.filteredStates = new Observable<IState[]>();
    this.filteredCities = new Observable<ICity[]>();
    this.storeFormGroup = new FormGroup({
      realName: new FormControl('', Validators.required),
      fantasyName: new FormControl('', Validators.required),
      cnpj: new FormControl('', {validators: [Validators.required, cnpjValidator()]}),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });
    this.addressFormGroup = new FormGroup({
      place: new FormControl('', Validators.required),
      number: new FormControl(''),
      complement: new FormControl(''),
      zipcode: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl<string | ICity>({ value: '', disabled: true }, Validators.required),
      state: new FormControl<string | IState>('', Validators.required),
    });
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
        return name ? this.filter<IState>(name as string, 'nome', this.states) : this.states.slice();
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
            return name ? this.filter<ICity>(name as string, 'nome', this.cities) : this.cities.slice();
          })
        );
      this.addressFormGroup.get('city')!.setValue('');
      this.addressFormGroup.get('city')!.enable();
    }
  }

  private filter<T>(name: string, field: string, array: T[]): T[] {
    const filterValue = name.toLowerCase();

    return array.filter((state: any) =>
      state[field].toLowerCase().includes(filterValue)
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
}
