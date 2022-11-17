import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51M50KlAkX4Y3IhiA8guZ9ojmlrFMPkF2BXRZncnJkAe9xhgKusFNXMgLftM1YKSCPEvyxcOdQ3hr4dFzrjaFf82T00AMWvz2eg');

export default function ProcessPayment() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: 'sk_test_51M50KlAkX4Y3IhiAPCl8EzbjL5C3jgoBiTbAil1oJhRh479gfA4MU6LozVPInf3Z82YUSrZ2t6YYA6hRtunrXddI00hDNT5DJz',
//   };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};