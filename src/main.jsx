import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/fonts/stylesheet.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ProfileProvider } from "./components/context/createProfileContext";
const stripePromise = loadStripe('pk_test_51OwuO4LcfLzcwwOYdssgGfUSfOgWT1LwO6ewi3CEPewY7WEL9ATqH6WJm3oAcLDA3IgUvVYLVEBMIEu0d8fUwhlw009JwzEYmV');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Elements stripe={stripePromise}>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>

    </Elements>
  </React.StrictMode>
);
