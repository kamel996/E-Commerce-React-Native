import { Product, fetchProductDetails } from '@/api/api';
import { ProductDetailsPageProps } from '@/navigation/ProductsStack'
import useCartStore from '@/state/cartStore';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text } from 'react-native/types';

const ProductDetails = ({route} :ProductDetailsPageProps) => {
  const { id } = route.params;
  const [product, setProduct] = useState<null | Product>();

  const {products, addProduct, reduceProduct} = useCartStore((state) => ({
    products: state.products,
    addProduct: state.addProduct,
    reduceProduct: state.reduceProduct
  }));

  const [count, setCount] = useState(0);



  useEffect(() => {


  }, [product])


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetails(id);

        setProduct(productData);

      } catch (error) {
        
        console.log('error: ', error)
      }
    }
    fetchProduct();
  }, []);


  


  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image style={styles.image} source={{uri: product.image}} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </>
      )}
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    borderColor: '#1FE687',
    borderWidth: 2,
  },
  quantity: {
    fontSize: 20,
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetails