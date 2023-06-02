import axios from 'axios';
import { showAlert } from './alert';

// const stripe = Stripe(
//   'pk_test_51NDp0rKjiPgUYShMpM4aqPJx9AITKc7NPKYwJP4excGjjAwG7ScAw1jA1jjZGzrNAvuSYr1QFSltj8Ga5NnBZY8y009AX58IQv'
// );

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + Charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
