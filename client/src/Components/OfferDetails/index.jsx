import React , { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import offerData from '../utils/offers';
import applicationsData from '../utils/applications';
import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
import './style.css';

export default class OfferDetails extends Component{
    state={
        offer:[],
        applications:[]
    }
    
    componentDidMount(){
        const {
            match:{params:offerId}
        }= this.props
        {console.log(this.props.match.params.offerId)}
        this.setState({offer:offerData},()=>{
            console.log('oooooooooooo',this.state.offer);
            
        });
        this.setState({applications:applicationsData});
        
        
    }
    handleContract=()=>{

    }
    render(){
        console.log('offer',this.state.offer);
        console.log('apps',this.state.applications);
        const userInfo = {
            id: 1,
            fullName: 'Alaa Badra',
            username: 'alaabadra',
            avatar:
              'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
          };
          const { offer, applications } = this.state;
          const { id: memberId } = userInfo;
        return(
            <>
            
            

                
                   
                  <Container>
                    <Row>
                      <Col>
{console.log('inssssside return',offer.position)}
                     <span>{offer.position}</span>
                     <p>{offer.title}</p>
                     </Col>
                     <Col>
                     <span>{offer.status}</span>
                     </Col>
                     <Button>
                       End Contract
                     </Button>
                     </Row>
                     <Row>
                       <Col>
                       <Row>
                         <p>{offer.description}</p>
                       </Row>
                       </Col>
                       <Col>
                       <div>
                         <SideCard title="skills" items={offer.skills}/>
                         <SideCard title="offer type" items={offer.offer_type}/>

                       </div>
                       </Col>
                     </Row>

                </Container>
       
                
                
                 
                
            {memberId === offer.member_id?(
              <>
               <Row>
               Applications
             </Row>
             <Col>
             {applications && applications.map(item=>(
               // console.log('itemAAApp',item);
              
               
               
                 <ApplicationCard
                 viewProfile
                 application={item}
                 />

              
             ))}
             </Col>
             </>
            ):null}
               
                </>
        )
    }
}