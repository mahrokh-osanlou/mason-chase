import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SidenavListComponent } from "./components/sidenav-list/sidenav-list.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

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
export const routedComponents = [HomeComponent, SidenavListComponent, ToolbarComponent];
