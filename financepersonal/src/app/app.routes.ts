import { Routes } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { TransactionFormComponentComponent } from './transaction-form-component/transaction-form-component.component';
import { TransactionListComponentComponent } from './transaction-list-component/transaction-list-component.component';

export const routes: Routes = [
    {
        path:'',
        component:DashboardComponentComponent
    },
    {
        path:'transactions',
        component:TransactionListComponentComponent
    },
    {
        path:'transactions/new',
        component:TransactionFormComponentComponent
    },
    {
        path:'transactions/:id',
        component:TransactionFormComponentComponent
    },
    {
        path:'**',
        redirectTo:""
    }
];
