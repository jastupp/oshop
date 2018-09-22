import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    //****************
    // Class Members *
    //****************
    private m_categories$;

    //**************
    // Constructor *
    //**************
    constructor(private m_category_service: CategoryService,
                private m_product_service: ProductService) { }

    //**********
    // Getters *
    //**********
    private get categoryService() { return this.m_category_service; }
    private get productService() { return this.m_product_service; }
    get categories$() { return this.m_categories$; }

    //**********
    // Setters *
    //**********
    set categories$(value) { this.m_categories$ = value; }


    ngOnInit() {
        this.categories$ = this.categoryService.getCategories();
    }

    save(product) {
        this.productService.create(product);
        console.log('Form = ', product);
    }
}
