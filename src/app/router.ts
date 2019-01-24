import { RouterModule, Routes, PreloadingStrategy, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';

// Обработчик предзагрузки модулей
class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', loadChildren: './form-module/form.module#FormModule', data: {preload: true} },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: AppCustomPreloader
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

