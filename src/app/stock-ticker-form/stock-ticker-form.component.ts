import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioItem } from '../classes/portfolio-item';
import { PortfolioItemService } from '../services/portfolio-item.service';

@Component({
  selector: 'app-stock-ticker-form',
  templateUrl: './stock-ticker-form.component.html',
  styleUrls: ['./stock-ticker-form.component.css'],
  providers: [PortfolioItemService]
})
export class StockTickerFormComponent implements OnInit {
  model: any = {};
  items: PortfolioItem[] = [];
  constructor(public itemService: PortfolioItemService) { }

  ngOnInit() {
  }

  async onSubmit(f: NgForm) {
    const item = await this.itemService.getPortfolioItem(f.value.ticker).toPromise();
    this.items = [...this.items, item];
    console.log(this.items);
  }

}
