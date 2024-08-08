import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  numeroTarjetas: number = 0;

  constructor() { }
}
