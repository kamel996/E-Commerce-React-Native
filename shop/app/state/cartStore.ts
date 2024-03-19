import { Product } from '@/api/api';
import { create } from 'zustand';

export interface ICartState {
  products: Array<Product & { quantity: number }>;
    addProduct: (product: Product) => void;
    reduceProduct: (product: Product) => void;
    clearCart: () => void;
    total: number;
}

const useCartStore = create<ICartState>((set) => ({
    products: [],
    total: 0,
    addProduct: (product: Product) =>
     set((state) => {
       const hasProduct = state.products.find((p) => p.id === product.id);
       state.total += +product.price;

       if(hasProduct){
        return {
            products: state.products.map((p) => {
                if(p.id === product.id){
                    return {...p, quantity: p.quantity + 1 }
                }
                return p
            }),
        };
       }else {
        return {
            products: [...state.products, {...product, quantity: 1}]
        }
       }
       

    }),
    reduceProduct: (product: Product) =>  set((state) => {
        state.total -= product.price;
        return {
            products: state.products.map((p) => {
                if(p.id === product.id){
                    return {...p, quantity: p.quantity - 1}
                }
                return p
            }).filter(p => p.quantity > 0)
        }
    }),
    clearCart: () => set((state) => {
        state.total = 0;
        return  {
            products: []
        }
    })
}))

export default useCartStore;