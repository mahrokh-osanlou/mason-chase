import { Injectable } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Customer } from "../models/customer.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class CustomerManagementService {
  data = new MatTableDataSource<any>([]);
  dataSource = new MatTableDataSource<any>([]);
  dataSourceSearch = new MatTableDataSource<any>([]);
  result: boolean = false;
  lengthSearch: number = 0;
  searchMode: boolean = false;
  searchModeStatus: boolean = false;
  editMode: boolean = false;
  selectedIndex: number = 0;
  list = {
    name: [],
    email: [],
  };
  emailList: BehaviorSubject<any> = new BehaviorSubject([]);
  nameList: BehaviorSubject<any> = new BehaviorSubject([]);
  emails = new Set();
  firstNames = new Set();
  lastNames = new Set();
  birthdates = new Set();
  errorList = [];
  success: boolean = false;
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
    length: 0,
  };
  loadingCustomer: boolean = false;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl("", [Validators.required]);
  lastNameFormControl = new FormControl("", [Validators.required]);
  birthDateFormControl = new FormControl("", [Validators.required]);
  bankAccountNumberFormControl = new FormControl(null, [Validators.required]);
  phoneFormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern(
      "(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})"
    ),
  ]);
  customer: Customer = {
    Firstname: this.firstNameFormControl.value,
    Lastname: this.lastNameFormControl.value,
    DateOfBirth: this.birthDateFormControl.value,
    PhoneNumber: this.phoneFormControl.value,
    Email: this.emailFormControl.value,
    BankAccountNumber: this.bankAccountNumberFormControl.value,
  };
  exist: any = null;
  phoneIsValid: any = {};

  constructor(private router: Router, private snakeBar: MatSnackBar) {}

  customerList() {
    const datePipe = new DatePipe("en-US");
    this.loadingCustomer = true;
    const list = localStorage.getItem("customerList");
    const customerList = typeof list == "string" ? JSON.parse(list) : null;
    const emailList: any = [];
    const nameList: any = [];
    customerList?.forEach((element: Customer) => {
      this.emails.add(element.Email.toLowerCase());
      this.firstNames.add(element.Firstname.toLowerCase());
      this.lastNames.add(element.Lastname.toLowerCase());
      this.birthdates.add(datePipe.transform(element.DateOfBirth));
      emailList.push(element.Email);
      nameList.push(element.Firstname + " " + element.Lastname);
    });
    const customers = customerList?.map((el: any) => {
      return {
        ...el,
        fullName: el.Firstname + " " + el.Lastname,
      };
    });
    this.list = {
      name: nameList,
      email: emailList,
    };
    this.emailList.next(emailList);
    this.nameList.next(nameList);
    this.dataSource = new MatTableDataSource(customers);
    this.data.data = this.dataSource.data.slice(0, 10);
    this.pageEvent.length = customers?.length;
    this.loadingCustomer = false;
  }

  addCustomer() {
    const datePipe = new DatePipe("en-US");
    if (!this.editMode) {
      if (
        this.firstNames.has(this.firstNameFormControl.value.toLowerCase()) &&
        this.lastNames.has(this.lastNameFormControl.value.toLowerCase()) &&
        this.birthdates.has(datePipe.transform(this.birthDateFormControl.value))
      ) {
        this.snakeBar.open("Customer exists!", "close");
      } else {
        const model: Customer = {
          Firstname: this.firstNameFormControl.value,
          Lastname: this.lastNameFormControl.value,
          DateOfBirth: this.birthDateFormControl.value,
          PhoneNumber: this.phoneFormControl.value,
          Email: this.emailFormControl.value,
          BankAccountNumber: this.bankAccountNumberFormControl.value,
        };
        const list = this.dataSource.data ?? [];
        list.push(model);
        this.dataSource = new MatTableDataSource(list);
        localStorage.setItem("customerList", JSON.stringify(list));
        this.success = true;
        this.result = true;
      }
    } else {
      this.editCustomer();
    }
  }

  removeCustomer(element: any) {
    const index = this.dataSource.data.findIndex((item: any) => {
      return item.Email == element.Email;
    });
    this.dataSource.data.splice(index, 1);
    localStorage.setItem("customerList", JSON.stringify(this.dataSource.data));
    this.customerList();
  }

  editCustomer() {
    const index = this.dataSource.data.findIndex((item: any) => {
      return item.Email == this.customer.Email;
    });
    this.dataSource.data[index].Firstname = this.firstNameFormControl.value;
    this.dataSource.data[index].LastName = this.lastNameFormControl.value;
    this.dataSource.data[index].Email = this.emailFormControl.value;
    this.dataSource.data[index].DateOfBirth = this.birthDateFormControl.value;
    this.dataSource.data[index].PhoneNumber = this.phoneFormControl.value;
    this.dataSource.data[index].BankAccountNumber =
      this.bankAccountNumberFormControl.value;
    localStorage.setItem("customerList", JSON.stringify(this.dataSource.data));
    this.success = true;
    this.result = true;
  }

  back() {
    this.router.navigate(["pages/customer-list"]);
    this.firstNameFormControl.reset();
    this.lastNameFormControl.reset();
    this.emailFormControl.reset();
    this.phoneFormControl.reset();
    this.birthDateFormControl.reset();
    this.bankAccountNumberFormControl.reset();
    this.success = false;
    this.result = false;
    this.exist = false;
  }

  disableSubmit() {
    const validation =
      this.lastNameFormControl.invalid ||
      this.firstNameFormControl.invalid ||
      this.emailFormControl.invalid ||
      this.phoneFormControl.invalid ||
      this.bankAccountNumberFormControl.invalid ||
      this.birthDateFormControl.invalid ||
      !this.phoneIsValid.isPossibleNumber ||
      this.exist == true ||
      this.exist == null;
    return validation;
  }
}
