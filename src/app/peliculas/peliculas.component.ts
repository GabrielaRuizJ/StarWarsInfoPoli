import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal  from "sweetalert2";

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  FilmsAll:any;
  film:any;
  filteredFilmList: [];
  filteredFilmList2: [];
  actual=1;
  actual2=0;
  busqueda ="";
  
  constructor(
    private dataapiservice: DataApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getFilms(1);
  }
  getFilms(id:number) {
    this.actual=id;
    if(id<1){
      id=1;
      this.actual=1;
    }
    this.dataapiservice.getAllFilm(id).subscribe(
      data => {
        if (data["results"].length > 0) {
          
          this.FilmsAll = data["results"];
          this.filteredFilmList = this.FilmsAll;
        }else{
          alert("No hay");
        }
      },
      error => {
        this.actual=this.actual-1;
        console.log("Fin de registros");
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Has llegado al final de los registros'
        })
      }
    );
  }
  //Filtrar un personaje
  getOneFilm(id:number) {
    this.actual2=id;
    if(id<1){
      id=1;
      this.actual2=1;
    }
    this.dataapiservice.getOneFilm(this.busqueda).subscribe(
      data2 => {
        if (data2["results"].length > 0) {
          this.film = data2["results"];
          this.filteredFilmList2 = this.film;
        }else{
          alert("No hay");
        }
      },
      error => {
        this.actual2=this.actual2-1;
        console.log("Fin de registros");
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Has llegado al final de los registros'
        })
      }
    );
  }
  //Ventana de busqueda individual
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl' })
    .result.then((result) => {
      console.log("Busqueda cerrada");
    }, (reason) => {
      console.log("Busqueda cerrada");
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
