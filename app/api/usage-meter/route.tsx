// import { NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";
// import { supabaseAdmin } from "@/utils/supabaseServer";
// import { randomBytes } from "crypto";

// export async function POST(request: Request) {
//   try {
//     // Check if the user is logged in
//     const token = request.headers.get("Authorization")?.split("Bearer ")[1];
//     if (!token) {
//       throw "missing auth token";
//     }

//     const {
//       data: { user },
//       error: userError,
//     } = await supabaseAdmin.auth.getUser(token);

//     if (!user || userError) {
//       throw "supabase auth error";
//     }

//     // Check the user's active_plan status in the stripe_customers table
//     const { data: customer, error: fetchError } = await supabaseAdmin
//       .from("stripe_customers")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (!customer || !customer.subscription_id || fetchError) {
//       throw "Please subscribe to a plan to download the image.";
//     }

//     // Create a new record in the downloads table
//     const { image } = await request.json();
//     await supabaseAdmin.from("downloads").insert({ user_id: user.id, image });

//     await supabaseAdmin
//       .from("stripe_customers")
//       .update({ total_downloads: customer.total_downloads + 1 })
//       .eq("user_id", user.id);

//     const subscription = await stripe.subscriptions.retrieve(
//       customer.subscription_id
//     );
//     const subscriptionItem = subscription.items.data[0];
//     const usageRecord = await (
//       stripe.subscriptionItems as any
//     ).createUsageRecord(
//       subscriptionItem.id,
//       {
//         quantity: 1,
//         timestamp: "now",
//         action: "increment",
//       },
//       {
//         idempotencyKey: randomBytes(16).toString("hex"),
//       }
//     );

//     return NextResponse.json(
//       {
//         message: "Usage record created successfully!",
//         total_downloads: customer.total_downloads + 1,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ message: error }, { status: 500 });
//   }
// }
//*----------------------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";
// import { supabaseAdmin } from "@/utils/supabaseServer";
// import { randomBytes } from "crypto";

// export async function POST(request: Request) {
//   try {
//     // Check if the user is logged in
//     const token = request.headers.get("Authorization")?.split("Bearer ")[1];
//     if (!token) {
//       return NextResponse.json(
//         { message: "Missing authentication token" },
//         { status: 401 }
//       );
//     }

//     const {
//       data: { user },
//       error: userError,
//     } = await supabaseAdmin.auth.getUser(token);

//     if (!user || userError) {
//       return NextResponse.json(
//         { message: "Authentication failed", error: userError?.message },
//         { status: 401 }
//       );
//     }

//     // Check the user's active_plan status in the stripe_customers table
//     const { data: customer, error: fetchError } = await supabaseAdmin
//       .from("stripe_customers")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (fetchError) {
//       console.error("Database fetch error:", fetchError);
//       return NextResponse.json(
//         { message: "Failed to fetch customer data", error: fetchError.message },
//         { status: 500 }
//       );
//     }

//     if (!customer || !customer.subscription_id) {
//       return NextResponse.json(
//         { message: "Please subscribe to a plan to download the image." },
//         { status: 403 }
//       );
//     }

//     // Create a new record in the downloads table
//     const { image } = await request.json();
//     const { error: insertError } = await supabaseAdmin
//       .from("downloads")
//       .insert({ user_id: user.id, image });

//     if (insertError) {
//       console.error("Insert error:", insertError);
//       return NextResponse.json(
//         { message: "Failed to record download", error: insertError.message },
//         { status: 500 }
//       );
//     }

//     // Update total downloads
//     const { error: updateError } = await supabaseAdmin
//       .from("stripe_customers")
//       .update({ total_downloads: customer.total_downloads + 1 })
//       .eq("user_id", user.id);

//     if (updateError) {
//       console.error("Update error:", updateError);
//     }

//     // Retrieve subscription and create usage record
//     try {
//       const subscription = await stripe.subscriptions.retrieve(
//         customer.subscription_id
//       );

//       if (!subscription.items.data.length) {
//         console.error("No subscription items found");
//         return NextResponse.json(
//           { message: "Invalid subscription configuration" },
//           { status: 500 }
//         );
//       }

//       const subscriptionItem = subscription.items.data[0];

//       // Create usage record
//       const usageRecord = await stripe.subscriptionItems.createUsageRecord(
//         subscriptionItem.id,
//         {
//           quantity: 1,
//           timestamp: Math.floor(Date.now() / 1000),
//           action: "increment",
//         },
//         {
//           idempotencyKey: randomBytes(16).toString("hex"),
//         }
//       );

