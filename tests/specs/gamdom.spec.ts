import { test, expect } from '@playwright/test';
import { Registration } from '../pages/registrationPage';
import { GamdomPage } from '../pages/gamdomPage';
import { data } from '../utils/testData';

let registrationPage: Registration;
let gamdomPage: GamdomPage;
const title = 'Gamdom - Top Bitcoin & Crypto Casino!';

test.beforeEach(async ({ page }) => {
    registrationPage = new Registration(page);
    gamdomPage = new GamdomPage(page);
    await registrationPage.navigate();
    await expect(page).toHaveTitle(title);
    await expect(page).toHaveURL(new RegExp(data.url))
});

test('Verify the registration page', async () => {
    await registrationPage.openRegistrationModal();
    await registrationPage.fillUserDetails();
    await registrationPage.checkAgreeTerms();
    await expect(registrationPage.agreeTermsCheckbox).toBeChecked();
    await expect(registrationPage.startPlayingButton).toBeEnabled();
    await registrationPage.validateAlternativeLogin();
});

test('Login user modal', async () => {
    await registrationPage.clickLoginButton();
    await expect(registrationPage.submitLogin).toBeEnabled();
    await registrationPage.validateLoginForm();
    await registrationPage.validateAlternativeLogin();
});

test('Verify the navigation menu games', async () => {
    await gamdomPage.validateMenuHeaders();
    await gamdomPage.originalsMenu.hover();
    await gamdomPage.validateOriginalsGames();
});

test('Search for games', async ({ page }) => {
    await gamdomPage.casinoMenu.click();
    await gamdomPage.openSeeAllGames();
    await expect(page).toHaveURL(new RegExp(data.url + 'casino'));
    await gamdomPage.searchForGame(data.game);
});