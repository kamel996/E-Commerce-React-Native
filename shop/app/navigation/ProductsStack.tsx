import {  createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Products from '@/screens/Products';

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
  CartModal: undefined;
};

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsStackNav = () => {
    return (
      <ProductsStack.Navigator>
       <ProductsStack.Screen name='Products' component={Products} options={{headerTitle: "TechTrek Shop"}} />
      </ProductsStack.Navigator>
    );
  };
  

export default ProductsStackNav;