//       console.log("Usage record created:", usageRecord);
//     } catch (stripeError: any) {
//       console.error("Stripe error details:", {
//         message: stripeError.message,
//         type: stripeError.type,
//         code: stripeError.code,
//         param: stripeError.param,
//         raw: stripeError.raw,
//       });
//       return NextResponse.json(
//         {
//           message: "Failed to create usage record",
//           error: stripeError.message || String(stripeError),
//           code: stripeError.code,
//           type: stripeError.type,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Download recorded successfully!",
//         total_downloads: customer.total_downloads + 1,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Unexpected error:", error);
//     return NextResponse.json(
//       {
//         message: "An unexpected error occurred",
//         error: error?.message || String(error),
//       },
//       { status: 500 }
//     );
//   }
// }
//*---------------------------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { supabaseAdmin } from "@/utils/supabaseServer";
// import crypto from "crypto";

// async function createMeterEvent(stripeCustomerId: string) {
//   const body = new URLSearchParams({
//     event_name: "storage_images", // Meter name configured in Stripe
//     timestamp: Math.floor(Date.now() / 1000).toString(),
//     identifier: crypto.randomBytes(16).toString("hex"), // Idempotency key
//     "payload[stripe_customer_id]": stripeCustomerId,
//     "payload[value]": "1",
//   });

//   const res = await fetch("https://api.stripe.com/v1/billing/meter_events", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body,
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(`Stripe Meter Event error: ${JSON.stringify(error)}`);
//   }

//   return res.json();
// }

// export async function POST(request: Request) {
//   try {
//     // 1️⃣ Authenticate user
//     const token = request.headers.get("Authorization")?.split("Bearer ")[1];
//     if (!token) throw "Missing auth token";

//     const {
//       data: { user },
//       error: userError,
//     } = await supabaseAdmin.auth.getUser(token);
//     if (!user || userError) throw "Supabase auth error";

//     // 2️⃣ Fetch Stripe customer
//     const { data: customer, error: fetchError } = await supabaseAdmin
//       .from("stripe_customers")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (!customer || !customer.stripe_customer_id || fetchError) {
//       throw "Please subscribe to a plan to download the image.";
//     }

//     // 3️⃣ Get image from request
//     const { image } = await request.json();
//     if (!image) throw "Missing image URL or identifier";

//     // 4️⃣ Insert download record
//     await supabaseAdmin.from("downloads").insert({ user_id: user.id, image });

//     // 5️⃣ Update total downloads
//     await supabaseAdmin
//       .from("stripe_customers")
//       .update({ total_downloads: (customer.total_downloads || 0) + 1 })
//       .eq("user_id", user.id);

//     // 6️⃣ Record usage in Stripe Meter
//     const meterEvent = await createMeterEvent(customer.stripe_customer_id);

//     return NextResponse.json(
//       {
//         message: "Download counted & usage recorded successfully!",
//         total_downloads: (customer.total_downloads || 0) + 1,
//         meterEvent,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Usage Meter Error:", error);
//     return NextResponse.json(
//       { error: error.message || error },
//       { status: 500 }
//     );
//   }
// }
//*--------------------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { supabaseAdmin } from "@/utils/supabaseServer";
// import { stripe } from "@/utils/stripe";
// import crypto from "crypto";

// // Tier configuration matching your pricing image
// const PRICING_TIERS = [
//   { upTo: 5, flatFee: 2500, perUnit: 0 }, // First 5: $25 flat
//   { upTo: Infinity, flatFee: 0, perUnit: 400 }, // 6+: $4 each
// ];

// async function createMeterEvent(stripeCustomerId: string) {
//   const body = new URLSearchParams({
//     event_name: "storage_images",
//     timestamp: Math.floor(Date.now() / 1000).toString(),
//     identifier: crypto.randomBytes(16).toString("hex"),
//     "payload[stripe_customer_id]": stripeCustomerId,
//     "payload[value]": "1",
//   });

//   const res = await fetch("https://api.stripe.com/v1/billing/meter_events", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body,
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(`Stripe Meter Event error: ${JSON.stringify(error)}`);
//   }

//   return res.json();
// }

// // Calculate cost based on current downloads
// function calculateCost(currentDownloads: number): number {
//   let totalCost = 0;
//   let remainingUnits = currentDownloads;

//   for (const tier of PRICING_TIERS) {
//     const unitsInTier = Math.min(remainingUnits, tier.upTo);
//     totalCost += tier.flatFee + unitsInTier * tier.perUnit;
//     remainingUnits -= unitsInTier;

//     if (remainingUnits <= 0) break;
//   }

