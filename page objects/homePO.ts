import { Page, Locator } from '@playwright/test';

export class homePageO {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly cartLink: Locator
    readonly checkoutLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.searchBox = this.page.getByPlaceholder('Search for Vegetables and Fruits');
        this.searchButton = this.page.locator('button[type="submit"]');
        this.cartLink = this.page.getByAltText('Cart');
        this.checkoutLink = this.page.getByRole('button', { name: 'Proceed to checkout' })
    }

    async navigate() {
        await this.page.goto('/seleniumPractise');
    }

    async searchProduct(product: string) {
        await this.searchBox.fill(product);
        await this.searchButton.click();
    }

    async verifyProductVisible(product: string) {
        const productSelector = this.page.locator(`h4.product-name:has-text("${product}")`);
        await productSelector.waitFor();
    }

    async addToCart(product: string) {
        const productSelector = this.page.locator(`h4.product-name:has-text("${product}")`);
        await productSelector.waitFor();
        const addToCartButton = productSelector.locator('..').locator('button:has-text("ADD TO CART")');
        await addToCartButton.click();
    }

    async goToCartandCheckout() {
        await this.cartLink.click();
        await this.checkoutLink.click()
    }
}