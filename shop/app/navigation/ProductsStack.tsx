import {  NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Products from '@/screens/Products';
import ProductDetails from '@/screens/ProductDetails';

type ProductsStackParamList = {
  Products: undefined;
  ProductDetails: { id: number };
  CartModal: undefined;
};

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
export type ProductsPageProps = NativeStackScreenProps<ProductsStackParamList, 'Products'>;
export type ProductDetailsPageProps = NativeStackScreenProps<ProductsStackParamList, 'ProductDetails'>;

const ProductsStackNav = () => {
    return (
      <ProductsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1'
        },
        headerTintColor: '#141414'
      }}>
       <ProductsStack.Screen name='Products' component={Products} options={{headerTitle: "TechTrek Shop"}} />
       <ProductsStack.Screen name='ProductDetails' component={ProductDetails} options={{headerTitle: ""}} />
      </ProductsStack.Navigator>
    );
  };
  

export default ProductsStackNav;