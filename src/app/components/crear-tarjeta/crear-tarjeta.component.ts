import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TarjetaCredito } from '../../models/Tarjeta-Credito';
import { TarjetaService } from '../../services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-tarjeta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-tarjeta.component.html',
  styleUrl: './crear-tarjeta.component.css'
})
export class CrearTarjetaComponent {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  crearTarjeta() {
    const tarjeta: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._tarjetaService.guardarTarjeta(tarjeta).then(() => {
      this.loading = false;
      console.log('Tarjeta Registrada');
      this.toastr.success('¡Tarjeta registrada con éxito!', 'Tarjeta registrada');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Error al añadir tarjeta', 'Error');
      console.log(error);
    });
  }

}