//   return totalCost;
// }

// // Check if user has payment method and active subscription
// async function checkPaymentStatus(
//   stripeCustomerId: string,
//   currentDownloads: number
// ) {
//   // Get customer's payment methods
//   const paymentMethods = await stripe.paymentMethods.list({
//     customer: stripeCustomerId,
//     type: "card",
//   });

//   const hasPaymentMethod = paymentMethods.data.length > 0;

//   // Get active subscriptions
//   const subscriptions = await stripe.subscriptions.list({
//     customer: stripeCustomerId,
//     status: "active",
//     limit: 1,
//   });

//   const hasActiveSubscription = subscriptions.data.length > 0;

//   // First 5 downloads require subscription + payment method
//   if (currentDownloads < 5) {
//     if (!hasActiveSubscription || !hasPaymentMethod) {
//       throw new Error(
//         "Please complete your subscription setup with a valid payment method."
//       );
//     }
//   }

//   // Downloads 6+ require payment method for metered billing
//   if (currentDownloads >= 5 && !hasPaymentMethod) {
//     throw new Error(
//       "Please add a payment method to continue downloading. Each additional download costs $4."
//     );
//   }

//   return { hasPaymentMethod, hasActiveSubscription };
// }

// export async function POST(request: Request) {
//   try {
//     // 1️⃣ Authenticate user
//     const token = request.headers.get("Authorization")?.split("Bearer ")[1];
//     if (!token) throw new Error("Missing auth token");

//     const {
//       data: { user },
//       error: userError,
//     } = await supabaseAdmin.auth.getUser(token);
//     if (!user || userError) throw new Error("Supabase auth error");

//     // 2️⃣ Fetch Stripe customer
//     const { data: customer, error: fetchError } = await supabaseAdmin
//       .from("stripe_customers")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (!customer || !customer.stripe_customer_id || fetchError) {
//       throw new Error("Please subscribe to a plan to download images.");
//     }

//     // 3️⃣ Check current billing period downloads
//     const billingPeriodStart = new Date();
//     billingPeriodStart.setDate(1); // Start of current month
//     billingPeriodStart.setHours(0, 0, 0, 0);

//     const { count: downloadsThisMonth } = await supabaseAdmin
//       .from("downloads")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", user.id)
//       .gte("created_at", billingPeriodStart.toISOString());

//     const currentDownloads = downloadsThisMonth || 0;

//     // 4️⃣ Verify payment status before allowing download
//     await checkPaymentStatus(customer.stripe_customer_id, currentDownloads);

//     // 5️⃣ Get image from request
//     const { image } = await request.json();
//     if (!image) throw new Error("Missing image URL or identifier");

//     // 6️⃣ Calculate next download cost
//     const nextDownloadNumber = currentDownloads + 1;
//     const costInfo = {
//       downloadNumber: nextDownloadNumber,
//       isInFreeTier: nextDownloadNumber <= 5,
//       additionalCost: nextDownloadNumber > 5 ? 400 : 0, // $4.00 in cents
//     };

//     // 7️⃣ Insert download record
//     await supabaseAdmin.from("downloads").insert({
//       user_id: user.id,
//       image,
//       download_number: nextDownloadNumber,
//     });

//     // 8️⃣ Update total downloads
//     await supabaseAdmin
//       .from("stripe_customers")
//       .update({
//         total_downloads: (customer.total_downloads || 0) + 1,
//         monthly_downloads: nextDownloadNumber,
//       })
//       .eq("user_id", user.id);

//     // 9️⃣ Record usage in Stripe Meter
//     const meterEvent = await createMeterEvent(customer.stripe_customer_id);

//     return NextResponse.json(
//       {
//         message: "Download successful!",
//         download_info: {
//           total_downloads: (customer.total_downloads || 0) + 1,
//           monthly_downloads: nextDownloadNumber,
//           downloads_remaining_in_flat_tier: Math.max(0, 5 - nextDownloadNumber),
//           cost_info: costInfo,
//         },
//         meterEvent,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Usage Meter Error:", error);
//     return NextResponse.json(
//       { error: error.message || "An error occurred" },
//       { status: 400 }
//     );
//   }
// }
//*--------------------------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { supabaseAdmin } from "@/utils/supabaseServer";
// import { stripe } from "@/utils/stripe";
// import crypto from "crypto";

// // Tier configuration
// const PRICING_TIERS = [
//   { upTo: 5, flatFee: 2500, perUnit: 0 }, // First 5 downloads: $25 flat
//   { upTo: Infinity, flatFee: 0, perUnit: 400 }, // 6+: $4 each
// ];

