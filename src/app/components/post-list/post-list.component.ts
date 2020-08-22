import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts;
  @Input() identity;
  @Input() url;

  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deletePost(id){
    this.delete.emit(id);
  }

}
