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
   * getPortfolioItem
   * @description saves a new portfolio item for the current user in firebase firestore
   * @param ticker the listing ticker symbol of the stock
   */
  public savePortfolioItem(ticker: string) {
    this.http.get<PortfolioItem>(`${this.httpUrl}/stock/${ticker}/company`)
      .subscribe((company) => {
        const user = this.auth.getcurrentUser();

        return this.db.collection('portfolioItems')
          .add({ ...company, userId: user.uid });
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
