import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearTarjetaComponent } from './components/crear-tarjeta/crear-tarjeta.component';
import { ListarTarjetaComponent } from './components/listar-tarjeta/listar-tarjeta.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrearTarjetaComponent, ListarTarjetaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
