import { Component, OnInit, EventEmitter, Output, Input, Optional } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @Output() output = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
