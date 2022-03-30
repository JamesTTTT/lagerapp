import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text style={{color: '#9f9f9f', fontSize: 30, textAlign: 'center'}} key={index}>{ product.name } - { product.stock }</Text>);

  return (
    <View style={{backgroundColor: '#333', padding: 10}}>
      {list}
    </View>
  );
}


export default function Stock() {
  return (
    <View>
      <Text style={{color: '#333', fontSize: 24, textAlign: 'center'}}>Lagerförteckning</Text>
      <StockList/>
    </View>
  );
}