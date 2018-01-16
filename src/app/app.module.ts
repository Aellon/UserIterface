import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNodeComponent } from './add-node/add-node.component';
import { DeleteNodeComponent } from './delete-node/delete-node.component';
import { AddRelationComponent } from './add-relation/add-relation.component';
import { DeleteRelationComponent } from './delete-relation/delete-relation.component';
import { WholeGraphComponent } from './whole-graph/whole-graph.component';
import { AppRoutingModule } from './/app-routing.module';
import { AlertModule } from 'ngx-bootstrap';
import { GraphReaderService } from './graph-reader.service';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNodeComponent,
    DeleteNodeComponent,
    AddRelationComponent,
    DeleteRelationComponent,
    WholeGraphComponent,
    DiagramEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [GraphReaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
