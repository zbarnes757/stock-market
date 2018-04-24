import { Component, OnInit } from '@angular/core';
import { PortfolioItem } from '../classes/portfolio-item';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioItems: PortfolioItem[] = [];

  constructor(private db: AngularFirestore, private auth: AuthService) { }

  ngOnInit() {
    this.getItems();
  }

  private getItems() {
    const currentUser = this.auth.getcurrentUser();
    this.db.collection<PortfolioItem>('portfolioItems', ref => ref.where('userId', '==', currentUser.uid))
      .valueChanges()
      .subscribe(items => {
        this.portfolioItems = items;
      });
  }
}
