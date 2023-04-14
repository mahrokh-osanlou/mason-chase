import { Component, OnInit } from "@angular/core";
import { CustomerManagementService } from "../../services/customer.service";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { Customer } from "../../models/customer.model";
@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    "index",
    "firstName",
    "lastName",
    "email",
    "birthDate",
    "phoneNumber",
    "bankAccountNumber",
    "Action",
  ];
  constructor(
    public customerManagementService: CustomerManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerManagementService.customerList();
  }

  addCustomer() {
    this.router.navigate(["pages/customer-create"]);
  }

  editCustomer(element: Customer) {
    this.router.navigate([`pages/customer-edit/${element.BankAccountNumber}`]);
    this.customerManagementService.customer = element;
    this.customerManagementService.editMode = true;
    this.customerManagementService.firstNameFormControl.setValue(
      element.Firstname
    );
    this.customerManagementService.lastNameFormControl.setValue(
      element.Lastname
    );
    this.customerManagementService.birthDateFormControl.setValue(
      element.DateOfBirth
    );
    this.customerManagementService.phoneFormControl.setValue(
      element.PhoneNumber
    );
    this.customerManagementService.emailFormControl.setValue(element.Email);
    this.customerManagementService.bankAccountNumberFormControl.setValue(
      element.BankAccountNumber
    );
  }

  changePaging(e: PageEvent) {
    this.customerManagementService.pageEvent.pageIndex = e.pageIndex;
    let firstCut = 0;
    let secondCut = 0;
    firstCut = e.pageIndex * e.pageSize;
    secondCut = firstCut + e.pageSize;
    this.customerManagementService.data.data = !this.customerManagementService.searchMode
      ? this.customerManagementService.dataSource.data.slice(firstCut, secondCut)
      : this.customerManagementService.dataSourceSearch.data.slice(
          firstCut,
          secondCut
        );
  }
}
