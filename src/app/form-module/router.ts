import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PeriodFormComponent } from '@app/form-module/components/period-form/period-form.component';

const routes: Routes = [
  { path: '', component: PeriodFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRouterModule { }

