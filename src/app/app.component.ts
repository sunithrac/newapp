import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  searchItems: SearchKey = {};
  removable = true;
  serachTest = ' ';
  splitcolonValues: any;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTxt: ['', Validators.required]
    });

  }

  search(searchText) {
    let searchValues = searchText.replace(/\"/g, "");
    let splitValues = searchValues.split(',');
    let removeEmptyValues = splitValues.filter(function (value) {
      return value.trim() != '';
    });
    this.splitcolonValues = [];
    removeEmptyValues.forEach(element => {
      this.splitcolonValues.push(element.split(':'));
    });
    this.searchItems = this.splitcolonValues.map(function (res) {
      let key = res[0];
      let value = res[1];
      return { key, value };
    });
  }
  remove(i) {
   this.searchItems.splice(i, 1);
   
    let tempItem = [];
    this.searchItems.map(function (element) {
      tempItem.push(element.key+':'+element.value);
    });
    this.searchForm.controls['searchTxt'].setValue(tempItem);
    this.search(this.searchForm.value);
  }

}


