import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddNodeComponent } from './add-node/add-node.component';
import { DeleteNodeComponent } from './delete-node/delete-node.component';
import { AddRelationComponent } from './add-relation/add-relation.component';
import { DeleteRelationComponent } from './delete-relation/delete-relation.component';
import { WholeGraphComponent } from './whole-graph/whole-graph.component';

const routes: Routes = [
  { path: '', redirectTo: '/graph', pathMatch: 'full' },
  { path: 'addnode', component: AddNodeComponent },
  { path: 'deletenode', component: DeleteNodeComponent },
  { path: 'addrelation', component: AddRelationComponent },
  { path: 'deleterelation', component: DeleteRelationComponent },
  { path: 'graph', component: WholeGraphComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
