import { Component } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaCredito } from '../../models/Tarjeta-Credito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-tarjeta.component.html',
  styleUrl: './listar-tarjeta.component.css'
})
export class ListarTarjetaComponent {

  listaTarjetas: TarjetaCredito[] = [];

  constructor(private _tarjetaService: TarjetaService) {

  }

  ngOnInit(): void {
    this.getTarjetas();
  }

  getTarjetas() {
    this._tarjetaService.getTarjetas().subscribe(doc => {
      // console.log(doc);
      this.listaTarjetas = [];
      doc.forEach((element: any) => {
        this.listaTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        // console.log(this.listaTarjetas)
      });
    })
  }

}
