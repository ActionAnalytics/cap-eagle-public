import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { Comment } from 'app/models/comment';
import { CommentService } from 'app/services/comment.service';

export interface DataModel {
  title: string; // not used
  message: string; // not used
  commentId: string;
}

@Component({
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss']
})

export class ViewCommentComponent extends DialogComponent<DataModel, boolean> implements DataModel {
  public title: string;
  public message: string;
  public commentId: string;

  public comment: Comment;
  public showAlert: boolean; // for attachment error

  constructor(
    public dialogService: DialogService,
    private commentService: CommentService
  ) {
    super(dialogService);
    this.showAlert = false;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    console.log('period id=', this.commentId);
  }

  save() {
    // we set dialog result as true on click of save button
    // then we can get dialog result from caller code
    this.result = true;
    alert('Save is not yet implemented');
    // this.close();
  }
}
