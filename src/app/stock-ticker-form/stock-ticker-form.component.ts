import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioItemService } from '../services/portfolio-item.service';

@Component({
  selector: 'app-stock-ticker-form',
  templateUrl: './stock-ticker-form.component.html',
  styleUrls: ['./stock-ticker-form.component.css']
})
export class StockTickerFormComponent implements OnInit {
  model: any = {};

  constructor(public itemService: PortfolioItemService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    return this.itemService.addTickerToPortfolio(f.value.ticker);
  }

}
