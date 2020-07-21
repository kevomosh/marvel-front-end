import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'comics',
    loadChildren: () =>
      import('./comics/comics.module').then((m) => m.ComicsModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/comics' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
