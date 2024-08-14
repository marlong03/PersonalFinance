import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChartTorteComponentComponent } from '../chart-torte-component/chart-torte-component.component';
import Swal from 'sweetalert2';
import { Summary } from '../models/Transactions';
@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    CommonModule,
    ChartTorteComponentComponent
  ],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css'
})
export class DashboardComponentComponent {

  //Variables de totales traidas por  chart-torte-component @Output
  transactionsTotals: Summary = { total: 0, incomes: 0, expenses: 0 };
  getTotals(totals:Summary):void{
    this.transactionsTotals = totals
  }
  
  loading = true;
  constructor (private transactionService:TransactionService,
              private router:Router){}

  ngOnInit(): void {
  }

  redirectUrl(url:string): void{
    this.router.navigate([url])
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

  
}
