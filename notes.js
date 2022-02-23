import React,{Component,useEffect } from 'react';
import { Button,Form,Card,Container,Row, Col } from 'react-bootstrap';
import './Header.css';
const axios = require('axios')


class Converter extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstCur:"USD",
            secondCur:"USD",
            thirdCur:"",
            fourthCur:"",
            result:[],
            data:{}
        };
        this.getResult2();
        this.getResult();
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handleInput1 = this.handleInput1.bind(this)
         this.handleInput2 = this.handleInput2.bind(this)

        
    }
    async getResult2(){
        const res = await axios.get('https://freecurrencyapi.net/api/v2/latest?apikey=1c2585b0-93d8-11ec-938a-85775bcb259e')
        this.setState({data:res.data.data})
        //console.log(res.data.data)
    }
    async getResult(){
        const res = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        this.setState({
            result:res.data
        })
      
    }
    async changeValues1 (e){
     const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.firstCur}&to=${this.state.secondCur}&amount=${e.target.value}`,{
                 auth: {
                username: 'studigrad514893455',
                password: 'otjnh6iol2e6oni6a4nf11nce0'
            },});
            console.log(res)
            console.log(res.data.to[0].mid)
            this.setState({
                fourthCur:res.data.to[0].mid
            })
    }
   async changeValues2(e){
        const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.secondCur}&to=${this.state.firstCur}&amount=${e.target.value}`,{
                 auth: {
                username: 'studigrad514893455',
                password: 'otjnh6iol2e6oni6a4nf11nce0'
            },});
            console.log(res)
            console.log(res.data.to[0].mid)
            this.setState({
                thirdCur:res.data.to[0].mid
            })
    }

    
    async handleChange1(e){
        this.setState({ firstCur: e.target.value });
        const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.firstCur}&to=${this.state.secondCur}&amount=${this.state.thirdCur}`,{
                 auth: {
                username: 'studigrad514893455',
                password: 'otjnh6iol2e6oni6a4nf11nce0'
            },});
            console.log(res)
            console.log(res.data.to[0].mid)
            this.setState({
                fourthCur:res.data.to[0].mid
            })
    }
    async  handleChange2(e){
        
        this.setState({ secondCur: e.target.value });
        const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.firstCur}&to=${this.state.secondCur}&amount=${this.state.fourthCur}`,{
                 auth: {
                username: 'studigrad514893455',
                password: 'otjnh6iol2e6oni6a4nf11nce0'
            },});
            console.log(res)
            console.log(res.data.to[0].mid)
            this.setState({
                fourthCur:res.data.to[0].mid
            })
    }

    handleInput1(e){
        
        this.changeValues1(e)
    }
    handleInput2(e){
        
        this.changeValues2(e)
    }
    render(){   
        return(
            <Container>
                 <Form> 

                <Row className="justify-content-md-center">

                <Form.Select aria-label="Default select example" value={this.state.firstCur} onChange={this.handleChange1}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
                </Form.Select>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control value={this.state.thirdCur} onChange={this.handleInput1}  type="number" placeholder='0'/>
                <Form.Text className="text-muted">
                Convert one currency to another
                </Form.Text>
                 </Form.Group>
                </Row>

                <Row className="justify-content-md-center">
                <Form.Select aria-label="Default select example" value={this.state.secondCur} onChange={this.handleChange2}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
                </Form.Select>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control value={this.state.fourthCur} onChange={this.handleInput2}  type="number"  placeholder='0'/>
                <Form.Text className="text-muted">
                Convert one currency to another
                </Form.Text>
                 </Form.Group>
                </Row>
            </Form>
            </Container>
        )
    }
}
export default Converter;