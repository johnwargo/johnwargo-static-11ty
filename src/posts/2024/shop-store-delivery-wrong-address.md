---
title: Shop Store Delivering Package to the Wrong Address
description: 
date: 2024-12-13
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Miscellaneous
timestamp: 2024-12-13T12:30:56.087Z
---

Many online stores today use Shopify and the Shop app to manage payments, shipping and so on. I like the convenience of this approach, but there are a couple of issues I uncovered with it over the years.

## Default Shipping Address

By default, Shop uses the previously used shipping address for the next purchase. I discovered this when I tried to send a package to myself after sending some excellent toffee (from [Bell Stone Toffee](https://bellstonetoffee.com/){target="_blank"}) to a work colleague. When I tracked delivery of the package, I realized that Shop used my colleague's address instead of my primary address. This makes no sense to me.

{% sidebar "" %}
By default, Shop uses the previously used shipping address for the next purchase.
{% endsidebar %}

Because of this, my package went to her out in Seattle instead of to my house here in North Carolina. I sent her the postage required for her to send the package back to me then started looking for how to fix this issue.

It turns out that Shop allows you to set the default address for your account. Once I did that, Shop uses my default address unless I tell it specifically to use a different one. To change the default address, login to the Shop app, access your account settings, and open your primary address for editing. Once there, you can make a selection on the form to make this your default shipping address.

<img src="src/images/2024/shop-app-default-address.png" alt="Shop App Default Address" />

## Overriding Store Purchase Options

Another really annoying issue I discoverd with the Shop app is that it overrides the default purchase and shipping options for sites when active. I was looking at CNC Routers from [Inventables](https://inventables.com/){target="_blank"} and noticed that they supported a specific payment method I wanted to use for my purchase. 

The site also used Shop and I was already logged into the Shop app when I visited the site. Because of that, the only purchase option I had was to use Shop; it overrode the purchasing capabilities of the hosting site and kept me from purchasing the product the way I wanted to. 

This issue is easy to fix though, all you have to do is:

1. Open a new browser window.
2. Navigate to the [Shop App](https://shop.app/){target="_blank"}.
3. Click on the account icon in the upper-right corner of the page.
4. Select **Sign Out** as highlighted in the following figure.

<img src="src/images/2024/shop-app-logout.png" alt="Shop App Sign Out option" />

When you switch back the product site and access your shopping cart, the site's default purchasing options should be available to you again.
