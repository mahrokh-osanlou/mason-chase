import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable } from "rxjs";
import { Toaster } from "../components/toast-notification";

@Injectable({
  providedIn: "root",
})
export class GeneralService {
  /**
   * loading progressbar
   */
  private loader = new BehaviorSubject<boolean>(false);

  constructor(private _snackBar: MatSnackBar, private toaster: Toaster) {}

  /**
   * shows feedback message in a snackbar
   * @param message message for showing feedback in the snackbar
   * @param actionButton optional; if action needed, then specify the name of the action --- snackbar will be closed by clicking on the action button
   * @param duration optional; if available, the default value of 2000 ms will be overwritten
   */
  showFeedback(message: string) {
    this.toaster.open({
      type: "danger",
      text: message
    });
  }
  /**
   * hiding feedback manually, if needed
   */
  hideFeedback() {
    this._snackBar.dismiss();
  }

  /**
   *
   * @returns boolean value indicating the loader is to be displayed or hidden
   */
  getLoader(): Observable<boolean> {
    return this.loader.asObservable();
  }
  /**
   *
   * @param loader boolean
   * set to true if the loader is to be displayed and false is to be hidden
   */
  setLoader(loader: boolean) {
    this.loader.next(loader);
  }

}
