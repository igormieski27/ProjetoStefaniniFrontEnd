import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoService } from '../../services/pedido.service';
import { ProdutoService } from '../../services/produto.service';
import { PedidoCreateComponent } from '../pedido-create/pedido-create.component';
import { ProdutoCreateComponent } from '../produto-create/produto-create.component';
import { PedidoDetailComponent } from '../pedido-detail/pedido-detail.component';


@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeCliente', 'emailCliente', 'pago', 'acoes'];
  produtoDisplayedColumns: string[] = ['id', 'nomeProduto', 'valor', 'acoes'];
  dataSource = new MatTableDataSource<any>();
  produtoDataSource = new MatTableDataSource<any>();

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
    this.loadProdutos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.dataSource.data = pedidos;
    });
  }

  loadProdutos(): void {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtoDataSource.data = produtos;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PedidoCreateComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPedidos();
      }
    });
  }

  openCreateProdutoDialog(): void {
    const dialogRef = this.dialog.open(ProdutoCreateComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProdutos();
      }
    });
  }

  openDetailDialog(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe(
      pedido => {
        this.dialog.open(PedidoDetailComponent, {
          width: '600px',
          data: pedido
        });
      },
      error => {
        console.error('Erro ao buscar os detalhes do pedido', error);
      }
    );
  }

  deletePedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe(() => {
      this.loadPedidos();
    });
  }

  editPedido(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe(pedido => {
      const dialogRef = this.dialog.open(PedidoCreateComponent, {
        width: '400px',
        data: pedido
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadPedidos();
        }
      });
    });
  }


  deleteProduto(id: number): void {
    this.produtoService.deleteProduto(id).subscribe(() => {
      this.loadProdutos();
    });
  }

  editProduto(id: number): void {
    this.produtoService.getProdutoById(id).subscribe(produto => {
      const dialogRef = this.dialog.open(ProdutoCreateComponent, {
        width: '400px',
        data: produto
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadProdutos();
        }
      });
    });
  }
}
