import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';
import { CustomerAddComponent } from './components/customer-create/customer-add/customer-add.component';

export const routes: Routes = [
  {
    path: 'customer-list',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-create',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-edit/:id',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard],
  },
];
export const routedComponents = [
  CustomerListComponent,
  CustomerSearchComponent,
  CustomerCreateComponent,
  CustomerAddComponent,
];
