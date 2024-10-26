import { Page, Locator, expect } from '@playwright/test';

export class CountryPageO {
    readonly page: Page;
    readonly countrySelect: Locator;
    readonly termsCheckbox: Locator;
    readonly proceedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countrySelect = this.page.getByRole('combobox');
        this.termsCheckbox = this.page.getByRole('checkbox');
        this.proceedButton = this.page.getByRole('button', { name: 'Proceed' });
    }


    async selectCountry(country: string) {
        await this.countrySelect.selectOption(country);
    }

    async acceptTermsAndProceed() {
        await this.termsCheckbox.check();
        await this.proceedButton.click();
    }
}
