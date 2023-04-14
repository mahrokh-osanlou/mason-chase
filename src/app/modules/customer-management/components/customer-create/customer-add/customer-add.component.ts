import { Component, OnInit } from "@angular/core";
import { CustomerManagementService } from "../../../services/customer.service";
import { MyErrorStateMatcher } from "src/app/modules/shared/classes/error-state-matcher";
import { debounceTime } from "rxjs";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
  selector: "app-customer-add",
  templateUrl: "./customer-add.component.html",
  styleUrls: ["./customer-add.component.scss"],
})
export class CustomerAddComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  maxDate = new Date();
  isLoading: boolean = false;
  mode: ProgressSpinnerMode = "indeterminate";

  constructor(public customerManagementService: CustomerManagementService) {
    if (!this.customerManagementService.editMode) {
      this.customerManagementService.emailFormControl.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((term) => {
          this.customerManagementService.exist = null;
          if (term && this.customerManagementService.emailFormControl.valid) {
            const exist = this.customerManagementService.emails.has(
              term.toLowerCase()
            );
            this.customerManagementService.exist = exist;
          }
        });
    }
  }

  ngOnInit(): void {}
}
