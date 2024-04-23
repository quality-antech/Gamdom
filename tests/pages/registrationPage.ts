import { Page, Locator } from '@playwright/test';
import { data } from '../utils/testData';
import { generateRandom } from '../utils/utilMethods';
import { expect } from '@playwright/test';

export class Registration {
  constructor(private page: Page) { }

  public usernameInput: Locator = this.page.locator('[name="username"]');
  public passwordInput: Locator = this.page.locator('[name="password"]');
  public emailInput: Locator = this.page.locator('[name="email"]');
  public startPlayingButton: Locator = this.page.getByTestId('start-playing-signup');
  public agreeTermsCheckbox: Locator = this.page.getByTestId('agree-terms-signup').locator('input');
  public createAccountButton: Locator = this.page.getByTestId('signup-nav');
  public gamdomLogo: Locator = this.page.getByAltText('Gamdom logo');
  public loginButton: Locator = this.page.getByTestId('signin-nav');
  public submitLogin: Locator = this.page.getByTestId('start-playing-login');
  public rememberMe: Locator = this.page.getByTestId('remember-me-login');
  public steamLogin: Locator = this.page.locator('button').filter({ hasText: 'Steam' })
  public googleLogin: Locator = this.page.locator('button').filter({ hasText: 'Google' })


  async navigate(): Promise<void> {
    await this.page.goto(data.url);
  }

  async openRegistrationModal(): Promise<void> {
    await this.createAccountButton.click();
  }

  async fillUserDetails(): Promise<void> {
    const randomNumber = generateRandom(5);
    const username = data.username + randomNumber;
    const email = data.username + randomNumber + "@gmail.com";
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(data.password);
    await this.emailInput.fill(email);
  }

  async checkAgreeTerms(): Promise<void> {
    await this.agreeTermsCheckbox.check({ force: true });
  }

  async submitRegistration(): Promise<void> {
    await this.startPlayingButton.click();
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async validateLoginForm(): Promise<void> {
    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password, { timeout: 1000 });
    await this.rememberMe.click({ force: true });
    await expect(this.submitLogin).toBeEnabled();
  }

  async validateAlternativeLogin(): Promise<void> {
    await expect(this.steamLogin).toBeVisible();
    await expect(this.googleLogin).toBeVisible();
  }
}