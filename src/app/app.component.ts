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
    this.searchItems = [];
    let searchValues = this.searchForm.value.searchTxt;
    this.searchItems = searchValues.replace(/\"/g, "")
      .split(',')
      .filter(value => value.trim().length)
      .map(res => {
        const val = res.split(':');
        if (val[0] && val[1]) {
          return { 'searchKey': val.shift(), 'searchValue': val.pop() };
        }
        return null;
      })
      .filter(data => data !== null);
    this.reBuildTag(this.searchItems);
  }
  private reBuildTag(searchItems) {
    this.tagItem = [];
    this.searchItems.map(values => { this.tagItem.push(values.searchKey + ':' + values.searchValue) });
    this.searchForm.controls['searchTxt'].setValue('"' + this.tagItem.join('","') + '"');
  }
  remove(index) {
    this.searchItems.splice(index, 1);
    this.reBuildTag(this.searchItems);
  }

}


