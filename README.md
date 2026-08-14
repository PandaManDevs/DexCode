# DexCode Stripe Store

A Vercel-ready website with Stripe Checkout.

## Files

- `index.html` — storefront
- `api/create-checkout-session.js` — secure Stripe Checkout session creator
- `success.html` — successful payment page
- `cancel.html` — cancelled payment page
- `package.json` — Stripe dependency
- `.env.example` — environment variable template
- `vercel.json` — Vercel function configuration

## Setup

1. Create your products/prices in Stripe.
2. Copy the three Stripe Price IDs.
3. Deploy this folder to Vercel.
4. In Vercel Project Settings → Environment Variables, add:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_STARTER`
   - `STRIPE_PRICE_PRO`
   - `STRIPE_PRICE_CUSTOM`
5. Redeploy.

IMPORTANT: Never put your Stripe secret key in `index.html`, GitHub, or other public files.

The Custom plan uses a Stripe Price ID too. If you want custom quotes instead of a fixed-price checkout, remove its price ID and change that button to a contact/quote flow.
