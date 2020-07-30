import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  const { price, source, quanity } = JSON.parse(event.body);
  const amount = calculateCost(Number(price), Number(quanity));
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd"
  });
  return { status: true };
});
