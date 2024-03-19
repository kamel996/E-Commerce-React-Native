import { Product, fetchProductDetails } from '@/api/api';
import { ProductDetailsPageProps } from '@/navigation/ProductsStack'
import useCartStore from '@/state/cartStore';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    fetchProduct();
  }, []);


  useEffect(() => {
    updateProductQuantity();
  }, [products]);


  const fetchProduct = async () => {
    try {
      const productData = await fetchProductDetails(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };



  const updateProductQuantity = () => {
    const foundProduct = products.find(p => id === p.id);

    if(foundProduct){
      setCount(foundProduct.quantity)
    }else{
      setCount(0)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image style={styles.image} source={{uri: product.image}} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>{product.price}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => reduceProduct(product)}>
              <Ionicons name="remove" size={24} color={'#1FE687'} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addProduct(product)} >
              <Ionicons name="add" size={24} />
            </TouchableOpacity>
          </View>
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