import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  id = 0;
  name = "";
  price = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

    this.productService.getById(id).subscribe((dados) => {
      this.id = id;
      this.name = dados.name;
      this.price = dados.price;
    });
  }

  deleteProduct(): void {
    const id = this.route.snapshot.params["id"];
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto deletado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}
