import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphReaderService } from '../graph-reader.service';

@Component({
  selector: 'app-add-relation',
  templateUrl: './add-relation.component.html',
  styleUrls: ['./add-relation.component.css']
})
export class AddRelationComponent implements OnInit {
  rForm: FormGroup;
  results = '';
  obj = '';
  post: any;

  opt = 'add';
  sub = '';
  domain = '';
  range = '';
  subNs = 'ex';
  domNs = 'ex';
  rnNs = 'ex';
  jsnObjc = {};
  subjects: any;
  objects: any;
  predicates: any;

  constructor(private fb: FormBuilder, private greader: GraphReaderService) {

    this.rForm = fb.group({
      'sub': [null, Validators.required],
      'domain': [null, Validators.required],
      'range': [null, Validators.required]
    });

    this.subjects = greader.getSubjects();
    this.predicates = greader.getPredicates();
    this.objects = greader.getPredicates();
  }

  addPost(post) {
    this.sub = post.sub;
    this.domain = post.domain;
    this.range = post.range;

    this.jsnObjc['option'] = 'add';
    this.jsnObjc['subject'] = this.sub;
    this.jsnObjc['domain'] = this.domain;
    this.jsnObjc['range'] = this.range;
    this.jsnObjc['subNs'] = this.subNs;
    this.jsnObjc['domNs'] = this.domNs;
    this.jsnObjc['rnNs'] = this.rnNs;

    this.obj = JSON.parse(JSON.stringify(this.jsnObjc));

    this.results = this.greader.addRelation(this.obj).subscribe(
      (data: any) => {
        alert(data['status'][0]['status']);
        window.location.replace('/graph');
      }
    );
  }

  ngOnInit() {
  }

}
