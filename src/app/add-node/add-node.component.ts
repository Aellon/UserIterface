import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphReaderService } from '../graph-reader.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})

export class AddNodeComponent implements OnInit {

  rForm: FormGroup;
  results = '';
  post: any;

  opt = 'add';
  sub = 'sdsdssdsdsdsdsdsds';
  pred = '';
  obj = '';
  subNs = 'ex';
  predNs = '';
  objNs = 'ex';
  jsnObjc = {};

  objects: any;
  predicates: any;

  constructor(private fb: FormBuilder, private greader: GraphReaderService) {

      this.rForm = fb.group({
        'sub': [null, Validators.required],
        'pred': [null, Validators.required],
        'obj': [null, Validators.required],
        'predNs': [null, Validators.required],
      });

    this.objects = greader.getSubjects();
    this.predicates = greader.getPredicates();
  }

  addPost(post) {
      this.sub = post.sub;
      this.pred = post.pred;
      this.obj = post.obj;
      this.predNs = post.predNs;

      this.jsnObjc['option'] = 'add';
      this.jsnObjc['subject'] = this.sub;
      this.jsnObjc['predicate'] = this.pred;
      this.jsnObjc['objct'] = this.obj;
      this.jsnObjc['subNs'] = this.subNs;
      this.jsnObjc['predNs'] = this.predNs;
      this.jsnObjc['objctNs'] = this.objNs;

      this.obj = JSON.parse(JSON.stringify(this.jsnObjc));

    this.results = this.greader.addConcept(this.obj).subscribe(
      (data: any) => {
        alert(data['status'][0]['status']);
        window.location.replace('/graph');
      }
    );
  }

  ngOnInit() {
  }

}
