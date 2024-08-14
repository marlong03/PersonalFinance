import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartTorteComponentComponent } from '../chart-torte-component/chart-torte-component.component';
import Swal from 'sweetalert2';
import { Transaction } from '../models/Transactions';
@Component({
  selector: 'app-transaction-list-component',
  standalone: true,
  imports: [
            FormsModule,
            AsyncPipe,
            ChartModule,
            TableModule,
            TagModule,
            InputTextModule,
            CommonModule,
            ButtonModule,
            ChartTorteComponentComponent
  ],
  templateUrl: './transaction-list-component.component.html',
  styleUrl: './transaction-list-component.component.css'
})
export class TransactionListComponentComponent {

  //Variables de Transactions Model
  transactions: Transaction[] = [];
  loading = true;
  //Variables para datatable
  searchValue: string = '';
  selectedTransactions:any;

  constructor (private transactionService: TransactionService,
              private router: Router,
              private location:Location){}

  ngOnInit(): void {
    this.loadTransactions()
  }
  //Ir a pagina anterior
  backPage():void{
    this.location.back()
  }
  //Restablecer busqueda en datatable
  clear(table: Table):void {
    table.clear();
    this.searchValue = ''
  }

  alertSwal(text:string,iconAlert:any){
    return Swal.fire({
      position: "center",
      icon: iconAlert,
      title: text,
      showConfirmButton: false,
      timer: 1400
    })
  }
  
  //Obtener id del elemento selecionado en datatable
  onRowSelect(event: any):void {
    let transactionId= event.data.id
    this.router.navigate(["/transactions/" + transactionId]);
  }
  
  loadTransactions(): void {
    //Obtener todos los objetos
    this.transactionService.getTransactions().subscribe((data:Transaction[]) => {
      this.transactions = data.reverse();
      this.loading = false;
      },(error) => {
        this.alertSwal("No fue posible cargar la información","warning").then(()=>{
          this.router.navigate([""])
          this.loading = false;
          console.log('No fue posible cargar la información', error);
        })
      }
    );
  }
}
