import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import CountUp from 'react-countup';
import Colors from '@/constants/Colors';
import { useEffect } from 'react';


export default function TabOneScreen() {
  useEffect(() => {
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
