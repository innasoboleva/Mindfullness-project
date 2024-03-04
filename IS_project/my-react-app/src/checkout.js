import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function Checkout(props) {
  const { handleSuccessfullCheckoout } = props;
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "8.99",
          },
        },
      ],
    });
  }

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const jwtToken = localStorage.getItem('token');
      // Update server
      fetch('http://127.0.0.1:8000/api/subscribed/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == 'success') {
            handleSuccessfullCheckoout();
            console.log('Server was updated, user subscribed.')
          } else {
            console.error('Error: ', data.message);
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        });

      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  }

  return (
    <React.Fragment>
      <div className="checkout">
        {isPending ? <p>LOADING...</p> :
          (
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
            />
          )}
      </div>
    </React.Fragment>
  )

};

export default Checkout;