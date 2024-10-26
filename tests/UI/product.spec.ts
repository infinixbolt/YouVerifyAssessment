import { test, expect } from '@playwright/test';
import productsToSearch from '../../test data/testData';
import { homePageO } from '../../page objects/homePO';
import { CartPageO } from '../../page objects/cartPO';
import { CountryPageO } from '../../page objects/countryPO';

test.describe('Add a product to cart and checkout', () => {
    test('steps', async ({ page }) => {
        const homePage = new homePageO(page)
        const cartPage = new CartPageO(page)
        const countryPage = new CountryPageO(page)

        // Helper function to get a random product
        const getRandomProduct = (products: string[]) => products[Math.floor(Math.random() * products.length)];
        const productToSearch = getRandomProduct(productsToSearch);

        // 1. Navigate to the homepage
        await homePage.navigate();

        // 2. Search for the product
        await homePage.searchProduct(productToSearch);

        // 3. Assertion: Verify that the searched product is visible in the search results
        await homePage.verifyProductVisible(productToSearch);

        // 4. Add the correct product to the cart
        await homePage.addToCart(productToSearch);

        // 5. Go to cart
        await homePage.goToCartandCheckout();

        // 6. Cart page - Assertions
        await cartPage.verifyProductInCart(productToSearch);
        await cartPage.verifyQuantity('1');

        // 7. Proceed to place the order
        await cartPage.placeOrder();

        // 8. Country selection and proceed
        await countryPage.selectCountry('Nigeria');
        await countryPage.acceptTermsAndProceed();

        // 9. Final assertion for URL
        await page.waitForURL('https://rahulshettyacademy.com/seleniumPractise/#/');

    });
});
