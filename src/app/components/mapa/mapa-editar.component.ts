//ng g c components/mapa/mapa-editar --flat --skipTests=true --module=app.module
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {      // Gestionamos el contenido de los inputs del formulario

  forma: FormGroup;                                       // Creamos el objeto que maneja los formularios reactivos de angular

  constructor(                                            // Cuando se llame a este componente
    public fb: FormBuilder,                               // crearemos el sistema de formularios reactivos             
    public dialogRef: MatDialogRef<MapaEditarComponent>,  // crearemos el dialogRef dentro de mapaEditarComponent
    @Inject(MAT_DIALOG_DATA) public data: any             // y le inyectaremos la data de mapaComponent
    
  ) { console.log(data);
      this.forma = fb.group({                             // Asignamos los campos del formulario al sistema de angular 
        'titulo': data.titulo,
        'desc': data.desc
      })
  }

  ngOnInit(): void {
  }

  guardarCambios(){
    this.dialogRef.close(this.forma.value)                 // Se cierra el cuadro y se emite el valor de inputs del formulario
  }

  onNoClick(): void {
    this.dialogRef.close();                                // Cierra el cuadro de edición
  }

}
