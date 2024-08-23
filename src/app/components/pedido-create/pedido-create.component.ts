
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoService } from '../../services/produto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidoService } from '../../services/pedido.service';


interface ItemPedido {
  idProduto: number;
  nomeProduto: string;
  valorUnitario: number;
  quantidade: number;
}

interface Pedido {
  id?: number;
  nomeCliente: string;
  emailCliente: string;
  pago: boolean;
  itensPedido: ItemPedidoDto[];
}

interface ItemPedidoDto {
  idProduto: number;
  quantidade: number;
}

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.scss']
})
export class PedidoCreateComponent implements OnInit {
  produtos: any[] = [];
  itens: ItemPedido[] = [];
  selectedProdutoId: any = null;
  displayedColumns: string[] = ['nomeProduto', 'valorUnitario', 'quantidade', 'acoes'];
  nomeCliente: string = '';
  emailCliente: string = '';
  pago: boolean = false;
  dataSource = new MatTableDataSource<ItemPedido>(this.itens);

  constructor(
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PedidoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pedido
  ) { }

  ngOnInit(): void {
    this.loadProdutos();

  }


  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos)=> {this.produtos = produtos;
        if (this.data) {
          this.populateForm(this.data);
        }
      },
      
      error => console.error('Erro ao carregar produtos', error)
      
    );
  }


  populateForm(pedido: Pedido): void {
    this.nomeCliente = pedido.nomeCliente;
    this.emailCliente = pedido.emailCliente;
    this.pago = pedido.pago;
    console.log(this.produtos);
    this.itens = pedido.itensPedido.map(item => ({
      idProduto: item.idProduto,
      nomeProduto: this.produtos.find(p => p.id === item.idProduto)?.nomeProduto || '',
      valorUnitario: this.produtos.find(p => p.id === item.idProduto)?.valor || 0,
      quantidade: item.quantidade
    }));
    console.log(this.itens);
    this.dataSource.data = this.itens;
  }


  addProduto(): void {
    if (this.selectedProdutoId) {
      const produto = this.produtos.find(p => p.id === this.selectedProdutoId);
      if (produto) {
        this.itens.push({
          idProduto: produto.id,
          nomeProduto: produto.nomeProduto,
          valorUnitario: produto.valor,
          quantidade: 1
        });
        this.dataSource.data = this.itens;
        this.selectedProdutoId = null;
      }
    }
  }


  removeProduto(index: number): void {
    this.itens.splice(index, 1);
    this.dataSource.data = this.itens;
  }

  isEmailValid(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(this.emailCliente);
  }

  isFormValid(): any {
    const nomeValido = this.nomeCliente && this.nomeCliente.length >= 3;
    const emailValido = this.isEmailValid();
    const itensValidos = this.itens.length > 0;

    return nomeValido && emailValido && itensValidos;
  }


  onSave(): void {
    if (this.isFormValid()) {
      const pedido = {
        id: this.data?.id,
        nomeCliente: this.nomeCliente,
        emailCliente: this.emailCliente,
        pago: this.pago,
        Itens: this.itens.map(item => ({
          idProduto: item.idProduto,
          quantidade: item.quantidade
        }))
      };

      this.pedidoService.createPedido(pedido).subscribe(
        response => {
          this.snackBar.open('Pedido salvo com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.dialogRef.close(response);
        },
        error => {
          console.error('Erro ao salvar pedido', error);
          this.snackBar.open(`Erro ao salvar pedido: ${error.message}`, 'Fechar', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Formulário inválido. Verifique os campos e tente novamente.', 'Fechar', {
        duration: 3000,
      });
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
