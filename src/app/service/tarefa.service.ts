import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tarefa } from '../tarefa'; //não coloquei na pasta model mas funciona de boa.

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  // private url ="http://localhost:3000/tarefa"; não usei pq usei evironment (variavel do sistema)

  listarTarefa() : Observable<Tarefa[]>
  {
    return this.http.get<Tarefa[]>(`${environment.apiLink}tarefa`);
  }

  inserirTarefa(tarefa: Tarefa) : Observable<Tarefa>
  {
    return this.http.post<Tarefa>(`${environment.apiLink}tarefa`, tarefa);
  }

  removerTarefa(id: number): Observable<any> 
  {
    return this.http.delete(`${environment.apiLink}tarefa/${id}`);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<Tarefa>
  {
    return this.http.put<Tarefa>(`${environment.apiLink}tarefa/${tarefa.id}`, tarefa);
  }
  atualizarEtapa(tarefa: Tarefa): Observable<Tarefa>
  {
    return this.http.put<Tarefa>(`${environment.apiLink}tarefa/${tarefa.id}`, tarefa.etapa);
  }
}
