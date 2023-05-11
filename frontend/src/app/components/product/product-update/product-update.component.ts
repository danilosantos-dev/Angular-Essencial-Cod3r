import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{

  id = 0;
  name = '';
  price = 0;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.productService.getById(id).subscribe(dados => {
      this.id = id;
      this.name = dados.name;
      this.price = dados.price;
    })
  }

  updateProduct(): void{
    const product: Product ={
      id: this.id,
      name: this.name,
      price: this.price
    }
    this.productService.update(product).subscribe(() =>{
      this.productService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}
