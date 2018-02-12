import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import * as FileSaver from 'file-saver';

import { Comment } from 'app/models/comment';
import { CommentPeriod } from 'app/models/commentperiod';
import { CommentService } from 'app/services/comment.service';

export interface DataModel {
  title: string; // not used
  message: string; // not used
  currentPeriod: CommentPeriod;
}

@Component({
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})

export class AddCommentComponent extends DialogComponent<DataModel, boolean> implements DataModel {
  public title: string;
  public message: string;
  public currentPeriod: CommentPeriod;

  public comment: Comment;
  public dateAdded: NgbDateStruct;
  public showAlert: boolean; // for attachment error
  private currentPage = 0;

  constructor(
    public dialogService: DialogService,
    private commentService: CommentService
  ) {
    super(dialogService);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.showAlert = false;
    console.log('comment period id=', this.currentPeriod._id);
    this.currentPage = 1;
  }

  private p1_accept() { this.currentPage++; }

  private p2_back() { this.currentPage--; }

  private p2_next() { this.currentPage++; }

  private p3_back() { this.currentPage--; }

  private p3_submit() {
    // first upload all attached files
    // then save new comment (with document ids)

    // we set dialog result as true on click of submit button
    // then we can get dialog result from caller code
    // may not be needed here
    this.result = true;
    // alert('Submit is not yet implemented');
    this.currentPage++;
  }
}
