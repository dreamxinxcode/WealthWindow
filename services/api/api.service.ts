import { ALPHA_VANTAGE_API_KEY } from 'react-native-dotenv';


export const getStockPrice = async (symbol: string) => {
    const url: string = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {      
        return data['Global Quote']['05. price'];
      } else {
        throw new Error(`API error with status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching metal price:', error);
    }
};
  
export const getGoldSpotPrice = async () => {
    const fromCurrency = 'XAU';
    const toCurrency = 'USD';
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('DATA', data); // Log the full response data to diagnose the issue
        if (response.ok && data['Realtime Currency Exchange Rate']) {
        const rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        console.log(`Current spot price of gold (XAU to USD): $${rate}`);
        return rate;
        } else {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${JSON.stringify(data)}`);
        }
    } catch (error) {
        console.error('Error fetching gold spot price:', error);
        return null;
    }
};
