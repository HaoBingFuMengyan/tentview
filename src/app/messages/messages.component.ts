import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
/**
 * 这个messageService属性必须为public的属性，因为你将在模版中绑定到它。Angular 只会绑定到组件的公共属性。
 * @param {MessageService} public messageService [description]
 */
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
