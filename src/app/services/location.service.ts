import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderByEnum } from '../utils/enums/order-by.enum';
import { IState } from '../utils/interfaces/state.interface';
import { orderBy } from '../utils/functions/order-by.function';
import { ICity } from '../utils/interfaces/city.interface';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}

  async getStates(order?: OrderByEnum, field?: string): Promise<IState[]> {
    const states = await firstValueFrom(
      this.http.get<IState[]>(
        `${environment.locationApiUrl}/api/v1/localidades/estados`
      )
    );
    if (order && field) {
      return orderBy<IState>(states, order, field);
    }
    return states;
  }

  async getCitiesByState(state: IState, orderBy?: OrderByEnum, field?: string): Promise<ICity[]> {
    const states = await firstValueFrom(
        this.http.get<ICity[]>(
          `${environment.locationApiUrl}/api/v1/localidades/estados/${state.sigla}/municipios`
        )
      );
      let sortFunction: (a: any, b: any) => any;
      if (orderBy && field) {
        switch (orderBy) {
          case OrderByEnum.ALPHABET:
            sortFunction = (a: any, b: any) => a[field].localeCompare(b[field]);
            break;
          case OrderByEnum.NUMBER_ASC:
            sortFunction = (a, b) => a - b;
            break;
          case OrderByEnum.NUMBER_DESC:
            sortFunction = (a, b) => b - a;
            break;
        }
        return states.sort(sortFunction);
      }
      return states;
  }
}
