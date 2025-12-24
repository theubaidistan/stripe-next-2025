// // import { NextResponse } from "next/server";
// // import { stripe } from "@/utils/stripe";

// // export async function POST(request: Request) {
// //   try {
// //     const { priceId, email, userId } = await request.json();

// //     const session = await stripe.checkout.sessions.create({
// //       metadata: {
// //         user_id: userId,
// //       },
// //       customer_email: email,
// //       payment_method_types: ["card"],
// //       line_items: [
// //         {
// //           // base subscription
// //           price: priceId,
// //         },
// //         {
// //           // one-time setup fee
// //           price: "price_1Sh1hn2cCUKxlBeGR57kaVLu",
// //           // price: "price_1ShOz42cCUKxlBeGktnrD7xP",
// //           quantity: 1,
// //         },
// //       ],
// //       mode: "subscription",
// //       success_url: `${request.headers.get("origin")}/success`,
// //       cancel_url: `${request.headers.get("origin")}/cancel`,
// //     });

// //     return NextResponse.json({ id: session.id });
// //   } catch (error: any) {
// //     console.error(error);
// //     return NextResponse.json({ message: error.message }, { status: 500 });
// //   }
// // }

// //*----------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";

// export async function POST(request: Request) {
//   try {
//     // Get raw request body
//     const bodyText = await request.text();

//     if (!bodyText) {
//       return NextResponse.json(
//         { message: "No request body sent" },
//         { status: 400 }
//       );
//     }

//     // Parse JSON safely
//     let data: { priceId: string; email: string; userId: string };
//     try {
//       data = JSON.parse(bodyText);
//     } catch {
//       return NextResponse.json(
//         { message: "Invalid JSON body" },
//         { status: 400 }
//       );
//     }

//     const { priceId, email, userId } = data;

//     // Validate required fields
//     if (!priceId || !email || !userId) {
//       return NextResponse.json(
//         { message: "Missing priceId, email, or userId" },
//         { status: 400 }
//       );
//     }

//     // Create Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       customer_email: email,
//       metadata: { user_id: userId },
//       line_items: [
//         {
//           price: priceId, // subscription price
//           quantity: 1,
//         },
//         // {
//         //   price: "price_1Sh1hn2cCUKxlBeGR57kaVLu", // one-time setup fee
//         //   quantity: 1,
//         // },
//       ],
//       mode: "subscription",
//       success_url: `${request.headers.get("origin")}/success`,
//       cancel_url: `${request.headers.get("origin")}/cancel`,
//     });

//     // Return session ID
//     return NextResponse.json({ id: session.id });
//   } catch (error: any) {
//     console.error("Stripe Checkout Error:", error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
//*--------------------------------------------------------------------------------------------------------------
// import { NextResponse } from "next/server";
// import { stripe } from "@/utils/stripe";

// export async function POST(request: Request) {
//   try {
//     const bodyText = await request.text();

//     if (!bodyText) {
//       return NextResponse.json(
//         { message: "No request body sent" },
//         { status: 400 }
//       );
//     }

//     let data: {
//       priceId: string;
//       setupFeeId?: string;
//       email: string;
//       userId: string;
//     };
//     try {
//       data = JSON.parse(bodyText);
//     } catch {
//       return NextResponse.json(
//         { message: "Invalid JSON body" },
//         { status: 400 }
//       );
//     }

//     const { priceId, setupFeeId, email, userId } = data;

//     if (!priceId || !email || !userId) {
//       return NextResponse.json(
//         { message: "Missing priceId, email, or userId" },
//         { status: 400 }
//       );
//     }

//     //* Build line items dynamically Quantity
//     const line_items = [{ price: priceId, quantity: 1 }];
//     if (setupFeeId && setupFeeId !== priceId) {
//       line_items.push({ price: setupFeeId, quantity: 1 });
//     }

//     // // Build line items dynamically to avoid duplicates
//     // const line_items = [{ price: priceId }];
//     // if (setupFeeId && setupFeeId !== priceId) {
//     //   line_items.push({ price: setupFeeId });
//     // }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       customer_email: email,
//       metadata: { user_id: userId },
//       line_items,
//       mode: "subscription",
//       success_url: `${request.headers.get("origin")}/success`,
//       cancel_url: `${request.headers.get("origin")}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error: any) {
//     console.error("Stripe Checkout Error:", error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
//*----------------------------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();

    if (!bodyText) {
      return NextResponse.json(
        { message: "No request body sent" },
        { status: 400 }
      );
    }

    let data: {
      defaultPriceId: string;
      meteredPriceId: string;
      email: string;
      userId: string;
    };

    try {
      data = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { defaultPriceId, meteredPriceId, email, userId } = data;

    if (!defaultPriceId || !meteredPriceId || !email || !userId) {
      return NextResponse.json(
        { message: "Missing defaultPriceId, meteredPriceId, email, or userId" },
        { status: 400 }
      );
    }

    // ✅ Correct way: use line_items for both recurring + metered
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        { price: defaultPriceId, quantity: 1 }, // recurring
        { price: meteredPriceId }, // metered
      ],
      metadata: { user_id: userId },
      success_url: `${request.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error(
      "Stripe Checkout Error Full:",
      JSON.stringify(error, null, 2)
    );
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
