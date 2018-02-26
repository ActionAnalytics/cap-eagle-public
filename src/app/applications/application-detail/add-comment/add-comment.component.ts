import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/forkJoin';

import { Comment } from 'app/models/comment';
import { Document } from 'app/models/document';
import { CommentPeriod } from 'app/models/commentperiod';
import { CommentService } from 'app/services/comment.service';
import { DocumentService } from 'app/services/document.service';

export interface DataModel {
  title: string; // not used
  message: string; // not used
  currentPeriod: CommentPeriod;
}

@Component({
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
  animations: [
    trigger('visibility', [
      transition(':enter', [   // :enter is alias to 'void => *'
        animate('0.2s 0s', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate('0.2s 0.75s', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AddCommentComponent extends DialogComponent<DataModel, boolean> implements DataModel {
  public title: string;
  public message: string;
  public currentPeriod: CommentPeriod;

  private submitting = false;
  private progressValue: number;
  private progressBufferValue: number;
  private totalSize: number;
  private currentPage = 1;
  private comment: Comment;
  public files: Array<File> = [];

  constructor(
    public dialogService: DialogService,
    private commentService: CommentService,
    private documentService: DocumentService
  ) {
    super(dialogService);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.comment = new Comment();
    this.comment._commentPeriod = this.currentPeriod._id;
    this.comment.commentAuthor.requestedAnonymous = false;
  }

  private p1_next() { this.currentPage++; }

  private p2_back() { this.currentPage--; }

  private p2_submit() { this.currentPage++; }

  private p3_back() { this.currentPage--; }

  private p3_submit() {
    this.submitting = true;
    this.progressValue = this.progressBufferValue = 0;

    // approximate size of everything for progress reporting
    const commentSize = this.sizeof(this.comment);
    this.totalSize = commentSize;
    this.files.forEach(file => this.totalSize += file.size);

    // first add new comment
    this.progressBufferValue += 100 * commentSize / this.totalSize;
    this.commentService.add(this.comment).toPromise()
      .then(
        comment => {
          this.progressValue += 100 * commentSize / this.totalSize;
          this.comment = comment;
          return comment;
        }
      )
      .then(comment => {
        // then upload all documents
        const observables: Array<Observable<Document>> = [];

        this.files.forEach(file => {
          const formData = new FormData();
          formData.append('_comment', this.comment._id);
          formData.append('displayName', file.name);
          formData.append('upfile', file);
          this.progressBufferValue += 100 * file.size / this.totalSize;
          observables.push(this.documentService.upload(formData)
            .map(
              document => {
                this.progressValue += 100 * file.size / this.totalSize;
                console.log('document =', document);
                return document;
              }
            )
          );
        });

        // execute all uploads in parallel
        return Observable.forkJoin(observables).toPromise();
      })
      .then(() => {
        this.result = true;
        this.submitting = false;
        this.currentPage++;
      })
      .catch(error => {
        alert('Uh-oh, error submitting comment');
        this.result = false;
        this.submitting = false;
      });
  }

  // approximate size (keys + data)
  private sizeof(object: Object) {
    let bytes = 0;

    Object.keys(object).forEach(key => {
      bytes += key.length;
      const obj = object[key];
      switch (typeof obj) {
        case 'boolean': bytes += 4; break;
        case 'number': bytes += 8; break;
        case 'string': bytes += 2 * obj.length; break;
        case 'object': if (obj) { bytes += this.sizeof(obj); } break;
      }
    });
    return bytes;
  }
}
