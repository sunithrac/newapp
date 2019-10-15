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
    let searchValues = this.searchForm.value.searchTxt;
    searchValues.replace(/\"/g, "")
      .split(',')
      .filter(value => value.trim().length)
      .map(res => {
        const val = res.split(':');
        this.searchItems[val.shift()] = val.pop();
        this.reBuildTag(this.searchItems);
      });
  }
  reBuildTag(searchItems) {
    this.tagItem = [];
    Object.entries(this.searchItems).map(([key, value]) => { this.tagItem.push(`${key}: ${value}`) });
    this.searchForm.controls['searchTxt'].setValue(this.tagItem);
    this.searchForm.value.searchTxt = '';
  }
  remove(value) {
    delete this.searchItems[value.split(':').shift()];
    this.reBuildTag(this.searchItems);
  }

}


