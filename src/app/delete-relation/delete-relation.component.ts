import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphReaderService } from '../graph-reader.service';

@Component({
  selector: 'app-delete-relation',
  templateUrl: './delete-relation.component.html',
  styleUrls: ['./delete-relation.component.css']
})
export class DeleteRelationComponent implements OnInit {
  rForm: FormGroup;
  results = '';
  obj = '';
  post: any;

  opt = 'delete';
  sub = '';
  domain = '';
  range = '';
  subNs = '';
  domNs = '';
  rnNs = '';
  jsnObjc = {};

  constructor(private fb: FormBuilder, private greader: GraphReaderService) {

    this.rForm = fb.group({
      'sub': [null, Validators.required],
      'subNs': [null, Validators.required]
    });
  }

  addPost(post) {
    this.sub = post.sub;
    this.subNs = post.subNs;

    this.jsnObjc['option'] = this.opt;
    this.jsnObjc['subject'] = this.sub;
    this.jsnObjc['domain'] = this.domain;
    this.jsnObjc['range'] = this.range;
    this.jsnObjc['subNs'] = this.subNs;
    this.jsnObjc['domNs'] = this.domNs;
    this.jsnObjc['rnNs'] = this.rnNs;

    this.obj = JSON.parse(JSON.stringify(this.jsnObjc));

    this.results = this.greader.deleteRelation(this.obj).subscribe(
      (data: any) => {
        alert(data['status'][0]['status']);
        window.location.replace('/graph');
      }
    );
  }
  ngOnInit() {
  }

}
