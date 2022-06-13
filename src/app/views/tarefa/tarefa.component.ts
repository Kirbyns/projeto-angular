import { Component, OnInit } from '@angular/core';
import { TarefaService } from 'src/app/service/tarefa.service';
import { Tarefa } from 'src/app/tarefa';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  tarefas = new Array<Tarefa>();
  tarefa? :Tarefa;
  editando = false;
  colunas = ['title', 'etapa', 'categoria', 'acoes'];
  constructor(private tarefaService : TarefaService ) { }

  ngOnInit(): void {
    this.listar();
  }


  listar(){
    this.tarefaService.listarTarefa().subscribe(tarefas =>{
      this.tarefas = tarefas;
    });
  }

  novo(){
    this.tarefa = new Tarefa();
    this.editando = false;
  }

  salvar(){
    if (this.tarefa) {

      if (!this.editando) {
        this.tarefaService.inserirTarefa(this.tarefa).subscribe(tarefa => {
          this.listar();
          this.tarefa = undefined;
        });
      }
      else {
        this.tarefaService.atualizarTarefa(this.tarefa).subscribe(tarefa => {
          this.listar();
          this.tarefa = undefined;
        });
      }

    }
  }

  excluir(id:number) {
    this.tarefaService.removerTarefa(id).subscribe(() =>{
      this.listar();
    });
  }

  editar(tarefa: Tarefa){
    this.tarefa = tarefa;
    this.editando = true;
  }

}
