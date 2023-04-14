import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "../../modules/customer-management/customer-management.module"
          ).then((m) => m.CustomerManagementModule),
      },
    ],
  },
];
export const routedComponents = [HomeComponent, NavbarComponent];
