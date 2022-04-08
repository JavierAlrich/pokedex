import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchAllPokemons, Pokemon } from '../interfaces/pokemon.interfaces';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = 'https://pokeapi.co/api/v2';

  getAllPokemons():Observable<Pokemon[]>{
    return this.http.get<FetchAllPokemons>(`${this.baseUrl}/pokemon?limit=2000`)
        .pipe(
           map(this.transformIntoPokemon)
        );
  }

  private transformIntoPokemon(resp:FetchAllPokemons):Pokemon[]{
    
    const pokemonList:Pokemon[] = resp.results.map( poke => {

      const urlToarr = poke.url.split('/');
      const id = urlToarr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

      return {
        id,
        name: poke.name,
        pic
      }
    })

    return pokemonList;    
  }
  
}
