import React,{Component} from 'react';
import { Button,Form,Card,Container,Row } from 'react-bootstrap';
import './Header.css';
const axios = require('axios')


class Header extends Component{
constructor(props){
    super(props)
    this.state={
        result:[]
    }
    this.getResult = this.getResult.bind(this)
    this.getColor = this.getColor.bind(this)
    this.getResult();
}
   async getResult(){
        const res = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        this.setState({
            USD:res.data[0].buy,
            EUR:res.data[1].buy,
            RUB:res.data[2].buy,
            BTC:res.data[3].buy,
            result:res.data
        })
    }
     getColor() {
       const colors = [
        'Primary',
        'Secondary',
        'Success',
        'Danger'
            ]
        return colors[Math.floor(Math.random() * 4)];
      }
    render(){
        return(
           <div className='Header'>
            <Container>
            <Row className="justify-content-md-center">
            { 
            this.state.result.map((res, idx) => (
                <Card
                    bg={this.getColor().toLowerCase()}
                    key={idx}
                    text={this.getColor().toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '18rem' }}
                    className="mb-2 " >

                    <Card.Header>{res.ccy}</Card.Header>
                    <Card.Body>
                    <Card.Title>{res.ccy} </Card.Title>
                    <Card.Text>
                    {res.ccy} is : {res.buy} UAH
                    </Card.Text>
                    </Card.Body>
                </Card>
                ))
                }

                </Row>
            </Container>
             
           </div>
        )
    }
}
export default Header;
