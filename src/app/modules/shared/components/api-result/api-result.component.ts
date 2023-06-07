import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-api-result",
  templateUrl: "./api-result.component.html",
  styleUrls: ["./api-result.component.scss"],
})
export class ApiResultComponent implements OnInit {
  @Input() success: boolean = false;
  @Input() errorList: any[] = [];
  @Input() link: string = "";
  @Output() backBtn = new EventEmitter<boolean>();
  @Output() PreviousBtn = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  back() {
    this.backBtn.emit(true);
  }

  previous() {
    this.PreviousBtn.emit(true);
  }

}
