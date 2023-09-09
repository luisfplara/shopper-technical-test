
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useLayoutEffect } from 'react';
import Papa from 'papaparse';
import { newPriceProduct } from './models'
import Validate from './validation';

import client from './server/client';
import ValidateAux from './validation copy';

function App() {

  const [validation, setValidation] = useState(false);
  const [newPrices, setNewPrices] = useState([]);
  const [pricesTable, setPricesTable] = useState([]);


  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setNewPrices(results.data);
      },
    });
  };


  
 function isInNewPriceList( packs = []){



  console.log('packs')
  console.log(packs)
  let packPrice = 0;
  let packProducts =[];

  packs.map((pack)=>{
    console.log('pack map')
    console.log(pack)
    newPrices.map((newPrice)=>{
      console.log('newPrice map')
      console.log(newPrice)
      if(pack.product_id == newPrice.product_code){
        packPrice+=newPrice.new_price*pack.qty;
        packProducts.push(pack.product_id);

      }
    
    });
   

  });



return {total: packPrice, products: packProducts}


 }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Shopper Technical Test
        </h1>
      </header>
      <div className='formtable'>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Aquivo de atualização de preço</Form.Label>
            <Form.Control type="file" name="file" accept=".csv" onChange={changeHandler} placeholder="Enter email" />

          </Form.Group>
          {validation ?
            <Button onClick={() => setValidation(false)} variant="primary" >
              Salvar
            </Button> :
            <Button onClick={event => setPricesTable(newPrices)} variant="primary">
              Validar
            </Button>}


        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Preço Atual</th>
              <th>Novo Preço</th>
              <th>Erro</th>
            </tr>
          </thead>
          <tbody>
          {  pricesTable.map((newPrice, index) => {
               return <Validate newPrice={newPrice}  func = {isInNewPriceList}/>;
            }
            )
            }
          </tbody>
        </Table>


      </div>
    </div>

  );
}
/*
    {  pricesTable.map((newPrice, index) => {
               return <Validate newPrice={newPrice}/>;
            }
            )
            }
                    <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
*/

export default App;
