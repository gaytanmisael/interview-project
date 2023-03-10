import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitLayoutComponent } from '@containers/init';
import { AuthGuard } from '@guards/auth.guard';
import { DefaultComponent } from './containers';

const loginModule = () => import('@views/init/login/login.module').then(m => m.LoginModule);
const registerModule = () => import('@views/init/register/register.module').then(m => m.RegisterModule);
const DashModule = () => import('@views/dash/dash.module').then(m => m.DashModule);

const routes: Routes = [
  {
    path: '', component: InitLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: loginModule },
      { path: 'register', loadChildren: registerModule },
    ]
  },
  {
    path: 'products', component: DefaultComponent,
    children: [
      { path: '', loadChildren: DashModule }
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
