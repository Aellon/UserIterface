import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphReaderService } from '../graph-reader.service';

@Component({
  selector: 'app-delete-node',
  templateUrl: './delete-node.component.html',
  styleUrls: ['./delete-node.component.css']
})
export class DeleteNodeComponent implements OnInit {
  rForm: FormGroup;
  results = '';
  obj = '';
  post: any;

  opt = 'delete';
  sub = '';
  pred = '';
  objt = '';
  subNs = 'ex';
  predNs = '';
  objNs = '';
  jsnObjc = {};

  objects: any;
  predicates: any;
  constructor(private fb: FormBuilder, private greader: GraphReaderService) {

    this.rForm = fb.group({
      'sub': [null, Validators.required],
    });

    this.objects = greader.getSubjects();
    this.predicates = greader.getPredicates();

  }

  addPost(post) {
    this.sub = post.sub;

    this.jsnObjc['option'] = this.opt;
    this.jsnObjc['subject'] = this.sub;
    this.jsnObjc['predicate'] = this.pred;
    this.jsnObjc['objct'] = this.objt;
    this.jsnObjc['subNs'] = this.subNs;
    this.jsnObjc['predNs'] = this.predNs;
    this.jsnObjc['objctNs'] = this.objNs;

    this.obj = JSON.parse(JSON.stringify(this.jsnObjc));

    this.results = this.greader.deleteConcept(this.obj).subscribe(
      (data: any) => {
        alert(data['status'][0]['status']);
        window.location.replace('/graph');
      }
    );
  }

  ngOnInit() {
  }

}
