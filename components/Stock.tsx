import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import productModel from '../models/product';
import config from "../config/config.json";
import { Base, Typography } from '../styles';


function StockList({products, setProducts}) {

  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, []);

  const list = products.map((product, index) => {
    return <Text 
            key={index}
            style={{color: '#9f9f9f', fontSize: 30, textAlign: 'center'}} 
            >
              { product.name } - { product.stock }
            </Text>});

  return (
    <View style={{backgroundColor: '#333', padding: 10}}>
      {list}
    </View>
  );
}


export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={Base.lagertext}>
        Lagerförteckning
        </Text>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}