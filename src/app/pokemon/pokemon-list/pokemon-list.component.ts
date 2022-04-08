import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styles: [
  ]
})
export class PokemonListComponent implements OnInit {

  public pokemons:Pokemon[] = [];
  public page: number = 0;
  public searchPoke: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getAllPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    })
  }

  nextPage(){
    this.page += 5;
  }

  previousPage(){
    if(this.page > 0){
      this.page -= 5;
    }
  }

  onSearchPokemon(value: string){
    this.page = 0;
    this.searchPoke = value;
  }

}
