import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

//ng g c components/mapa --module=app.module  --skipTests=true
//npm install @agm/core
//npm install --save-dev @types/googlemaps
//Borre node_modules y los reinstale
//npm i @types/googlemaps@3.39.13
//npm uninstall @agm/core
//npm install@agm/core@1.1.0

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores:Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;
                                                                         // Cuando arranque la aplicación
  constructor(public snackBar: MatSnackBar,                              //Cargamos los servicios de material
              public dialog: MatDialog) {                          

    if(localStorage.getItem('marcadores')){                              // preguntaremos si existe algo en el localStorage
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));  // Si es asi  rellenaremos el [] con el contenido del local
    }

   }

  ngOnInit(): void {
  }

  agregarMarcador(event){

    const coords:{lat:number, lng:number} = event.coords;                  // Definimos las coordenadas de cada evento

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);            // las asignamos a un nuevoMarcador
    this.marcadores.push(nuevoMarcador);                                   // Las metemos en el [] 
    console.log(this.marcadores)

    this.guardarStorage();                                                 // Las guardamos en el localStorage 
  
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  guardarStorage(){

    localStorage.setItem('marcadores', JSON.stringify(this.marcadores))
  }

  borrarMarcador(i:number){
    this.marcadores.splice(i, 1);
    this.guardarStorage()
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador) {                              // Aquí recibiremos la información de mapa-editar

      const dialogRef = this.dialog.open(MapaEditarComponent, {     // Abrimos el cuadro de dialogo y llamamos a mapaEditar           
        width: '250px',
        data: { titulo: marcador.titulo, desc: marcador.desc }
      });
  
      dialogRef.afterClosed().subscribe(result => {                 // Aquí recibimos el valor del formulario 
        console.log('The dialog was closed');
        
        if(!result){
          return
        }

        marcador.titulo = result.titulo;                            // Asignamos esos valores al marcador
        marcador.desc = result.desc;

        this.guardarStorage();                                      // Y los guardamos
        this.snackBar.open('Marcador sctualizado', 'Cerrar', { duration: 3000 });
      });
  }
}
