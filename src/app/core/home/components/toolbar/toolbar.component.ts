import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Output() SideNavToggle = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openSidenav() {
    this.SideNavToggle.emit();
  }

  home() {
    this.router.navigate(["pages"]);
  }

  customerList() {
    this.router.navigate(["pages/customer-list"]);
  }

  customerAdd() {
    this.router.navigate(["pages/customer-create"]);
  }
}