// // Create Stripe Meter Event
// async function createMeterEvent(stripeCustomerId: string) {
//   const body = new URLSearchParams({
//     event_name: "storage_images",
//     timestamp: Math.floor(Date.now() / 1000).toString(),
//     identifier: crypto.randomBytes(16).toString("hex"),
//     "payload[stripe_customer_id]": stripeCustomerId,
//     "payload[value]": "1",
//   });

//   const res = await fetch("https://api.stripe.com/v1/billing/meter_events", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body,
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(`Stripe Meter Event error: ${JSON.stringify(error)}`);
//   }

//   return res.json();
// }

// // Check user payment status
// async function checkPaymentStatus(
//   stripeCustomerId: string,
//   currentDownloads: number
// ) {
//   const paymentMethods = await stripe.paymentMethods.list({
//     customer: stripeCustomerId,
//     type: "card",
//   });

//   const hasPaymentMethod = paymentMethods.data.length > 0;

//   const subscriptions = await stripe.subscriptions.list({
//     customer: stripeCustomerId,
//     status: "active",
//     limit: 1,
//   });

//   const hasActiveSubscription = subscriptions.data.length > 0;

//   if (currentDownloads < 5) {
//     if (!hasActiveSubscription || !hasPaymentMethod) {
//       throw new Error(
//         "Please complete your subscription setup with a valid payment method."
//       );
//     }
//   }

//   if (currentDownloads >= 5 && !hasPaymentMethod) {
//     throw new Error(
//       "Please add a payment method to continue downloading. Each additional download costs $4."
//     );
//   }

//   return { hasPaymentMethod, hasActiveSubscription };
// }

// // Calculate download cost
// function calculateCost(downloadNumber: number) {
//   let cost = 0;
//   for (const tier of PRICING_TIERS) {
//     if (downloadNumber <= tier.upTo) {
//       cost +=
//         tier.flatFee +
//         tier.perUnit * Math.max(0, downloadNumber - (tier.upTo - 1));
//       break;
//     }
//   }
//   return cost;
// }

// // API Route
// export async function POST(request: Request) {
//   try {
//     // 1️⃣ Authenticate user
//     const token = request.headers.get("Authorization")?.split("Bearer ")[1];
//     if (!token) throw new Error("Missing auth token");

//     const {
//       data: { user },
//       error: userError,
//     } = await supabaseAdmin.auth.getUser(token);

//     if (!user || userError) throw new Error("Supabase auth error");

//     // 2️⃣ Fetch Stripe customer
//     const { data: customer, error: fetchError } = await supabaseAdmin
//       .from("stripe_customers")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     if (!customer || !customer.stripe_customer_id || fetchError) {
//       throw new Error("Please subscribe to a plan to download images.");
//     }

//     // 3️⃣ Get current month's downloads
//     const billingPeriodStart = new Date();
//     billingPeriodStart.setDate(1);
//     billingPeriodStart.setHours(0, 0, 0, 0);

//     const { count: downloadsThisMonth } = await supabaseAdmin
//       .from("downloads")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", user.id)
//       .gte("created_at", billingPeriodStart.toISOString());

//     const currentDownloads = downloadsThisMonth || 0;

//     // 4️⃣ Verify payment status
//     await checkPaymentStatus(customer.stripe_customer_id, currentDownloads);

//     // 5️⃣ Get image from request
//     const { image } = await request.json();
//     if (!image) throw new Error("Missing image URL or identifier");

//     // 6️⃣ Calculate next download info
//     const nextDownloadNumber = currentDownloads + 1;
//     const cost = calculateCost(nextDownloadNumber);

//     // 7️⃣ Insert download record
//     await supabaseAdmin.from("downloads").insert({
//       user_id: user.id,
//       image,
//       download_number: nextDownloadNumber,
//     });

//     // 8️⃣ Update customer's download count
//     await supabaseAdmin
//       .from("stripe_customers")
//       .update({
//         total_downloads: (customer.total_downloads || 0) + 1,
//         monthly_downloads: nextDownloadNumber,
//       })
//       .eq("user_id", user.id);

//     // 9️⃣ Create Stripe Meter Event
//     const meterEvent = await createMeterEvent(customer.stripe_customer_id);

//     return NextResponse.json(
//       {
//         message: "Download successful!",
//         download_info: {
//           total_downloads: (customer.total_downloads || 0) + 1,
//           monthly_downloads: nextDownloadNumber,
//           downloads_remaining_in_flat_tier: Math.max(0, 5 - nextDownloadNumber),
//           cost,
//         },
//         meterEvent,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Usage Meter Error:", error);
//     return NextResponse.json(
//       { error: error.message || "An error occurred" },
//       { status: 400 }
//     );
//   }
// }
//*----------------------------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabaseServer";
import { stripe } from "@/utils/stripe";
import crypto from "crypto";

