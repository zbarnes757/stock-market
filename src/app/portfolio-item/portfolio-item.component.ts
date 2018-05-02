import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from '../classes/portfolio-item';
import { PortfolioItemService } from '../services/portfolio-item.service';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {
  @Input() item: PortfolioItem;

  constructor(private itemService: PortfolioItemService) {}

  ngOnInit() {}

  remove() {
    return this.itemService.removeItemFromPortfolio(this.item.symbol);
  }
}
