'use client'

import React from "react"
import { getApiKey, returnNineDigitNumber, sendWebHookRequest } from "@/Constants"

export default class AirtelMoney extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      errorMessage: '' // State to handle error messages
    }
    this.phoneNumberRef = React.createRef() // Create a ref for the phone number input
  }

  handlePhoneNumberChange = (event) => {
    this.setState({ phoneNumber: event.target.value, errorMessage: '' }) // Update state when input changes
  }

  getPaidWithLenco = (phoneNumber,amount,email,reference,redirectUrl,webhookUrl,site,chargeCustomer)=> {
    if (window.LencoPay) { // Check if LencoPay is loaded
      LencoPay.getPaid({
        key: getApiKey(site), // your Lenco public key
        reference: reference === "unset"? "ref-"+"N"+ Date.now(): reference +"N"+ Date.now(), // a unique reference you generated
        email: email == "unset"? "langtechdev@gmail.com" : email, // the customer's email address
        amount: parseInt(amount), // the amount the customer is to pay
        currency: "ZMW",
        bearer: chargeCustomer? 'customer' : 'merchant',
        channels: ["mobile-money"],
        customer: {
          phone: "0"+returnNineDigitNumber(phoneNumber)
        },
        onSuccess: function (response) {
          // This happens after the payment is completed successfully
          if(webhookUrl === "unset"){
             window.location = redirectUrl.replace(/\$/g, '&') // redirect user then
          } 
          else{
             sendWebHookRequest(webhookUrl,response)
          }
        },
        onClose: function () {
          alert('Payment was not completed, window closed.')
        },
        onConfirmationPending: function () {
          alert('Your purchase will be completed when the payment is confirmed')
        }
      })
    } else {
      console.error('LencoPay is not loaded')
    }
  }

  handleNextButtonClick = () => {
    const { phoneNumber } = this.state
    const { amount,email,reference,redirectUrl,webhookUrl,site,chargeCustomer} = this.props.query
    const nineDigitNumber = returnNineDigitNumber(phoneNumber) // Extract the 9-digit number

    if (nineDigitNumber && nineDigitNumber[1] === '7') {
      // Proceed if the second digit is '7'
      this.getPaidWithLenco(phoneNumber,amount,email,reference,redirectUrl,webhookUrl,site,chargeCustomer)
      // You can add additional logic here to proceed with form submission or navigation
    } else {
      // Show error message if the second digit is not '7'
      this.setState({ errorMessage: 'Add a valid Airtel Money number' })
    }
  }


  renderPaymentPage = () => {
    const { phoneNumber, errorMessage } = this.state
    const { amount } = this.props.query

    // Check if the phone number is at least 10 digits long
    const isPhoneNumberValid = phoneNumber.replace(/\D/g, '').length >= 10

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <h2 className="card-title mb-4">Airtel Money</h2>
              {amount && <p className="card-text"><strong>Amount:</strong> {amount}</p>}
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className="form-control"
                  value={phoneNumber}
                  onChange={this.handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  ref={this.phoneNumberRef}
                />
              </div>
              {phoneNumber.length > 0 && (
                <p className="mt-3"><strong>Entered Phone Number:</strong> {phoneNumber}</p>
              )}
              {errorMessage && (
                <div className="alert alert-danger mt-3">{errorMessage}</div>
              )}
              <button
                className="btn btn-primary mt-3"
                onClick={this.handleNextButtonClick}
                disabled={!isPhoneNumberValid} // Disable the button if phone number is not valid
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderPaymentPage()
  }
}
