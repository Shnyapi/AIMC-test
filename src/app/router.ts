import { RouterModule, Routes, PreloadingStrategy, Route, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';

// Обработчик предзагрузки модулей
export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', loadChildren: './period-form-module/period-form.module#PeriodFormModule', data: { preload: true } },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: AppCustomPreloader
  })],
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule { }
