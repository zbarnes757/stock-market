import { Component, OnInit } from '@angular/core';
import { PortfolioItem } from '../classes/portfolio-item';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioItems: PortfolioItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
