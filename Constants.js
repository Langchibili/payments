import { publicKey } from "./secrets"

export const apiKey = publicKey

export const returnNineDigitNumber = (phoneNumber) =>{
    // Remove any non-digit characters
    let normalizedNumber = phoneNumber.replace(/\D/g, '')
  
    // Extract the last nine digits
    return normalizedNumber.slice(-9)
}

export const sendWebHookRequest = async (webhookUrl, response) => {
    try {
        const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
        })

        if (!res.ok) {
           throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error sending webhook request:', error)
        throw error; // Re-throw the error so it can be handled by the caller
    }
}
