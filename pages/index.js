import Head from 'next/head'

import { loadStripe } from "@stripe/stripe-js";

import PageTitle from "../components/PageTitle/PageTitle";
import ProductCard from "../components/ProductCard/ProductCard";
import {pane} from "./../styles/home.module.scss"

// https://shoeshine8k-default-rtdb.firebaseio.com/products.json
/* 
          SSG Static Site Generation
          content
          data + comp ======> html+css-----------------> edge/CDN

*/
 
export default function Home(props) {

    const products = props.products.slice(0,3);
   
    const stripePromise = loadStripe(
     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   );

     return(
          <>
          <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="description" content="storefront online running shoes with free shipping"/>
          <meta name="keywords" content="Shoes, Runing, Running Shoes, Nike Shoes, New Balance Shoes"/>
           <title>Storefront</title>
          </Head>
           <PageTitle tagline="product specials" title="Storefront"/>
           <main className={pane}>
               {  products.map(product=> <ProductCard  key={product.uid} product={product}/>)}
           </main>
          </>
     )
}


 

export async function getStaticProps(){
  
    const res = await fetch('https://storefront-14ded-default-rtdb.firebaseio.com/products.json')
    const productData = await res.json();
    const products = Object.values(productData)
 return {
      props:{
           products
      },
      revalidate: 60,
 }
}

 
