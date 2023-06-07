import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatTreeModule } from "@angular/material/tree";
import { MatBadgeModule } from "@angular/material/badge";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { MatStepperModule } from "@angular/material/stepper";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSortModule } from "@angular/material/sort";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatRadioModule } from "@angular/material/radio";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSliderModule } from "@angular/material/slider";
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
  exports: [
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTreeModule,
    MatBadgeModule,
    MatDialogModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatSortModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatPaginatorModule,
  ],
  imports: [
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatBadgeModule,
    MatDialogModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatSortModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSliderModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },

    { provide: MAT_DIALOG_DATA, useValue: {} },

    { provide: MatDialogRef, useValue: {} },
  ],
})
export class MaterialModule {}
