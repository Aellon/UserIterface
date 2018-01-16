import { Injectable } from '@angular/core';
import { Statement } from './Statement';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class GraphReaderService {

  getUrl = 'http://127.0.0.1:5000/Rozie/';
  uri = '';

  statements = [
    {
      subject: 'visithasdhfhsdfuhsvfusvdfsdvjfvjdshfjsdvfjkhsdjfskdjhfbsjdhbfskdhfvkjhsdfjksdvfjhsdfjkhsdbjkfrgfuygrwuyfuys',
      predicate: 'is a',
      objct: 'good'
    },
    {
      subject: 'Minura',
      predicate: 'is a',
      objct: 'nice'
    }
  ];

  constructor(private http: HttpClient) { }

  getStatements(): any {
    return this.http.get('http://127.0.0.1:5000/Rozie/graph');
   }

   getParents(): any {
    return this.http.get('http://127.0.0.1:5000/Rozie/graph/parents');
   }

  getNeighbours(sub, pred): any {
    this.uri = this.getUrl + 'relations/' + sub + '/' + pred + '/' + 'yes';
    return this.http.get(this.uri);
  }

  resolveRoot(sub, pred): any {
    this.uri = this.getUrl + 'resolve/' + sub + '/' + pred;
    return this.http.get(this.uri);
  }

  addConcept(JSNObjct): any {
    this.uri  = this.getUrl + 'update/concepts';
    return this.http.post(this.uri, JSNObjct);
  }

  deleteConcept(JSNObjct): any {
      this.uri  = this.getUrl + 'update/concepts';
      return this.http.post(this.uri, JSNObjct);
    }

  addRelation(JSNObjct): any {
      this.uri  = this.getUrl + 'update/relations';
      return this.http.post(this.uri, JSNObjct);
    }

  deleteRelation(JSNObjct): any {
    this.uri  = this.getUrl + 'update/relations';
    return this.http.post(this.uri, JSNObjct);
  }

}
