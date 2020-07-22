import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

@NgModule({
  declarations: [CharactersComponent, CharacterDetailComponent],
  imports: [SharedModule, CharactersRoutingModule],
})
export class CharactersModule {}
