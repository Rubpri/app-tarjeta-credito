import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TarjetaCredito } from '../models/Tarjeta-Credito';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private firebase: AngularFirestore) {
  }

  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any> {
    return this.firebase.collection('tarjetas').add(tarjeta);
  }

  getTarjetas(): Observable<any> {
    return this.firebase.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
}

