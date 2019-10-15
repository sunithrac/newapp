import { Component, ViewChild, TemplateRef, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page, CorporateEmployee } from './model/data';
import { NgStyle } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { element } from 'protractor';

export interface SearchKey {
  [key: string]: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {

  searchForm: FormGroup;
  searchItems: SearchKey;
  removable = true;
  rows: any;
  columns: any;

  @ViewChild('myTable', { static: false }) table;

  tagItem: any[];

  constructor(
    private formBuilder: FormBuilder, private resolver: ComponentFactoryResolver
  ) {

  }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      searchTxt: ['', Validators.required]
    });
    this.rows = [
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    this.columns = [
      { name: 'name' },
      { name: 'Gender' },
      { name: 'Company' }
    ];
  }


  search() {
    this.searchItems = {};
    this.searchForm.value.searchTxt.replace(/\"/g, "").split(',').filter(value => { return value.trim() != '' }).map(element => { return element.split(':') }).map(data => { return this.searchItems[data[0]] = data[1] });
    this.tagItem = [];
    Object.entries(this.searchItems).map(element => { return this.tagItem.push(element[0] + ':' + element[1]) });
    this.searchForm.controls['searchTxt'].setValue(this.tagItem);
  }
  remove(value) {
    delete this.searchItems[value.split(':')[0]];
    this.tagItem = this.tagItem.filter(item => {
      if (item !== value) 
      return true;
    });
    this.searchForm.controls['searchTxt'].setValue(this.tagItem);
  }

}


