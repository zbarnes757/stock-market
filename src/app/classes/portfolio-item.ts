export class PortfolioItem {
  constructor(
    public symbol: string,
    public companyName: string,
    public exchange: string,
    public industry: string,
    public website: string,
    public description: string,
    public CEO: string,
    public issueType: string,
    public sector: string,
    public price: number
  ) {}
}
