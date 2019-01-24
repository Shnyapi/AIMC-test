import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';

/** Интерфейс периода */
interface IPeriod {
  value: number;      // Значение
  valueView: string;  // Выводимое значение
}

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }, // Заставляем дружить материал с moment
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },               // Заставляем дружить материал с moment
  ]
})
export class PeriodFormComponent implements OnInit {
  /** Минимальная дата сегодняшнее число */
  public minDate: Moment = moment();

  /** Массив периодов */
  public periods: IPeriod[] = [
    { value: 1, valueView: '1 year' },
    { value: 2, valueView: '2 year' },
    { value: 5, valueView: '5 year' }
  ];

  /** Реактивная форма */
  public reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  /** Отправить форму */
  public submitForm(): void {
    console.log({
      ...this.reactiveForm.value,
      endDate: this.reactiveForm.controls.endDate.value
    });
  }

  /** Инициализация реактивной формы */
  private initReactiveForm() {
    /** Генерируем группу реактивной формы */
    this.reactiveForm = this.fb.group({
      startDate: [moment(), Validators.required],                      // Дата начала
      period: [1 , Validators.required],                               // Пройденый период в годах
      endDate: [{ value: moment().add(1, 'year'), disabled: true }],   // Окончательная дата
    });

    // Следим за изменениями в параметрах startDate и period и обновляем endDate
    this.reactiveForm.get('startDate').valueChanges.subscribe(() => {
      this.setEndDate();
    });

    this.reactiveForm.get('period').valueChanges.subscribe(() => {
      this.setEndDate();
    });
  }

  /** Изменяем endDate */
  private setEndDate() {
    const startDate = this.reactiveForm.get('startDate').value;
    const period = this.reactiveForm.get('period').value;

    // если инпут отчистили, выходим
    if (!startDate) {
      return;
    }

    this.reactiveForm.patchValue({
      endDate: cloneDeep(startDate).add(period, 'year')
    });
  }
}
