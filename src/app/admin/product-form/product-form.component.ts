import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

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
    private m_product = {};
    private m_product_id;

    //**************
    // Constructor *
    //**************
    constructor(private m_category_service: CategoryService,
                private m_product_service: ProductService,
                private m_router: Router,
                private m_route: ActivatedRoute) { }

    //**********
    // Getters *
    //**********
    private get categoryService() { return this.m_category_service; }
    private get productService() { return this.m_product_service; }
    private get router() { return this.m_router; }
    private get route() { return this.m_route; }
    get product() { return this.m_product; }
    get categories$() { return this.m_categories$; }
    get productId() { return this.m_product_id; }

    //**********
    // Setters *
    //**********
    set categories$(value) { this.m_categories$ = value; }
    set productId(value) { this.m_product_id = value; }


    ngOnInit() {
        this.categories$ = this.categoryService.getAll();
        this.productId = this.route.snapshot.paramMap.get('id');
        if(this.productId) {
            console.log('Got id', this.productId);
            //this.productService.get(id).subscribe(p => { console.log('In here with', p); this.m_product = p; });

            this.productService.get(this.productId).pipe(
                take(1),
                map(p => { console.log('In here with ', p); return this.m_product = p; })
            ).subscribe();
        }
    }

    save(product) {
        if(this.productId) {
            this.productService.update(this.productId, this.product).then();
        } else {
            this.productService.create(product).then();
        }

        console.log('Save Form = ', product);
        this.router.navigate(['/admin/products']).then();
    }

    delete() {
        if(confirm('Are you sure you want to delete this product')) {
            console.log('In the delete method');
            this.productService.delete(this.productId);
            this.router.navigate(['/admin/products']).then();
        }
    }


}
