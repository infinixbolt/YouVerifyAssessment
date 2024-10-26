import { Page, Locator, expect } from '@playwright/test';

export class CartPageO {
    readonly page: Page;
    readonly cartProductName: Locator;
    readonly cartQuantity: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProductName = this.page.locator('p.product-name').first();
        this.cartQuantity = this.page.locator('p.quantity').first();
        this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    }

    async verifyProductInCart(expectedProductName: string) {
        const cartProductName = await this.cartProductName.innerText();
        expect(cartProductName).toContain(expectedProductName);
    }

    async verifyQuantity(expectedQuantity: string) {
        const cartQuantity = await this.cartQuantity.innerText();
        expect(cartQuantity).toContain(expectedQuantity);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}
