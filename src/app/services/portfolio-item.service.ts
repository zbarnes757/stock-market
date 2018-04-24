import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioItem } from '../classes/portfolio-item';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/observable';

@Injectable()
export class PortfolioItemService {
  url = 'https://api.iextrading.com/1.0';

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private auth: AuthService
  ) { }

  /**
   * getPortfolioItem
   */
  savePortfolioItem(ticker: string) {
    this.http.get<PortfolioItem>(`${this.url}/stock/${ticker}/company`)
      .subscribe((company) => {
        const user = this.auth.getcurrentUser();

        return this.db.collection('portfolioItems')
          .add({ ...company, userId: user.uid });
      });
  }

  /**
   * getCurrentPrice
   */
  getCurrentPrice(ticker: string): Observable<number> {
    return this.http.get<number>(`${this.url}/stock/${ticker}/price`);
  }
}
