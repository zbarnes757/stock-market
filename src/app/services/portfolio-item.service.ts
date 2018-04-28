import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioItem } from '../classes/portfolio-item';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/observable';
import * as io from 'socket.io-client';

@Injectable()
export class PortfolioItemService {
  private httpUrl = 'https://api.iextrading.com/1.0';
  private socketUrl = 'https://ws-api.iextrading.com/1.0';
  private socket;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private auth: AuthService
  ) { }

  /**
   * addTickerToPortfolio
   * @description save the new ticker to the current user's portfolio if it isn't already there
   * @param ticker the listing ticker symbol of the stock
   */
  public addTickerToPortfolio(ticker: string) {
    ticker = ticker.toLowerCase();

    const userRef = this.db.firestore.collection('users').doc(this.auth.getcurrentUser().uid);

    return this.db.firestore.runTransaction((transaction) => {
      return transaction.get(userRef)
        .then((userDoc) => {
          const userData = userDoc.data();
          if (!userData.portfolio) {
            return transaction.update(userRef, { portfolio: [ ticker ]});
          }

          if (!userData.portfolio.includes(ticker)) {
            const newPortfolio = userData.portfolio.concat(ticker);
            return transaction.update(userRef, { portfolio: newPortfolio });
          }
        });
    });
  }

  /**
   * getCurrentPrice
   * @description returns an observable with current price
   * @param ticker the listing ticker symbol of the stock
   */
  public getCurrentPrice(ticker: string): Observable<number> {
    return this.http.get<number>(`${this.httpUrl}/stock/${ticker}/price`);
  }

  /**
   * getCompanyInfo
   * @description returns an observable with company info
   * @param ticker the listing ticker symbol of the stock
   */
  public getCompanyInfo(ticker: string) {
    return this.http.get<PortfolioItem>(`${this.httpUrl}/stock/${ticker}/company`);
  }

  /**
   * getRealtimePrice
   * @description returns an observable socket with real time price information
   * @param ticker the listing ticker symbol of the stock
   */
  public getRealtimePrice(ticker: string): Observable<{}> {
    const observable = new Observable(observer => {
      this.socket = io(`${this.socketUrl}/stock/${ticker}/price`);

      this.socket.on('message', (data) => observer.next(data));

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
