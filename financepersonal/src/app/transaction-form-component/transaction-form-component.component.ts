import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Transaction } from '../models/Transactions';
@Component({
  selector: 'app-transaction-form-component',
  standalone: true,
  imports: [ButtonModule, FormsModule,],
  templateUrl: './transaction-form-component.component.html',
  styleUrls: ['./transaction-form-component.component.css']
})
export class TransactionFormComponentComponent implements OnInit {
  
  //Variables de Transactions Model
  transaction:Transaction = {
    category: '',
    amount: 0,
    description: '',
    type: '',
  };
  transactionId: string | null = null;

  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute,
              private location: Location,
              private router:Router) { }

  ngOnInit(): void {
      this.getTransaction()
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

  backPage():void{
    this.location.back()
  }

  deleteTransaction():void{
    Swal.fire({
      title: "Seguro quiere eliminar el registro",
      text: "No lo podra recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Quiero eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.transactionId){
          this.transactionService.deleteTransaction(this.transactionId).subscribe((response)=>{
            Swal.fire({
              title: "Registro eliminado",
              text: "",
              icon: "success"
            }).then(()=>{
              this.router.navigate(["transactions"])
            });
          },(error)=>{
            this.alertSwal("No fue eliminar el registro","warning").then(()=>{
              this.router.navigate([""])
            })
          })
        }
        
      }
    });
  }
  getTransaction():void{

    this.route.paramMap.subscribe(params => {
      //Obtener Id de url
      this.transactionId = params.get('id');
      
      if(this.transactionId){
        //Obtener objeto que coincida con el Id buscado
        this.transactionService.getTransactionsById(this.transactionId).subscribe((data: Transaction) => {
          if (data) {
            this.transaction = {
              category: data.category,
              amount: data.amount,
              description: data.description,
              type: data.type
            };
          }else{
            this.alertSwal("No fue posible encontrar el registro","warning").then(()=>{
              this.router.navigate([""])
            })
          }
        },
        (error)=>{
          console.log(error);
        });
      }
    },(error)=>{
      console.log(error);
    });
  }

  onSubmit(): void {

    //Objeto a enviar al api
    const transactionData = {
      category: this.transaction.category,
      amount: this.transaction.amount,
      description: this.transaction.description,
      type: this.transaction.type,
      date: new Date().toISOString()
    };

    //Si NO existe parametro id en url crear un nuevo objeto
    if(this.transactionId == null){

      this.transactionService.addTransaction(transactionData).subscribe((response) => {
        this.alertSwal("Registro exitoso","success")
        this.router.navigate(["transactions"])
      },(error)=>{
        this.alertSwal("No fue posible encontrar el registro","warning").then(()=>{
          this.router.navigate([""])
        })
        console.log(error);
      });

    //Si existe parametro id en url actualizar objeto
    }else if(this.transactionId !== null){

      this.transactionService.updateTransaction(this.transactionId,transactionData).subscribe(response => {
        this.alertSwal("Actualización exitosa","success")
        this.router.navigate(["transactions"])
        console.log(response);
      },(error)=>{
        this.alertSwal("No fue posible el registro","warning")
        console.log(error);
      });

    }
  }

}
