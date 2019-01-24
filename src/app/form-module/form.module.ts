import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodFormComponent } from '@app/form-module/components/period-form/period-form.component';
import { GeneralRouterModule } from '@app/form-module/router';
import {
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MAT_DATE_LOCALE,
  MatButtonModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [PeriodFormComponent],
  imports: [
    CommonModule,
    GeneralRouterModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
})
export class FormModule { }
