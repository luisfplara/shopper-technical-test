import { gql } from '@apollo/client';

export const GET_PRODUCTS =  gql`
query products($code: ID){
products(code: $code) {
    code
    name
    cost_price
    sales_price
}
}
`
export const GET_PACKS =  gql`
query packs($pack_id: Int){
packs(pack_id: $pack_id) {
    id
    pack_id
    product_id
    qty
}
}
`


