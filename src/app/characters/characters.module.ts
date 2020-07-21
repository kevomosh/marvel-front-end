import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';

@NgModule({
  declarations: [CharactersComponent],
  imports: [SharedModule, CharactersRoutingModule],
})
export class CharactersModule {}
