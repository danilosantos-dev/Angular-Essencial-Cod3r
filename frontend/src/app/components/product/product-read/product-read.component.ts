
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements  OnInit {

  products: Product[] = []
  displayedColumns = ['id', 'name' ,'price', 'action']

  constructor(private productService: ProductService){
     
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(dados =>{
      this.products = dados;
    })
  }

}
