import { List, useEffect, useState, useLayoutEffect } from 'react'
import client from './server/client';


import { getPacks, GET_PRODUCTS } from './server/queries';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';


function ValidateAux(props) {
    console.log("props")
    console.log(props.newPrices)
 


    const productsNewPrice = props.newPrices.map((product, index) => {


        return (
            <tr key={index}>
                <td>{product.product_code}</td>
                <td>{'product.name'}</td>
                <td>{'product.sales_price'}</td>
                <td>{product.new_price}</td>
            </tr>
        )
    });

    



    return productsNewPrice


}

export default ValidateAux


/*
    result.map((field) => {        // changed here
            console.log('field: ', field);


            return (
                <tr>
                    <td>{field.product_code}</td>
                    <td>{field.name}</td>
                    <td>{field.sales_price}</td>
                    <td>{field.new_price}</td>
                    <td>{field.error}</td>
                </tr>
            )
        })

*/


/*


function validate(newPricesproducts = []) {
    return new Promise(async (resolve, reject) => {


        //a
        let result = []

        await newPricesproducts.map(async (newPrices, index) => {
            let productResult = {
                product_code: 0,
                name: '',
                sales_price: 0,
                new_price: 0,
                error: []
            }
            //
            if (!newPrices.product_code) {
                //check if it has product_code
                productResult.error.push(`Campo product_code faltando na linha ${index + 2}`);
            } if (!newPrices.new_price) {
                //check if it has new_price
                productResult.error.push(`Campo new_price faltando na linha ${index + 2}`);
            } if (isNaN(newPrices.product_code)) {
                //check if product_code is a number
                productResult.error.push(`Campo product_code na linha ${index + 2} não é um valor numérico`);
            } if (isNaN(newPrices.new_price)) {
                //check if new_price is a number
                productResult.error.push(`Campo new_price na linha ${index + 2} não é um valor numérico`);
            }
            productResult.product_code = newPrices.product_code;
            productResult.new_price = newPrices.new_price;
            //aaa

            const getProductsQuery = await client.query({ query: getProducts, variables: { code: newPrices.product_code } });


            if (getProductsQuery.data.products.length == 0) {
                //check if product_code existe in the database
                productResult.error.push(`Produto ${newPrices.product_code}, na linha ${index + 2}, não encontrado na base de dados`);
            } else {
                productResult.name = getProductsQuery.data.products[0].name;
                productResult.sales_price = getProductsQuery.data.products[0].sales_price;


                if (newPrices.new_price && newPrices.new_price < getProductsQuery.data.products[0].cost_price) {
                    //check if new_price is smaller than product cost_price
                    productResult.error.push(`O novo preço para o produto ${newPrices.product_code} (linha ${index + 2}), é menor que o preço de custo do produto`);
                }

                let priceDiff = Math.abs(newPrices.new_price - getProductsQuery.data.products[0].sales_price);
                let price10percent = getProductsQuery.data.products[0].sales_price * 0.1

                if (newPrices.new_price && (priceDiff > price10percent)) {
                    //check if new_price is smaller than product cost_price
                    productResult.error.push(`O reajuste do produto ${newPrices.product_code} (linha ${index + 2}), é maior que 10%`);
                }


            }

            const packs = await client.query({ query: getPacks, variables: { pack_id: parseInt(newPrices.product_code) } });

            result.push(productResult);

        });

        resolve(result);


    }
    )
}




*/

/*

      client.query({ query: getProducts, variables: { code: newPrices.product_code } })
            .then((response) => {
          
                
                if (response.data.products.length == 0) {
                    //check if product_code existe in the database
                    productResult.error.push(`Produto ${newPrices.product_code}, na linha ${index + 2}, não encontrado na base de dados`);
                } else {
                    productResult.name = response.data.products[0].name;
                    productResult.sales_price = response.data.products[0].sales_price;


                    if (newPrices.new_price && newPrices.new_price < response.data.products[0].cost_price) {
                        //check if new_price is smaller than product cost_price
                        productResult.error.push(`O novo preço para o produto ${newPrices.product_code} (linha ${index + 2}), é menor que o preço de custo do produto`);
                    }

                    let priceDiff = Math.abs(newPrices.new_price - response.data.products[0].sales_price);
                    let price10percent = response.data.products[0].sales_price * 0.1

                    if (newPrices.new_price && (priceDiff > price10percent)) {
                        //check if new_price is smaller than product cost_price
                        productResult.error.push(`O reajuste do produto ${newPrices.product_code} (linha ${index + 2}), é maior que 10%`);
                    }
                 

               


                }
            });
            
            const packs = await client.query({ query: getPacks, variables: { pack_id: parseInt(newPrices.product_code) } })
            .then((response) => {


                if (response.data.packs.length > 0) {
                    //check if product is a pack
                    let packPrice = 0
                    let packProducts = []
                  
                    response.data.packs.map((pack, index) => {
                        //get all those packs
              
                        newPricesproducts.map((newPricesForPack, index) => {
                            //for each pack look for the new price
                            if (newPricesForPack.product_code == pack.product_id) {
                                packPrice = packPrice + (newPricesForPack.new_price * pack.qty);
                            }
                        });
                        packProducts.push(pack.product_id);
                    });

                    if (packPrice != newPrices.new_price) {
                        productResult.error.push(`necessário ajustar os preços dos produtos ${packProducts} do pacote ${response.data.packs[0].pack_id} para formar o preço ${newPrices.new_price}`);
                  
                    
                    }



                }

            })
            result.push(productResult);
    });


*/