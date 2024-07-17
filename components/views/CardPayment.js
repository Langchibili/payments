'use client'

import { apiKey, sendWebHookRequest } from "@/Constants"
import React from "react"

export default class CardPayment extends React.Component {

  getPaidWithLenco = (amount,email,reference,redirectUrl,webhookUrl,chargeCustomer)=> {
    if (window.LencoPay) { // Check if LencoPay is loaded
      LencoPay.getPaid({
        key: apiKey, // your Lenco public key
        reference: reference === "unset"? "ref-"+"N"+ Date.now(): reference +"N"+ Date.now(), // a unique reference you generated
        email: email == "unset"? "langtechdev@gmail.com" : email, // the customer's email address
        amount: parseInt(amount), // the amount the customer is to pay
        currency: "ZMW",
        bearer: chargeCustomer? 'customer' : 'merchant',
        channels: ["card"],
        onSuccess: function (response) {
          // This happens after the payment is completed successfully
          if(webhookUrl === "unset"){
             window.location = redirectUrl // redirect user then
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
        },
      })
    } else {
      console.error('LencoPay is not loaded')
    }
  }


  render() {
    const { amount,email,reference,redirectUrl,webhookUrl,chargeCustomer } = this.props.query
    return this.getPaidWithLenco(amount,email,reference,redirectUrl,webhookUrl,chargeCustomer)
  }
}
