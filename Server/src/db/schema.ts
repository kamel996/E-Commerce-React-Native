import { InferModelFromColumns, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, varchar, text, doublePrecision, integer } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    price: doublePrecision('price').notNull(),
    stock: integer('stock').notNull(),
    image: text('image').notNull(),
});



export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 100 }).notNull(),
    total: doublePrecision('total').default(0),
});

export const order_items = pgTable('order_items', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => orders.id),
    product_id: integer(' product_id').notNull().references(() => products.id),
    quantity: integer('quantity').notNull(),
    total: doublePrecision('total').default(0),
});

export type Product = InferSelectModel<typeof products>;
export type Order = InferSelectModel<typeof orders>;
export type OrderItem = InferSelectModel<typeof order_items>;


