import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  tarefaForm!: FormGroup;
  constructor(private tarefaService : TarefaService, private _snackBar: MatSnackBar ) { }
 
  ngOnInit(): void {  //usamos o ngOnInit pois o formulario precisa ser iniciado ( ngOnInit : inicializando coisas do angular em especifico)
    this.tarefaForm = new FormGroup({   //prenchendo com todos campos do formulario
      title: new FormControl('', [Validators.required]),
      etapa: new FormControl('',[Validators.required]),
      categoria: new FormControl('',[Validators.required]),
    });
    this.listar();
  }

  get tittle(){
    return this.tarefaForm.get('title')!;  //pegar o atributo title do tarefaForm(formulario da home)
  }
  get etapa(){
    return this.tarefaForm.get('etapa')!;  //pegar o atributo etapa do tarefaForm(formulario da home)
  }
  get categoria(){
    return this.tarefaForm.get('categoria')!;  //pegar o atributo categoria do tarefaForm(formulario da home)
  }

  openSnackBar() {
    this._snackBar.open("salvo com sucesso","fechar"); //envio de salvo com sucesso.
  }
  openSnackBarnegativo() {
    this._snackBar.open("falta dados no seu formulario","fechar"); //envio de erro.
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
        if(this.tarefaForm.invalid){
          return this.openSnackBarnegativo();
        }
          else{
          this.tarefaService.inserirTarefa(this.tarefa).subscribe(tarefa => {
            this.listar();
            this.tarefa = undefined;
            this.openSnackBar();
  
          
            });
          }
      }
      else {
        if(this.tarefaForm.invalid){
          return this.openSnackBarnegativo();
        }
        else{
          this.tarefaService.atualizarTarefa(this.tarefa).subscribe(tarefa => {
            this.listar();
            this.tarefa = undefined;
          });

        }
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

