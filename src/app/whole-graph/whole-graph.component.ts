import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Statement } from '../Statement';
import { GraphReaderService } from '../graph-reader.service';
import * as go from 'gojs';

@Component({
  selector: 'app-whole-graph',
  templateUrl: './whole-graph.component.html',
  styleUrls: ['./whole-graph.component.css']
})
export class WholeGraphComponent implements OnInit {

  statements: Statement[];
  stmt = '';
  results = '';

  sub = 'Airport';
  pred = 'Typeof';
  x = [
    { key: 1, text: 'Location' },
    { key: 2, text: 'Airport'},
    { key: 3, text: 'Address'},
    { key: 4, text: 'OriginAirport'}
  ];
  y = [
    { from: 2, to: 1, text: 'Typeof' },
    { from: 3, to: 1, text: 'Typeof' },
    { from: 4, to: 2, text: 'Typeof' },
    { from: 2, to: 3, text: 'Has' },
    { from: 4, to: 1, text: 'Typeof' }
  ];

  model: any;

  constructor(private greader: GraphReaderService) { }

  ngOnInit() {

    this.model = new go.GraphLinksModel(this.x, this.y);
    this.resolveRoot();
  }

  getStatements(): void {

       this.results = this.greader.getStatements().subscribe(
         (data: any) => {
           this.results = JSON.parse(JSON.stringify(data['graph']));
         }
       );
  }

  getNeighbours(): void {
    this.results = this.greader.getNeighbours(this.sub, this.pred).subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['relations']));
        console.log(this.results);
      }
    );
  }
  resolveRoot(): void {
    this.results = this.greader.resolveRoot(this.sub, this.pred).subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['roots']));
        console.log(this.results);
      }
    );
  }

  getParents(): void {
    this.results = this.greader.getParents().subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['parents']));
        console.log(this.results);
      }
    );
  }

}
