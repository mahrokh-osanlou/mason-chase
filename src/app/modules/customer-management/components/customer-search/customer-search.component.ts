import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatExpansionPanel } from "@angular/material/expansion";
import { debounceTime } from "rxjs";
import { CustomerManagementService } from "../../services/customer.service";

@Component({
  selector: "app-customer-search",
  templateUrl: "./customer-search.component.html",
  styleUrls: ["./customer-search.component.scss"],
})
export class CustomerSearchComponent implements OnInit {
  @ViewChild("searchInput", { read: ElementRef })
  searchInput: ElementRef;

  @ViewChild("email", { read: MatAutocompleteTrigger })
  emialAuto: MatAutocompleteTrigger;

  @ViewChild("name", { read: MatAutocompleteTrigger })
  nameAuto: MatAutocompleteTrigger;

  @ViewChild("expansionPanel", { read: MatExpansionPanel })
  expansionPanel: MatExpansionPanel;

  expandable: boolean = true;
  state: boolean = false;
  clickOnExportBTN: boolean = false;
  showSearchHeader: boolean = true;

  emailInputFormControl: FormControl = new FormControl();
  nameInputFormControl: FormControl = new FormControl();

  filterIsOpenStatus: boolean = false;
  index: number = 0;

  Name = "";
  Email = "";
  constructor(public customerManagementService: CustomerManagementService) {
    let subscript: any;
    subscript = this.emailInputFormControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((term) => {
        let customerEmailList: any = [];
        if (term == undefined) return;
        if (term == null || term == "") {
          this.customerManagementService.dataSource.data.forEach(
            (item: any) => {
              customerEmailList.push(item.Email);
            }
          );
          this.continueSearch();
        } else if (term) {
          customerEmailList = this.customerManagementService.list.email.filter(
            (item: any) => {
              return item.toLowerCase().includes(term);
            }
          );
        }
        this.customerManagementService.emailList.next(customerEmailList);
      });

    subscript = this.nameInputFormControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((term) => {
        let customerList: any = [];
        if (term == undefined) return;
        if (term == null || term == "") {
          this.customerManagementService.dataSource.data.forEach(
            (item: any) => {
              customerList.push(item.Firstname + " " + item.Lastname);
            }
          );
          this.continueSearch();
        } else if (term) {
          customerList = this.customerManagementService.list.name.filter(
            (item: any) => {
              return item.toLowerCase().includes(term.toLowerCase());
            }
          );
        }
        this.customerManagementService.nameList.next(customerList);
      });
  }

  ngOnInit(): void {}

  continueSearch() {
    if (
      (!this.Name && !this.Email) ||
      this.Name == "Select All" ||
      this.Email == "Select All"
    ) {
      this.customerManagementService.data.data =
        this.customerManagementService.dataSource.data.slice(0, 10);
      this.customerManagementService.pageEvent.length =
        this.customerManagementService.dataSource.data.length;
      this.customerManagementService.searchMode = false;
    } else {
      this.searchOnFilter();
    }
  }

  expansion_onOpen(sender: any) {
    if (
      this.expandable == false &&
      sender.expanded != false &&
      this.state == false
    ) {
      sender.close();
    }
    if (this.expandable != false && sender.expanded != false) {
      this.showSearchHeader = false;
      this.customerManagementService.searchModeStatus = true;
    }
  }

  expansion_onClose(sender: any) {
    if (
      this.expandable == false &&
      sender.expanded == false &&
      this.state == true
    ) {
      sender.open();
    }
    if (this.expandable != false && sender.expanded == false) {
      this.showSearchHeader = true;
      this.customerManagementService.searchModeStatus = false;
    }
  }

  searchInput_onFocus() {
    this.expandable = false;
    if (this.expansionPanel) this.state = this.expansionPanel.expanded;
  }

  searchInput_onBlur() {
    this.expandable = true;
  }

  searchInput_onKeyDown(sender: KeyboardEvent) {
    sender.stopPropagation();
  }

  searchOnFilter() {
    if (this.Name || this.Email) {
      let list: any[] = [];
      this.customerManagementService.pageEvent.pageIndex = 0;
      this.customerManagementService.dataSource.data.forEach((item) => {
        if (
          this.Name &&
          item.fullName.toLowerCase().includes(this.Name.toLowerCase()) &&
          this.Name != ""
        ) {
          list.push(item);
        } else if (
          this.Email &&
          item.Email.toLowerCase().includes(this.Email.toLowerCase()) &&
          this.Email != ""
        ) {
          list.push(item);
        }
      });
      this.customerManagementService.searchMode = true;
      this.customerManagementService.data.data = list.slice(0, 10);
      this.customerManagementService.dataSourceSearch.data = list;
      this.customerManagementService.lengthSearch =
        this.customerManagementService.dataSourceSearch.data.length;
    }
  }

  OnClearFilter() {
    this.customerManagementService.searchMode = false;
    this.customerManagementService.searchModeStatus = false;
    this.Name = "";
    this.Email = "";
    const name: any[] = [];
    const email: any[] = [];
    this.customerManagementService.dataSource.data.forEach((item) => {
      name.push(item.name);
      email.push(item.email);
    });
    this.customerManagementService.nameList.next(name);
    this.customerManagementService.emailList.next(email);
    this.expansionPanel.close();
    setTimeout(() => {
      this.customerManagementService.data.data =
        this.customerManagementService.dataSource.data.slice(0, 10);
    }, 500);
  }
}
