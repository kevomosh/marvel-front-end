import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';

@NgModule({
  declarations: [ComicsComponent, ComicDetailComponent],
  imports: [SharedModule, ComicsRoutingModule],
})
export class ComicsModule {}
