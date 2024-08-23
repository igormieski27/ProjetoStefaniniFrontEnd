import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss']
})
export class ProdutoCreateComponent implements OnInit {
  nomeProduto: string = '';
  valor: number | null = null;
  produtoId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProdutoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recebe dados do produto, se existirem
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.produtoId = this.data.id;
      this.nomeProduto = this.data.nomeProduto;
      this.valor = this.data.valor;
    }
  }

  isFormValid(): any {
    return this.nomeProduto?.length >= 3 && this.valor && this.valor > 0;
  }

  onSave(): void {
    if (this.isFormValid()) {
      const produto = {
        Id: this.produtoId,
        NomeProduto: this.nomeProduto,
        Valor: this.valor
      };

      if (this.isEditMode) {
        this.produtoService.createProduto(produto).subscribe(
          response => {
            this.snackBar.open('Produto atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.dialogRef.close(response);
          },
          error => {
            console.error('Erro ao atualizar produto', error);
            this.snackBar.open(`Erro ao atualizar produto: ${error.message}`, 'Fechar', {
              duration: 3000,
            });
          }
        );
      } else {
        this.produtoService.createProduto(produto).subscribe(
          response => {
            this.snackBar.open('Produto criado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.dialogRef.close(response);
          },
          error => {
            console.error('Erro ao criar produto', error);
            this.snackBar.open(`Erro ao criar produto: ${error.message}`, 'Fechar', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
