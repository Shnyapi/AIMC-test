import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// const childrenRoutes: Routes = [
//   { path: 'form', loadChildren: './general-module/general.module#GeneralModule', data: { preload: false } },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', loadChildren: './form-module/form.module#FormModule' },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

