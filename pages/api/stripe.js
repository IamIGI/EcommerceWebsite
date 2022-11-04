import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1M0Q5JAgydS1xEfNKgHWXB0r' }, //Pickup at the salon
                    { shipping_rate: 'shr_1M0Q6tAgydS1xEfNE2ZJMZqA' }, //Courier
                    { shipping_rate: 'shr_1M0Q7FAgydS1xEfNqMO8a55S' }, //Inpost
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImg = img
                        .replace('image-', 'https://cdn.sanity.io/images/a0kgdebl/production/')
                        .replace('-webp', '.webp'); // maybe you will have to do the same with png and img

                    return {
                        price_data: {
                            currency: 'pln',
                            product_data: {
                                name: item.name,
                                images: [newImg],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            };
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
