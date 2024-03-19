import useCartStore from '@/state/cartStore';
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View,Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigation } from '@/navigation/ProductsStack';


const CartButton = () => {
    const navigation = useNavigation<StackNavigation>();

    const {products} = useCartStore((state) => ({
        products: state.products
    }));

    const [count, setCount] = useState(0);

    useEffect(() => {
        const countAll = products.reduce((acc, product) => {
            return acc + product.quantity
        }, 0);
        setCount(countAll);
    }, [products]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CartModal')}>
        <View style={styles.countContainer}> 
            <Text style={styles.countText}>{count}</Text>
        </View>
        <Ionicons name='cart' size={28} color={'#000'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    countContainer: {
      position: 'absolute',
      zIndex: 1,
      bottom: -5,
      right: -10,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    countText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

export default CartButton