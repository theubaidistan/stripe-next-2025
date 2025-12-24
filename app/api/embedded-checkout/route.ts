// import { NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";

// export async function POST(request: Request) {
//   try {
//     const { priceId, email } = await request.json();

//     const session = await stripe.checkout.sessions.create({
//       ui_mode: "embedded",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       customer_email: email, // ✅ pre-filled email
//       return_url: `${request.headers.get(
//         "origin"
//       )}/return?session_id={CHECKOUT_SESSION_ID}`,
//     });

//     return NextResponse.json({
//       id: session.id,
//       client_secret: session.client_secret,
//     });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
//*------------------------------------------------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";

export async function POST(request: Request) {
  try {
    const { defaultPriceId, meteredPriceId, email, userId } =
      await request.json();

    if (!defaultPriceId || !meteredPriceId || !email || !userId) {
      return NextResponse.json(
        { message: "Missing defaultPriceId, meteredPriceId, email, or userId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        { price: defaultPriceId, quantity: 1 }, // recurring subscription
        { price: meteredPriceId }, // metered usage
      ],
      mode: "subscription",
      customer_email: email, // pre-fill email
      metadata: { user_id: userId },
      return_url: `${request.headers.get(
        "origin"
      )}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe Embedded Checkout Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
//*-------------------------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";

// export async function POST(request: Request) {
//   try {
//     const { defaultPriceId, meteredPriceId, email, userId } =
//       await request.json();

//     if (!defaultPriceId || !meteredPriceId || !email || !userId) {
//       return NextResponse.json(
//         { message: "Missing defaultPriceId, meteredPriceId, email, or userId" },
//         { status: 400 }
//       );
//     }

//     const session = await stripe.checkout.sessions.create({
//       ui_mode: "embedded",
//       payment_method_types: ["card"],
//       line_items: [
//         { price: defaultPriceId, quantity: 1 }, // recurring subscription
//         { price: meteredPriceId }, // metered usage
//       ],
//       mode: "subscription",
//       customer_email: email, // pre-fill email
//       metadata: { user_id: userId },
//       return_url: `${request.headers.get(
//         "origin"
//       )}/return?session_id={CHECKOUT_SESSION_ID}`,
//     });

//     return NextResponse.json({
//       client_secret: session.client_secret,
//     });
//   } catch (error: any) {
//     console.error("Stripe Embedded Checkout Error:", error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
