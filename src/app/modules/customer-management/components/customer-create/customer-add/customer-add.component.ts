import { Component, OnInit } from "@angular/core";
import { CustomerManagementService } from "../../../services/customer.service";
import { MyErrorStateMatcher } from "src/app/modules/shared/classes/error-state-matcher";
import { debounceTime } from "rxjs";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

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

    this.customerManagementService.phoneFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((term) => {
        this.getParsedInternationalByNumber(term);
      });
  }

  ngOnInit(): void {}

  getParsedInternationalByNumber(rawNumber: string) {
    try {
      const parsed = phoneUtil.parseAndKeepRawInput(rawNumber, "IR");
      const isPossibleNumber = phoneUtil.isPossibleNumber(parsed);
      const internationalFormatNumber = phoneUtil.format(
        parsed,
        PhoneNumberFormat.E164
      );

      this.customerManagementService.phoneIsValid = {
        formattedForDisplay: phoneUtil.formatOutOfCountryCallingNumber(
          parsed,
          "IR"
        ),
        rawInput: parsed.getRawInput(),
        isPossibleNumber,
        isValidNumberForRegionIR: phoneUtil.isValidNumberForRegion(
          parsed,
          "IR"
        ),

        internationalFormatNumber,
        isValidForSMS:
          isPossibleNumber && internationalFormatNumber.startsWith("+98"),
      };
      return this.customerManagementService.phoneIsValid;
    } catch (e: any) {
      return { error: e.message };
    }
  }
}
