import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./core/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./core/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },

  { path: "**", redirectTo: "pages" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
