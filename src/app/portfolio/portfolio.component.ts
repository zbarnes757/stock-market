import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import { User } from '../classes/user';
import { PortfolioItem } from '../classes/portfolio-item';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { PortfolioItemService } from '../services/portfolio-item.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio: string[] = [];
  portfolioItems: PortfolioItem[] = [];

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private itemService: PortfolioItemService
  ) { }

  ngOnInit() {
    this.getPortfolio();
  }

  private getPortfolio() {
    const currentUser = this.auth.getcurrentUser();
    this.db.doc<User>(`users/${currentUser.uid}`)
      .valueChanges()
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
        .subscribe(([price, companyInfo]) => {
          companyInfo.currentPrice = price;
          this.portfolioItems.push(companyInfo);
        });
      }
    });
  }
}
