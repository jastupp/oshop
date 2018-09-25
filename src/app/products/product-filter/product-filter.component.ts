import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

    //****************
    // Class Members *
    //****************
    private m_categories$;
    private m_category;

    //**************
    // Constructor *
    //**************
    constructor(private m_category_service: CategoryService,) { }

    //**********
    // Getters *
    //**********
    private get categoryService() { return this.m_category_service; }
    get categories$() { return this.m_categories$; }

    //**********
    // Setters *
    //**********
    set categories$(value) { this.m_categories$ = value; }
    @Input() category(value) { this.m_category = value; }


    ngOnInit() {
        this.categories$ = this.categoryService.getAll();
    }

}
