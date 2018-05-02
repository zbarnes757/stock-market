import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioItem } from '../classes/portfolio-item';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { take, takeUntil } from 'rxjs/operators';
import { PortfolioItemService } from '../services/portfolio-item.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  portfolio: string[] = [];
  portfolioItems: PortfolioItem[] = [];
  onDestroySubject = new Subject();

  constructor( private itemService: PortfolioItemService) { }

  ngOnInit() {
    this.getPortfolio();
  }

  ngOnDestroy() {
    this.onDestroySubject.next(null);
  }

  private getPortfolio() {
      this.itemService.getPortfolio()
      .pipe(takeUntil(this.onDestroySubject))
      .subscribe(user => {
        if (user.portfolio) {
          this.portfolio = user.portfolio;
          this.updatePortfolioItems();
        }
      });
  }

  private updatePortfolioItems() {
    const currentItems = this.portfolioItems.map((i) => i.symbol.toLowerCase());
    this.portfolio.forEach(ticker => {
      if (!currentItems.includes(ticker)) {
        forkJoin(
          this.itemService.getCurrentPrice(ticker),
          this.itemService.getCompanyInfo(ticker)
        )
        .pipe(
          take(1),
          takeUntil(this.onDestroySubject)
        )
        .subscribe(([price, companyInfo]) => {
          companyInfo.currentPrice = price;
          this.portfolioItems.push(companyInfo);
        });
      }
    });
  }
}
