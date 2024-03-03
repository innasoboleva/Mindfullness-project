import React from 'react';
import { PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";

function Checkout() {

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    const onCreateOrder = (data,actions) => {
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

    const onApproveOrder = (data,actions) => {
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

            {/* <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          createOrder={async () => {
            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart: [
                    {
                      id: '1', // "YOUR_PRODUCT_ID",
                      quantity: '1', //"YOUR_PRODUCT_QUANTITY",
                    },
                  ],
                }),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`,
              );
            }
          }}
        /> */}
        </React.Fragment>
    )

};

export default Checkout;