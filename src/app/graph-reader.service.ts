import { Injectable } from '@angular/core';
import { Statement } from './Statement';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Link} from './Link';


@Injectable()
export class GraphReaderService {

  getUrl = 'http://127.0.0.1:5000/Rozie/';
  uri = '';
  results = '';
  set = new Set();
  subjects = new Set();
  objects = new Set();
  predicates = new Set();

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

  constructor(private http: HttpClient) {

    this.http.get('http://127.0.0.1:5000/Rozie/graph'). subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['graph']));

        for ( const concept of this.results) {
          this.subjects.add(concept['subject'].split('#')[1]);
          this.objects.add(concept['object'].split('#')[1]);
        }
      }
    );

    this.http.get('http://127.0.0.1:5000/Rozie/graph/properties'). subscribe(
      (data: any) => {
        this.results = JSON.parse(JSON.stringify(data['properties']));

        for ( const concept of this.results) {
          this.predicates.add(concept['property'].split('#')[1]);
        }
      }
    );
  }

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
  getSubjects(): any {
    return this.subjects;
  }

  getObjects(): any {
    return this.objects;
  }

  getPredicates(): any {
    return this.predicates;
  }


}
