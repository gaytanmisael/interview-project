import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitLayoutComponent } from '@containers/init';

const routes = [
  {
    path: '', component: InitLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: () => import('@views/init/login/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('@views/init/register/register.module').then(m => m.RegisterModule) }
    ]
  }
] satisfies Routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