// Tier configuration
const PRICING_TIERS = [
  { upTo: 5, flatFee: 2500, perUnit: 0 }, // First 5 downloads: $25 flat
  { upTo: Infinity, flatFee: 0, perUnit: 400 }, // 6+: $4 each
];

// Create Stripe Meter Event
async function createMeterEvent(stripeCustomerId: string) {
  const body = new URLSearchParams({
    event_name: "storage_images",
    timestamp: Math.floor(Date.now() / 1000).toString(),
    identifier: crypto.randomBytes(16).toString("hex"),
    "payload[stripe_customer_id]": stripeCustomerId,
    "payload[value]": "1",
  });

  const res = await fetch("https://api.stripe.com/v1/billing/meter_events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Stripe Meter Event error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

// Check user payment status
async function checkPaymentStatus(
  stripeCustomerId: string,
  currentDownloads: number
) {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: stripeCustomerId,
    type: "card",
  });

  const hasPaymentMethod = paymentMethods.data.length > 0;

  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: "active",
    limit: 1,
  });

  const hasActiveSubscription = subscriptions.data.length > 0;

  if (currentDownloads < 5) {
    if (!hasActiveSubscription || !hasPaymentMethod) {
      throw new Error(
        "Please complete your subscription setup with a valid payment method."
      );
    }
  }

  if (currentDownloads >= 5 && !hasPaymentMethod) {
    throw new Error(
      "Please add a payment method to continue downloading. Each additional download costs $4."
    );
  }

  return { hasPaymentMethod, hasActiveSubscription };
}

// Calculate download cost
function calculateCost(downloadNumber: number) {
  let cost = 0;
  for (const tier of PRICING_TIERS) {
    if (downloadNumber <= tier.upTo) {
      cost +=
        tier.flatFee +
        tier.perUnit * Math.max(0, downloadNumber - (tier.upTo - 1));
      break;
    }
  }
  return cost;
}

// API Route
export async function POST(request: Request) {
  try {
    // 1️⃣ Authenticate user
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) throw new Error("Missing auth token");

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (!user || userError) throw new Error("Supabase auth error");

    // 2️⃣ Fetch Stripe customer
    const { data: customer, error: fetchError } = await supabaseAdmin
      .from("stripe_customers")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!customer || !customer.stripe_customer_id || fetchError) {
      throw new Error("Please subscribe to a plan to download images.");
    }

    // 3️⃣ Get current month's downloads using `ts` column
    const billingPeriodStart = new Date();
    billingPeriodStart.setDate(1);
    billingPeriodStart.setHours(0, 0, 0, 0);

    const { count: downloadsThisMonth } = await supabaseAdmin
      .from("downloads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("ts", billingPeriodStart.toISOString());

    const currentDownloads = downloadsThisMonth || 0;

    // 4️⃣ Verify payment status
    await checkPaymentStatus(customer.stripe_customer_id, currentDownloads);

    // 5️⃣ Get image from request
    const { image } = await request.json();
    if (!image) throw new Error("Missing image URL or identifier");

    // 6️⃣ Calculate next download info
    const nextDownloadNumber = currentDownloads + 1;
    const cost = calculateCost(nextDownloadNumber);

    // 7️⃣ Insert download record
    await supabaseAdmin.from("downloads").insert({
      user_id: user.id,
      image,
      ts: new Date().toISOString(),
    });

    // 8️⃣ Update customer's total downloads
    const { data: updatedCustomers, error: updateError } = await supabaseAdmin
      .from("stripe_customers")
      .update({
        total_downloads: (customer.total_downloads ?? 0) + 1,
      })
      .eq("user_id", user.id)
      .select("*");

    if (updateError || !updatedCustomers || updatedCustomers.length === 0) {
      throw new Error("Failed to update download count");
    }

    const updatedCustomer = updatedCustomers[0];

    // 9️⃣ Create Stripe Meter Event
    const meterEvent = await createMeterEvent(customer.stripe_customer_id);

    return NextResponse.json(
      {
        message: "Download successful!",
        download_info: {
          total_downloads: updatedCustomer.total_downloads,
          monthly_downloads: nextDownloadNumber,
          downloads_remaining_in_flat_tier: Math.max(0, 5 - nextDownloadNumber),
          cost,
        },
        meterEvent,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Usage Meter Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 400 }
    );
  }
}
