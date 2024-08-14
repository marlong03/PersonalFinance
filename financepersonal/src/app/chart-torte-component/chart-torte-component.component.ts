import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TransactionService } from '../services/transaction.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Summary } from '../models/Transactions';
@Component({
  selector: 'app-chart-torte-component',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart-torte-component.component.html',
  styleUrl: './chart-torte-component.component.css'
})
export class ChartTorteComponentComponent implements OnInit {

  //Compartir valores totales con dashboard-component
  @Output() dataTotals = new EventEmitter<Summary>();
  shareTotals(): void {
    this.dataTotals.emit(this.transactionsTotals);
  }
  //Variables de valores totales Model
  transactionsTotals: Summary = {
    incomes:0,
    expenses:0,
    total:0
  };
  //Variables de grafica
  data: any;
  options: any;
  loading = true;

  constructor(private transactionService:TransactionService,private router:Router){}

  ngOnInit(): void {
    this.loadTransactions()
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
  
  loadTransactions(): void {
    this.transactionService.getTransactionsTotals().subscribe((dataSummary:Summary) => {
      this.transactionsTotals = dataSummary;
      this.loadChart()
      this.loading = false;
      this.shareTotals()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadChart():void{
    //Establecer valores grafica
    if(this.transactionsTotals){
      this.data = {
        labels: ['Ingresos', 'Gastos'],
        datasets: [
          {
            data: [this.transactionsTotals.incomes, this.transactionsTotals.expenses],
            backgroundColor: ['#4caf50', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#ef5350']
          }
        ]
      }
      //Estilos de la grafica
      this.options = {
        responsive:false,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: 'black'
            }
          }
        }
      };

    }

  }
}



