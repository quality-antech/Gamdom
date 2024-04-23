import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { data } from '../utils/testData';

export class GamdomPage {
  constructor(private page: Page) { }

  public leftMenu: Locator = this.page.locator('.icon-hamburger-thin-filled');
  public originalsMenu: Locator = this.page.getByRole('link', { name: 'Originals' })
  public casinoMenu: Locator = this.page.getByRole('banner').getByRole('link', { name: 'Casino' })
  public providersMenu: Locator = this.page.getByRole('button', { name: 'Providers left right' });
  public sportsMenu: Locator = this.page.getByRole('link', { name: 'Sports', exact: true })
  public promotionsMenu: Locator = this.page.locator('#panel1a-header span').filter({ hasText: 'Promotions' });
  public supportMenu: Locator = this.page.getByRole('link', { name: 'Support', exact: true })
  public rewardsMenu: Locator = this.page.getByRole('banner').getByRole('link', { name: 'Rewards' })
  public crashGame: Locator = this.page.getByRole('link', { name: ' Crash' })
  public diceGame: Locator = this.page.locator('.sc-hNDLBw > div:nth-child(2) > a').first()
  public rouletteGame: Locator = this.page.locator('.sc-hNDLBw > div:nth-child(3) > a').first()
  public hiloGame: Locator = this.page.locator('div:nth-child(4) > a').first()
  public seeAllButton: Locator = this.page.getByRole('button', { name: 'See All', exact: true });
  public searchBar: Locator = this.page.locator('input.MuiInputBase-inputAdornedStart').first();
  public body: Locator = this.page.locator('body');

  getHeaders: Locator[] = [
    this.originalsMenu, this.casinoMenu, this.supportMenu, this.sportsMenu
  ];

  getOrignalsGames: Locator[] = [
    this.crashGame, this.diceGame, this.rouletteGame, this.hiloGame
  ];

  async openLeftMenu(): Promise<void> {
    await expect(this.leftMenu).toBeVisible();
    await this.leftMenu.click();
  }

  async validateMenuHeaders(): Promise<void> {
    this.getHeaders.forEach(header => {
      expect(header).toBeVisible();
    })
  }

  async validateOriginalsGames(): Promise<void> {
    this.getOrignalsGames.forEach(game => {
      expect(game).toBeVisible();
    })
  }

  async openSeeAllGames(): Promise<void> {
    await expect(this.seeAllButton).toBeVisible();
    await this.seeAllButton.click();
    await this.body.click({timeout: 300});
  }

  async searchForGame(game: string): Promise<void> {
    await expect(this.searchBar).toBeVisible();
    await this.searchBar.clear();
    await this.searchBar.fill(game, { timeout: 100 });
    await expect(this.searchBar).toHaveAttribute('value', data.game);
  }
}