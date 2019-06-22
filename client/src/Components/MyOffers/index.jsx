import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';

import offersDetails from '../utils/myOffers';
import './style.css';

export default class MyOffers extends Component{
    state={
        offers:null
    }
    
    componentDidMount(){
        console.log('prrrrrops',this.props)
        
        this.setState({offers:offersDetails})
        
        
        
    }
    render(){
        const {offers} = this.state;
        const {history} = this.props;
        {console.log(this.state.offers)}
        return(
            <>
            <Container>
                <h1>My Offers</h1>
                <Row>
                    {offers?(
                        offers.map(item=>{
                            return(
                                <>
                                {console.log(item)}
                                <Col xs={12} md={6} lg={4} key={item.id}>
                                    <Card className='myoffer__card'  onClick={() => history.push(`/app/offers/${item.id}`)}>
                                        <Card.Header className='myoffers__card-header'>
                                            <Card.Text className={`myoffers__${item.status}`} >
                                                {item.status}
                                            </Card.Text>
                                        </Card.Header>
                                        <Card.Body className="myoffers__body">
                                            <Card.Text className="myoffers__title">
                                                {item.title}
                                            </Card.Text>
                                            <Card.Text className="myoffers__position">
                                                {item.position}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                </Col>
                                </>
                            )
                        })
                    ):(
                        <Spinner animation="border" variant="info" />
                    )
                    
                    }
                </Row>
            </Container>
            </>
        )
    }
}