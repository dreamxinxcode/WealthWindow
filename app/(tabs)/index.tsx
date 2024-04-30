import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import CountUp from 'react-countup';
import Colors from '@/constants/Colors';
import { useEffect } from 'react';
import { ALPHA_VANTAGE_API_KEY } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async () => {
  try {
    const stockEntry = { ticker: 'TSLA', shares: parseInt('123', 10) };
    const jsonValue = JSON.stringify(stockEntry);
    await AsyncStorage.setItem('stock_data', jsonValue);
  } catch (e) {
    alert('Failed to save the data to the storage');
  }
};

const getStockPrice = async (symbol: string) => {
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

const getGoldSpotPrice = async () => {
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

export default function TabOneScreen() {
  useEffect(() => {
    saveData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarItem}>Gold <CountUp prefix={'$'} decimals={2} decimal='.' end={12342.54} duration={1} /></Text>
        <Text style={styles.topBarItem}>Silver <CountUp prefix={'$'} decimals={2} decimal='.' end={12342.54} duration={1} /></Text>
        <Text style={styles.topBarItem}>Platinum <CountUp prefix={'$'} decimals={2} decimal='.' end={12342.54} duration={1} /></Text>
      </View>
      <View style={styles.networth}>
        <Text style={styles.networthTotal}><CountUp prefix={'$'} decimals={2} end={12342.32} duration={1} /></Text>
        <View style={styles.assets}>
          <Text style={styles.assetsItem}>Gold: <CountUp prefix={'$'} decimals={2} decimal='.' end={12342.54} duration={1} /></Text>
          <Text style={styles.assetsItem}>Silver: <CountUp prefix={'$'} decimals={2} decimal='.' end={43687.00} duration={1} /></Text>
          <Text style={styles.assetsItem}>Stocks: <CountUp prefix={'$'} decimals={2} decimal='.' end={557632.09} duration={1} /></Text>
          <Text style={styles.assetsItem}>Other: <CountUp prefix={'$'} decimals={2} decimal='.' end={447632.91} duration={1} /></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  topBarItem: {
    margin: 5,
  },
  networth: {
    alignItems: 'center'
  },
  networthTotal: {
    color: Colors.bullish.color,
    fontSize: 50,
    fontWeight: '700'
  },
  assets: {
    display: 'flex',
    flexDirection: 'row'
  },
  assetsItem: {
    margin: 3
  }
});
