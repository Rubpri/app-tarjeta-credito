import { Component } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaCredito } from '../../models/Tarjeta-Credito';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';


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
    private toastr: ToastrService,
    public numeroTarjetas: SharedService
  ) {
  }


  sumarTarjeta() {
    this.numeroTarjetas.numeroTarjetas = this.numeroTarjetas.numeroTarjetas + 1;
  }

  ngOnInit(): void {
    this.getTarjetas();
    // console.log(this.numeroTarjetas.numeroTarjetas);
  }

  getTarjetas() {
    this._tarjetaService.getTarjetas().subscribe(doc => {
      // console.log(doc);
      this.listaTarjetas = [];
      this.numeroTarjetas.numeroTarjetas = 0;
      doc.forEach((element: any) => {
        this.listaTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        this.sumarTarjeta();
        // this.numeroTarjetas = this.numeroTarjetas + 1;
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
