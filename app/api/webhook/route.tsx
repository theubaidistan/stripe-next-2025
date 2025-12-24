// import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";
// import { supabaseAdmin } from "@/utils/supabaseServer";
// import Stripe from "stripe";

// export async function POST(request: NextRequest) {
//   try {
//     const rawBody = await request.text();
//     const signature = request.headers.get("stripe-signature");

//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(
//         rawBody,
//         signature!,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
//     } catch (error: any) {
//       console.error(`Webhook signature verification failed: ${error.message}`);
//       return NextResponse.json({ message: "Webhook Error" }, { status: 400 });
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === "checkout.session.completed") {
//       const session: Stripe.Checkout.Session = event.data.object;
//       console.log(session);
//       const userId = session.metadata?.user_id;

//       // Create or update the stripe_customer_id in the stripe_customers table
//       const { error } = await supabaseAdmin.from("stripe_customers").upsert({
//         user_id: userId,
//         stripe_customer_id: session.customer,
//         subscription_id: session.subscription,
//         plan_active: true,
//         plan_expires: null,
//       });
//     }

//     //... omitted webhook signature verification

//     if (event.type === "customer.subscription.updated") {
//       const subscription: Stripe.Subscription = event.data.object;
//       console.log(subscription);
//       // Update the plan_expires field in the stripe_customers table
//       const { error } = await supabaseAdmin
//         .from("stripe_customers")
//         .update({ plan_expires: subscription.cancel_at })
//         .eq("subscription_id", subscription.id);
//     }

//     if (event.type === "customer.subscription.deleted") {
//       const subscription = event.data.object;
//       console.log(subscription);

//       const { error } = await supabaseAdmin
//         .from("stripe_customers")
//         .update({ plan_active: false, subscription_id: null })
//         .eq("subscription_id", subscription.id);
//     }

//     return NextResponse.json({ message: "success" });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
// //*------------------------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";
import { supabaseAdmin } from "@/utils/supabaseServer";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    let event: Stripe.Event;

    // Verify Stripe webhook signature
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return NextResponse.json({ message: "Webhook Error" }, { status: 400 });
    }

    // Handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;

      if (!userId) {
        console.error("No user_id in session metadata");
      } else {
        const { data, error } = await supabaseAdmin
          .from("stripe_customers")
          .upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            subscription_id: session.subscription,
            plan_active: true,
            plan_expires: null,
          });

        if (error) console.error("Supabase upsert error:", error);
        else console.log("✅ Stripe customer saved:", data);
      }
    }

    // Handle subscription updates
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const { error } = await supabaseAdmin
        .from("stripe_customers")
        .update({ plan_expires: subscription.cancel_at })
        .eq("subscription_id", subscription.id);
      if (error) console.error("Failed to update subscription:", error);
    }

    // Handle subscription deletions
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const { error } = await supabaseAdmin
        .from("stripe_customers")
        .update({ plan_active: false, subscription_id: null })
        .eq("subscription_id", subscription.id);
      if (error) console.error("Failed to mark subscription deleted:", error);
    }

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.error("⚠️ Webhook handler failed:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
