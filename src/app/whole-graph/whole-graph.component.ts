import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Statement } from '../Statement';
import { GraphNode } from '../GraphNode';
import { Link } from '../Link';
import { GraphReaderService } from '../graph-reader.service';
import * as go from 'gojs';
import {location} from 'ngx-bootstrap/utils/facade/browser';

@Component({
  selector: 'app-whole-graph',
  templateUrl: './whole-graph.component.html',
  styleUrls: ['./whole-graph.component.css']
})
export class WholeGraphComponent implements OnInit {

  statements: Statement[];
  graphNodes: GraphNode[] = [];
  links: Link[] = [];
  stmt = [];
  results = '';
  i = 0;
  sub = 'Airport';
  pred = 'Typeof';
  location = '10 200';
  v = 'visitha#manujaay';
  subjects: any;
  objects: any;
  predicates: any;

  x = [
    { 'key': 1, 'loc': '230 450', 'text': 'Location' },
    { 'key': 2, 'loc': '20 40', 'text': 'Airport'},
    { 'key': 3, 'loc': '500 250', 'text': 'Address'},
    { 'key': 4, 'loc': '900 800', 'text': 'OriginAirport'}
  ];
  y = [
    { from: 2, to: 1, text: 'Typeof' },
    { from: 3, to: 1, text: 'Typeof' },
    { from: 4, to: 2, text: 'Typeof' },
    { from: 2, to: 3, text: 'Has' },
    { from: 4, to: 1, text: 'Typeof' }
  ];

  model: any;
  graphNode: any;
  link: any;

  constructor(private greader: GraphReaderService) {

    this.subjects = greader.getSubjects();
    this.predicates = greader.getPredicates();
  }

  ngOnInit() {

    console.log(this.v.split('#')[1]);
    this.getStatements();
    this.model = new go.GraphLinksModel(this.x, this.y);
  }

  getStatements(): void {

       this.results = this.greader.getStatements().subscribe(
         (data: any) => {
           this.results = JSON.parse(JSON.stringify(data['graph']));
           console.log(this.results);
           this.drawGraph(this.results);
         }
       );
  }

  getNeighbours(): void {
    this.results = this.greader.getNeighbours(this.sub, this.pred).subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['relations']));
        console.log(this.results);
        this.drawRelations(this.results, this.sub);
      }
    );
  }
  resolveRoot(): void {
    this.results = this.greader.resolveRoot(this.sub, this.pred).subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['roots']));
        console.log(this.results);
        this.drawRoot(this.results, this.sub, this.pred);
      }
    );
  }

  getParents(): void {
    this.results = this.greader.getParents().subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['parents']));
        console.log(this.results);
        this.drawParents(this.results);
      }
    );
  }

  drawGraph(results: any): void {
    this.i = 0;
    const map = new Map();
    this.graphNodes = [];
    this.links = [];

    for ( const concept of results) {
      map.set(concept.subject, this.i);
      map.set(concept.object, this.i + 1);
      this.i = this.i + 2;
    }

    for ( const concept of results) {
      this.link = new Link();
      this.link.from = map.get(concept.subject);
      this.link.to = map.get(concept.object);
      this.link.text = this.getName(concept.predicate);
      this.link.uri = concept.predicate;

      this.links.push(this.link);
    }

    map.forEach((value: number, key: string) => {
      this.graphNode = new GraphNode();
      this.graphNode.key = value;
      this.graphNode.loc = this.getLocation(1200, 0);
      this.graphNode.text = this.getName(key);
      this.graphNode.uri = key;
      this.graphNodes.push(this.graphNode);
    });

    this.model = new go.GraphLinksModel(this.graphNodes, this.links);
  }

  drawRelations(results: any, sub: string): void {
    console.log(sub);
    this.i = 0;
    const map = new Map();
    this.graphNodes = [];
    this.links = [];

    map.set(sub, this.i);
    this.i = this.i + 1;
    for ( const concept of results) {
      map.set(concept.object, this.i);
      this.i = this.i + 1;
    }

    for ( const concept of results) {
      this.link = new Link();
      this.link.from = map.get(sub);
      this.link.to = map.get(concept.object);
      this.link.text = this.getName(concept.predicate);
      this.link.uri = concept.predicate;

      this.links.push(this.link);
    }

    map.forEach((value: number, key: string) => {
      this.graphNode = new GraphNode();
      this.graphNode.key = value;
      this.graphNode.loc = this.getLocation(600, 200);
      this.graphNode.text = this.getName(key);
      this.graphNode.uri = key;
      this.graphNodes.push(this.graphNode);
    });

    this.model = new go.GraphLinksModel(this.graphNodes, this.links);
  }

  drawRoot(results: any, sub: string, pred: string): void {
    this.i = 0;
    const map = new Map();
    this.graphNodes = [];
    this.links = [];

    for ( const concept of results) {
      map.set(concept.object, this.i);
      this.i = this.i + 1;
    }

    this.i = 0;
    for ( const concept of results) {
      this.link = new Link();
      this.link.from = 0;
      if (this.i === 0) {
        this.i = this.i + 1;
        continue;
      }
      this.link.to = map.get(concept.object);
      this.link.text = pred;
      this.link.uri = '';

      this.links.push(this.link);
    }

    map.forEach((value: number, key: string) => {
      this.graphNode = new GraphNode();
      this.graphNode.key = value;
      this.graphNode.loc = this.getLocation(600, 200);
      this.graphNode.text = this.getName(key);
      this.graphNode.uri = key;
      this.graphNodes.push(this.graphNode);
    });

    this.model = new go.GraphLinksModel(this.graphNodes, this.links);
  }

  drawParents(results: any): void {
    this.i = 0;
    this.graphNodes = [];
    this.links = [];
    for ( const concept of results) {
      this.graphNode = new GraphNode();
      this.graphNode.key = this.i;
      this.graphNode.loc = this.getLocation(400, 200);
      this.graphNode.text = this.getName(concept.parent);
      if (this.getName(concept.parent) === 'Concept') {
        continue;
      }
      this.graphNode.uri = concept.parent;
      this.graphNodes.push(this.graphNode);
      this.i = this.i + 1;
    }
    this.model = null;
    this.model = new go.GraphLinksModel(this.graphNodes, this.links);
  }

  getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 25)) + min;
  }

  getLocation(min, max): string {
    this.location = '' + this.getRandomInt(min, max) + ' ' + this.getRandomInt(min, max) + '';
    return this.location;

  }

  getName(uri: string): string {
    this.stmt = uri.split('#');
    return (this.stmt.length > 1 ? this.stmt[1] : this.stmt[0]);
  }

}

