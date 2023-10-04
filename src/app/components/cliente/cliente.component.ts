import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Cliente} from "../../model/Cliente";
import {ClienteService} from "../../services/cliente.service";
import {FormControl, FormGroup} from "@angular/forms";
import { ngxCsv } from 'ngx-csv';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{
  listClientes: Cliente [] = [];
  formCliente: FormGroup = new FormGroup({})
  isUpdate: boolean =false;
  constructor(private clienteervice:ClienteService) {
  }
  ngOnInit() {
    this.list();
    this.formCliente = new FormGroup({
      id: new  FormControl(''),
      sharedKey: new  FormControl(''),
      businessId: new  FormControl(''),
      email: new  FormControl(''),
      phone: new  FormControl(''),
      dateAdded: new  FormControl('')
    });
  }
  closeModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
  }
  list(){
    this.clienteervice.getCliente().subscribe(resp=>{
      if(resp){
        this.listClientes = resp;
      }
    });
  }
  newCliente(){
    this.isUpdate = false;
    this.formCliente.reset();

  }
  selectItem(item:any){
    this.isUpdate=true;
    this.formCliente.controls['id'].setValue(item.id);
    this.formCliente.controls['sharedKey'].setValue(item.sharedKey);
    this.formCliente.controls['businessId'].setValue(item.businessId);
    this.formCliente.controls['email'].setValue(item.email);
    this.formCliente.controls['phone'].setValue(item.phone);
    this.formCliente.controls['dateAdded'].setValue(item.dateAdded);
  }
  save(){
    this.clienteervice.saveCliente(this.formCliente.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCliente.reset();
      }
    });
  }
  update(){
    this.clienteervice.updateCliente(this.formCliente.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCliente.reset();
      }
    });
  }
  delete(id:any){
    this.clienteervice.deleteCliente(id).subscribe(res=>{
      if(res){
        this.list();
        this.formCliente.reset();
      }
    })
  }
  exportToCsv() {
    const options = {
      title: 'Clientes',
      useBom: true,
      noDownload: false,
      headers: ["ID", "Shared Key", "Business ID", "Email", "Phone", "Date Added"]
    };
    new ngxCsv(this.listClientes, 'Clientes', options);
  }

}
