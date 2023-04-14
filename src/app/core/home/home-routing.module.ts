import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../../modules/customer-management/customer-management.module").then((m) => m.CustomerManagementModule),
  },
];
export const routedComponents = [HomeComponent];
