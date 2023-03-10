import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitLayoutComponent } from '@containers/init';
import { AuthGuard } from '@guards/auth.guard';
import { UnAuthGuard } from '@guards/unauth.guard';
import { DefaultComponent } from './containers';

const loginModule = () => import('@views/init/login/login.module').then(m => m.LoginModule);
const registerModule = () => import('@views/init/register/register.module').then(m => m.RegisterModule);
const ProductsModule = () => import('@views/dash/products/products.module').then(m => m.ProductsModule);
const TaxesModule = () => import('@views/dash/taxes/taxes.module').then(m => m.TaxesModule);

const routes: Routes = [
  {
    path: '', component: InitLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: loginModule },
      { path: 'register', loadChildren: registerModule },
    ],
  },
  {
    path: '', component: DefaultComponent,
    children: [
      { path: 'products', loadChildren: ProductsModule },
      { path: 'taxes', loadChildren: TaxesModule },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
