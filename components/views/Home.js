'use client'

import React from 'react'
import AirtelMoney from './AirtelMoney'
import MtnMoney from './MtnMoney'
import CardPayment from './CardPayment'

export default class Home extends React.Component {
  constructor(props){
     super(props)
     this.state = {
        selectedPaymentMethod: null,
     }
  }

  
  renderPaymentMethod = ()=>{
     const { amount } = this.props.query
     const isAmountInvalid = parseInt(amount) === 0 || amount === null || amount === undefined || parseInt(amount) < 0
     if(isAmountInvalid) return <p>An error occured, redo the process</p>

     if(this.state.selectedPaymentMethod === null) {
        return (<div className="container">
          <h1>OkraPay</h1>
          <h3 className="my-4">Select Payment Method</h3><hr/>
            <div 
              style={{backgroundColor: "#f7f7f7",fontWeight:500}}
              className="btn mb-2 btn-outline-secondary d-inline-block align-items-center" 
              onClick={() => { this.setState({ selectedPaymentMethod: "AirtelMoney" }) }}
            >
              <img src="/airtel-logo.png" alt="Airtel Money" className="img-fluid me-2" style={{ maxHeight: '50px' }} />
              Airtel Money
            </div>
            <br/>
            <div 
              style={{backgroundColor: "#f7f7f7",fontWeight:500}}
              className="btn mb-2 btn-outline-secondary d-inline-block align-items-center" 
              onClick={() => { this.setState({ selectedPaymentMethod: "MtnMoney" }); }}
            >
              <img src="/mtn-momo-logo-mobile-money-logo-png-transparent.png" alt="MTN Money" className="img-fluid me-2" style={{ maxHeight: '50px' }} />
              MTN Money
            </div>
            <br/>
            <div 
              style={{backgroundColor: "#f7f7f7",fontWeight:500}}
              className="btn btn-outline-secondary d-inline-block align-items-center" 
              onClick={() => { this.setState({ selectedPaymentMethod: "CardMoney" }); }}
            >
              <img src="/card-payments-icon.png" alt="MTN Money" className="img-fluid me-2" style={{ maxHeight: '50px' }} />
              Card Payment
            </div>
        </div>)
     }
     else if(this.state.selectedPaymentMethod === "AirtelMoney"){
         return (<>
                <button onClick={()=>{this.setState({selectedPaymentMethod: null})}}>Back</button>
                <AirtelMoney {...this.props} /></>)
     }
     else if(this.state.selectedPaymentMethod === "MtnMoney"){
        return (<>
                <button onClick={()=>{this.setState({selectedPaymentMethod: null})}}>Back</button>
                <br/>
                <MtnMoney {...this.props}/></>)
    }
    else{
      return (<>
        <button onClick={()=>{this.setState({selectedPaymentMethod: null})}}>Back</button>
        <br/>
        <CardPayment {...this.props}/></>)
    }
 }

  render(){
    return (
      <div className="container center-container">
        {this.renderPaymentMethod()}
      </div>
    )
  }
}