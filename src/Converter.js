import React,{Component,useEffect } from 'react';
import { Button,Form,Card,Container,Row, Col } from 'react-bootstrap';
import './Header.css';
const axios = require('axios')


class Converter extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstCur:"",
            secondCur:"",
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
         this.changeValues1=this.changeValues1.bind(this)
         this.changeValues2=this.changeValues2.bind(this)
         this.onEnter = this.onEnter.bind(this)

        
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
    async changeValues1 (){
        let amount = this.state.thirdCur
        if(this.state.thirdCur==""){
          amount = this.state.fourthCur
        }
        const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.firstCur}&to=${this.state.secondCur}&amount=${this.state.thirdCur}`,{
            auth: {
           username: 'studigrad514893455',
           password: 'otjnh6iol2e6oni6a4nf11nce0'
       },});
       console.log(res)
       this.setState(st=>{return { fourthCur:res.data.to[0].mid}})
       
       }
      async changeValues2(){
          let amount = this.state.fourthCur
          if(this.state.fourthCur==""){
            amount = this.state.thirdCur
          }
        const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.secondCur}&to=${this.state.firstCur}&amount=${amount}`,{
            auth: {
           username: 'studigrad514893455',
           password: 'otjnh6iol2e6oni6a4nf11nce0'
       },});
       console.log(res)
       this.setState(st=>{return {  thirdCur:res.data.to[0].mid}})
     
       }
    
    async handleChange1(e){
        this.setState(st=>{return {firstCur:e.target.value}}) 
    }
    async handleChange2(e){
        this.setState(st=>{return {secondCur:e.target.value}})
        /* 
        this.setState({
            secondCur:e.target.value
        })
      */
    }

    handleInput1(e){
        this.setState(st=>{return {thirdCur:e.target.value}})
        
        
    }
    handleInput2(e){
        this.setState(st=>{return { fourthCur:e.target.value}})
    
    }
    async onEnter(){
        const res = await axios.get(`https://xecdapi.xe.com/v1/convert_from.json/?from=${this.state.firstCur}&to=${this.state.secondCur}&amount=${this.state.thirdCur}`,{
                 auth: {
                username: 'studigrad514893455',
                password: 'otjnh6iol2e6oni6a4nf11nce0'
            },});
           // console.log(res)
           // console.log(res.data.to[0].mid)
            this.setState({
                fourthCur:res.data.to[0].mid
            })
        console.log('Clicked')
    }
    render(){   
        return(
            <Container>
                 <Form> 

                <Row className="justify-content-md-center">
                <p>{this.state.firstCur}</p>
                <p>{this.state.thirdCur}</p>
                <Form.Select aria-label="Default select example" value={this.state.firstCur} onChange={(e)=>{this.handleChange1(e);this.changeValues1()}}>
                <option></option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
              
                </Form.Select>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control value={this.state.thirdCur} onChange={(e)=>{this.handleInput1(e);this.changeValues1()}}  type="number" placeholder='0'/>
                <Form.Text className="text-muted">
                Convert one currency to another
                </Form.Text>
                 </Form.Group>
                </Row>

                <Row className="justify-content-md-center">
                <p>{this.state.secondCur}</p>
                <p>{this.state.fourthCur}</p>
                <Form.Select aria-label="Default select example" value={this.state.secondCur} onChange={(e)=>{this.handleChange2(e);this.changeValues2()}}>
                <option></option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
                </Form.Select>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control value={this.state.fourthCur} onChange={(e)=>{this.handleInput2(e); this.changeValues2()}}  type="number"  placeholder='0'/>
                <Form.Text className="text-muted">
                Convert one currency to another
                </Form.Text>
                 </Form.Group>
                </Row>
                <Button variant="primary" onClick={this.onEnter}>Convert</Button>
            </Form>
            </Container>
        )
    }
}
export default Converter;