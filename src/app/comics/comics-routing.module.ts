import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicsComponent } from './comics.component';

const routes: Routes = [
  { path: 'detail/:id', component: ComicDetailComponent },
  { path: '', component: ComicsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsRoutingModule {}
