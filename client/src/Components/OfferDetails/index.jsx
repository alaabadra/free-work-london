import React , { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import offerData from '../utils/offers';
import applicationsData from '../utils/applications';
import myApplicationMe from '../utils/myApplicationMe'
import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
import './style.css';

export default class OfferDetails extends Component{
    state={
        offer:[],
        applications:[],
        myApplication:[]
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
        this.setState({myApplication:myApplicationMe});
        
        
    }
    handleContract=()=>{

    }
    render(){
        console.log('offer',this.state.offer);
        console.log('apps',this.state.applications);
        console.log('myapppppps',this.state.myApplication);

        const userInfo = {
            id: 2,
            fullName: 'Alaa Badra',
            username: 'alaabadra',
            avatar:
              'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
          };
          const { offer, applications , myApplication } = this.state;
          const { id: memberId } = userInfo;
         
        return(
            <>      
            {/* offer show always */}
                  <Container>
                    <Row>
                      <Col>
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
    {/* if owner offer and found apps */}
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
                 HireMe
                 application={item}
                 />

              
             ))}:{
    // if owner offer and not found apps 
              //  
               <div>
                 no apps 
               </div>
             }
             </Col>
             </>
            ):(
              <>
              {console.log('myappppppppppp',myApplication)}
    {/* if not owner offer so search in my app */}
              {/* if found my app */}
              {myApplication?(
                <>
                <ApplicationCard 
                application={myApplication}
                />
                </>
              ):(
                //if not owner and  not found my app--> not post app for this offer before it
                <>
                  <Col xs lg="9" className="offer-details__proposal-container">
              <Form.Control
                as="textarea"
                rows="8"
                placeholder="Write your proposal here !!!"
                style={{ marginBottom: '10px' }}
              />
              <Button className="offer-details__proposal-container__button">
                Apply
              </Button>
            </Col>
                </>
              )}
            </>
            )}
               
                </>
        )
    }
}