import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface SearchKey {
  [key: string]: Object[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {

  searchForm: FormGroup;
  searchItems: Array<SearchKey>;
  removable = true;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTxt: ['', Validators.required]
    });

  }

  search(searchText) {

    let searchValue = searchText.replace(/\"/g, "");
    let splitValues = searchValue.split(',');
  
    this.searchItems = splitValues.filter(function (value) {
      return value.trim() != '';
    });
    this.searchForm.controls.searchTxt.setValue(this.searchItems);

  }
  remove(i) {
    this.searchItems.splice(i, 1);
    this.searchForm.controls.searchTxt.setValue(this.searchItems);
  }

}


