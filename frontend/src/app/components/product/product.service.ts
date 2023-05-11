import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable, catchError, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url = `http://localhost:3001/products`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "Ok", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"]
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getById(id: number): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.url}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage(`Erro na conexão! Erro: ${e.status}`, true);
    return EMPTY
  }

}
