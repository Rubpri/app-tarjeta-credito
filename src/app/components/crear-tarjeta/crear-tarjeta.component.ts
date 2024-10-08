import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TarjetaCredito } from '../../models/Tarjeta-Credito';
import { TarjetaService } from '../../services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';

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
  titulo = 'Crear Tarjeta';
  id: string | undefined;

  constructor(
    private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService,
    public numeroTarjetas: SharedService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("^[0-9]*$")]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5),Validators.pattern("(0[1-9]|1[0-2])/([0-9]{2})"), this.validarFechaExpiracion()]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  validarFechaExpiracion() {
    return (control: any): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }

      const [month, year] = control.value.split('/');
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (isNaN(monthNum) || isNaN(yearNum)) {
        return { invalidDate: true }
      }

      if (yearNum < currentYear) {
        return { invalidYear: true }; 
      }
  
      if (yearNum === currentYear && monthNum < currentMonth) {
        return { invalidMonth: true };
      }
  
      return null;
   }
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      // console.log(data);
      this.id = data.id;
      this.titulo = 'Editar Tarjeta';
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    })
  }

  resetearFormulario() {
    this.form.reset();
    this.titulo = 'Agregar Tarjeta';
    this.id = undefined;
  }

  crearTarjeta() {
    if (this.id === undefined) {
      // Creamos una nueva tarjeta
      this.agregarTarjeta();
    } else {
      // Editamos una nueva tarjeta
      this.editarTarjeta(this.id)
    }
  }

  editarTarjeta(id: string) {
    const tarjeta: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this._tarjetaService.updateTarjeta(id, tarjeta).then(() => {
      this.loading = false;
      this.titulo = 'Agregar Tarjeta';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('Tarjeta actualizada con éxito', 'Tarjeta Actualizada');
    }, error => {
      console.log(error);
    })
  }

  agregarTarjeta() {
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
      // console.log('Tarjeta Registrada');
      this.toastr.success('¡Tarjeta registrada con éxito!', 'Tarjeta registrada');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Error al añadir tarjeta', 'Error');
      console.log(error);
    });
  }

}
