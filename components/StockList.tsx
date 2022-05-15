import productModel from '../models/product';
import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles';

export default function StockList({products, setProducts}) {

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