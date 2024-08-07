import { Component } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaCredito } from '../../models/Tarjeta-Credito';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-tarjeta.component.html',
  styleUrl: './listar-tarjeta.component.css'
})
export class ListarTarjetaComponent {

  listaTarjetas: TarjetaCredito[] = [];

  constructor(
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {
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

  deleteTarjeta(id: any) {
    this._tarjetaService.deleteTarjeta(id).then(() => {
      this.toastr.error('Tarjeta eliminada con éxito', 'Tarjeta Eliminada');
    }, error => {
      this.toastr.error('Error al borrar tarjeta', 'Error');
      console.log(error);
    })
  }

  updateTarjeta(tarjeta: TarjetaCredito) {
    this._tarjetaService.addTarjetaEdit(tarjeta);

  }

}
