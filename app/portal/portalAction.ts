"use server";

import { stripe } from "@/utils/stripe";

export async function createPortalSession(customerId: string) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.NEXT_PUBLIC_APP_URL || `http://localhost:3000`,
  });

  return { id: portalSession.id, url: portalSession.url };
}
