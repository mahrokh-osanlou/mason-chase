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
      const countryCode = phoneUtil.parse(rawNumber, "").getCountryCode() ?? 0;
      const id = phoneUtil.getRegionCodeForCountryCode(countryCode);
      const parsed = phoneUtil.parseAndKeepRawInput(rawNumber, id);
      const isPossibleNumber = phoneUtil.isPossibleNumber(parsed);
      const internationalFormatNumber = phoneUtil.format(
        parsed,
        PhoneNumberFormat.E164
      );
      this.customerManagementService.phoneIsValid = {
        formattedForDisplay: phoneUtil.formatOutOfCountryCallingNumber(
          parsed,
          id
        ),
        rawInput: parsed.getRawInput(),
        isPossibleNumber,
        isValidNumberForRegion: phoneUtil.isValidNumberForRegion(parsed, id),
        internationalFormatNumber,
        isValidForSMS:
          isPossibleNumber &&
          internationalFormatNumber.startsWith("+" + countryCode.toString()),
      };      
      return this.customerManagementService.phoneIsValid;
    } catch (e: any) {
      return { error: e.message };
    }
  }
}
