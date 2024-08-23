import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { PedidoDetailComponent } from './components/pedido-detail/pedido-detail.component';


const routes: Routes = [
  { path: 'pedidos', component: PedidoListComponent },
  { path: 'pedidos/:id', component: PedidoDetailComponent },
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
