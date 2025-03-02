"use server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000", // Corrigido erro de digitação
    cancel_url: "http://localhost:3000", // Corrigido erro de digitação
    line_items: [
      // Movido para o local correto
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      clerk_user_id: userId,
    },
  });

  return { sessionId: session.id };
};
