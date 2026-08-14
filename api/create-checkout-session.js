const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  custom: process.env.STRIPE_PRICE_CUSTOM
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { plan, name, email, details } = req.body || {};
    const price = PRICE_IDS[plan];

    if (!price) {
      return res.status(400).json({ error: "This plan is not configured yet." });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const origin =
      req.headers.origin ||
      `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      metadata: {
        plan: String(plan),
        customer_name: String(name).slice(0, 500),
        project_details: String(details || "").slice(0, 500)
      },
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel.html`,
      billing_address_collection: "auto"
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create Stripe checkout session." });
  }
};