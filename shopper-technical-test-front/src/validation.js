import { List, useEffect, useState, useLayoutEffect } from 'react'
import client from './server/client';

import { Product } from './models';
import { GET_PACKS, GET_PRODUCTS } from './server/queries';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';

function Validate(props) {

    let [product, setProduct] = useState(
        {
            product_code: props.newPrice.product_code,
            new_price: props.newPrice.new_price,
            error: []
        }
    );

    let [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS, { variables: { code: product.product_code } });

    let [getPacks, { data: packData, loading: packLoading }] = useLazyQuery(GET_PACKS, { variables: { pack_id: parseInt(product.product_code) } });

    useEffect(() => {
        console.log("chamou use effect");
        let validationError = []
        if (!product.product_code) {
            validationError.push(`Campo product_code faltando `);
        } else if (isNaN(product.product_code)) {
            //check if product_code is a number
            validationError.push(`Campo product_code  inválido`);
        } else {
            getProducts();
        }

        if (!product.new_price) {
            //check if it has new_price
            validationError.push(`Campo new_price faltando`);

        } if (isNaN(product.new_price)) {
            //check if new_price is a number
            validationError.push(`Campo new_price não é um valor numérico`);

        }

        setProduct(product => (
            {
                ...product,
                error: validationError,
            }));

    }, [])

    useLayoutEffect(() => {
        if (data) {

            let validationError = []
            if (data.products.length == 0) {
                validationError.push('produto não encontrado na base de dados')
                setProduct(product => (
                    {
                        ...product,
                        name: 'NULL',
                        sales_price: 'NULL',
                        error: [...product.error, validationError],
                    })
                );
            } else {

                setProduct(product => (
                    {
                        ...product,
                        name: data.products[0].name,
                        sales_price: data.products[0].sales_price,

                    })
                );

                getPacks();
            }
        }

    }, [data])

    useLayoutEffect(() => {
        if (packData) {
            console.log('packData');
            console.log(packData);
            let checkProductPrice;
            if (packData.packs.length != 0) {

                console.log('chamando func');
                checkProductPrice = props.func(packData.packs);


                console.log('checkProductPrice');
                console.log(checkProductPrice);
                console.log('product.new_price');
                console.log(product.new_price);
                let validationError = [];

                if (checkProductPrice.total != product.new_price) {
                    validationError.push(`necesssário ajustar o valor dos produtos ${checkProductPrice.products}`);
                    setProduct(product => (
                        {
                            ...product,

                            error: [...product.error, validationError],
                        })
                    );
                }


            }




        }

    }, [packData])

    return (
        <tr>
            <td >{product.product_code}</td>
            <td  >{product.name}</td>
            <td  >{product.sales_price}</td>
            <td  >{product.new_price}</td>
            <td  >
                {product.error.length != 0
                    ? product.error.map((erro) => {

                        return <div>- {erro}</div>

                    })
                    : 'No Error'}
            </td>
        </tr>
    )

}

export default Validate
