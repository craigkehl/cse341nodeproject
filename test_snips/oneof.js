router.post('/testData2/', [
    oneOf([
      [
        body('billingFirstName', "Please Enter Your First Name").isLength({
          min: 1
        }),
        body('billingLastName', "Please Enter Your Last Name").isLength({
          min: 1
        }),
        body('billingAddress1', "Please Enter Your Billing Address").isLength({
          min: 1
        }),
        body('billingZip', "Please Enter Your Billing ZipCode").isLength({
          min: 1
        }),
        body('billingCity', "Please Enter Your Billing City").isLength({
          min: 1
        }),
        body('billingState', "Please Enter Your Billing State").isLength({
          min: 1
        })
      ],
      body('billingSameAsShipping').equals('yes')
    ], "Please Fill Out All Fields Of Your Billing Address"),
    body('creditCardNumber', 'Please Enter A Vaild Credit Card Number').isCreditCard(),
    body('expmonth', 'Exp Month Empty').isLength({
      min: 1
    }),
    body('expyear', 'Exp Year Empty').isLength({
      min: 1
    }),
    body('CVV', 'CVV Empty').isLength({
      min: 3
    })
  ],
  (req, res) => {...