import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioItem } from '../classes/portfolio-item';
import { Observable } from 'rxjs/observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

interface IEXTradingCompanyResponse {
  symbol: string;
  companyName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  CEO: string;
  issueType: string;
  sector: string;
}

@Injectable()
export class PortfolioItemService {

  constructor(private http: HttpClient) { }

  /**
   * getPortfolioItem
   */
  public getPortfolioItem(ticker: string): Observable<PortfolioItem> {
    return forkJoin(
      this.http.get(`https://api.iextrading.com/1.0/stock/${ticker}/price`),
      this.http.get<PortfolioItem>(`https://api.iextrading.com/1.0/stock/${ticker}/company`)
    )
    .map(([price, company]: [number, PortfolioItem]) => {
      company.price = price;
      return company;
    });
  }
}
