import { NgModule } from '@angular/core';
import { TarefaComponent } from './views/tarefa/tarefa.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ { path: 'tarefa', component: TarefaComponent } 

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
