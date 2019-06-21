import React , { Component } from 'react';
import { Image, Card, Button, Container } from 'react-bootstrap';
import './style.css';

export default class OfferDetails extends Component{
    
    state={
        
    }
    handleProfile=()=>{

    }
    handleHireMe=()=>{

    }
    componentDidMount(){
        console.log('propsApp',this.props);

    }
    render(){
        const {
            full_name: fullName,
            avatar,
            discription,
            status,
           
          } = this.props.application;
          const { viewProfile} = this.props;
        return(
            <>
            <Container className="application-card__container">
                <Card>
                    <Card.Header>
                        <Card.Title>
                            <Image src={avatar}  className="application-card__avatar"/>
                            <span>{fullName}</span>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {discription}
                        </Card.Text>
                        <div className="application-card__button__container">
                            <Button onClick={this.handleProfile} className="application-card__button">
                                {viewProfile ? 'view profile':null}
                            </Button>
                            {!status?(
                                <Button  onClick={this.handleHireMe}  className="application-card__button">
                                    HireMe
                                </Button>
                            ):(
                                <Card.Text className={`application-card__${status}`}>
                                    {status}
                                </Card.Text>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            </>
        )
    }
}