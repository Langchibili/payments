'use client'

import { useSearchParams } from 'next/navigation'
import Home from '@/components/views/Home'
import Loader from '@/components/includes/Loader'

export default function App() {
  const searchParams = useSearchParams()
  
  // Extract query parameters
  const amount = searchParams.get('amount')
  const redirectUrl = searchParams.get('redirectUrl')
  const webhookUrl = searchParams.get('webhook')
  const email = searchParams.get('email')
  const reference = searchParams.get('reference')
  const chargeCustomer = searchParams.get('chargeCustomer')

  // Check if any required parameter is missing or invalid
  const requiredParams = [amount, redirectUrl, webhookUrl, email, reference,chargeCustomer]
  const areParamsValid = requiredParams.every(param => param !== null && param !== undefined && param !== '' && (param !== '0' && !isNaN(Number(param)) ? Number(param) > 0 : true))

  // Return Loader if parameters are invalid or loading
  if (!areParamsValid) {
    return <Loader color="secondary"/>
  }

  // Pass query parameters as props to Home component
  const query = { amount, redirectUrl, webhookUrl, email, reference, chargeCustomer}
  
  return <Home query={query} />
}

