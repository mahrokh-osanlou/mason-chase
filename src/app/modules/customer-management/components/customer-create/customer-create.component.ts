import { Component, OnDestroy, OnInit } from "@angular/core";
import { CustomerManagementService } from "../../services/customer.service";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
})
export class CustomerCreateComponent implements OnInit, OnDestroy {
  constructor(public customerManagementService: CustomerManagementService) {}

  ngOnInit(): void {
    this.customerManagementService.selectedIndex = 0;
    this.customerManagementService.customerList();
  }

  setIndex(event: any) {
    this.customerManagementService.selectedIndex = event.index;
  }

  ngOnDestroy(): void {
    this.customerManagementService.firstNameFormControl.reset();
    this.customerManagementService.lastNameFormControl.reset();
    this.customerManagementService.emailFormControl.reset();
    this.customerManagementService.phoneFormControl.reset();
    this.customerManagementService.birthDateFormControl.reset();
    this.customerManagementService.bankAccountNumberFormControl.reset();
    this.customerManagementService.success = false;
    this.customerManagementService.result = false;
    this.customerManagementService.editMode = false;
  }
}
