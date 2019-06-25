import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import CoverLetter from './CoverLetter'
import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
import './style.css';

export default class OfferDetails extends Component {
  state = {
    userInfo: '',
    offerId: '',
    offer: '',
    applications: '',
    myApplication: '',
    showWrongAlert: false,
    errOffer:false
    // errMessage:''
  
  }

  componentDidMount() {
    const userInfo = {
      id: 2,
      fullName: 'Alaa Badra',
      username: 'alaabadra',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    };
    const {
      match: { params: offerId }
    } = this.props
    this.setState({userInfo,offerId})
    //fetch offers
    // fetch(`/api/v1/offer/${offerId}`,{
    //   method:'GET',
    // })
    // .then(response=>response.json())
    // .then(res => {

    //   console.log('res data', res)
    //   if(res.data){
    //     this.setState({offer:res.data})

    //   }else this.setState({errOffer:true})//err for one time until come offers (loading)
    // })
    // .catch((err)=>
    // {
   
    //   console.log(err);
    //   this.setState(//err in catch because error from database (no result) 
    //   {
    //     showWrongAlert: true,
    //   },
    //   () =>
    //     setTimeout(() => {
    //       this.setState({ showWrongAlert: false });
    //     }, 5000)
    // )
    
    // }
    
    // )
    ///fetch offerApps
    // fetch(`/api/v1/offer-applications/${offerId}`,{
    //     method:'GET',
    // })
    // .then(response=>response.json())
    // .then(res => {
    //     if(res){
    //     this.setState({applications:res})

    //   }else this.setState({errOffer:true})//err for one time until come offers (loading)
    // })
    // .catch((err)=>
    // {
    //   // this.setState({errMessage:err.message},()=>{
    //   //   console.log(this.state.errMessage);
        
    //   // })
    //   console.log(err);
    //   this.setState(//err in catch because error from database (no result) 
    //   {
    //       showWrongAlert: true,
    //   },
    //   () =>
    //     setTimeout(() => {
    //       this.setState({ showWrongAlert: false });
    //     }, 5000)
    // )
    
    // }
    // )
    // //fetch myApp for this member for this offer
    const{id} = userInfo;
    fetch(`/api/v1/${id}/my-applications/${offerId}`,{
      method:'GET',
    })
    .then(response=>response.json())
    .then(res => {
      if(res){
        this.setState({myApplication:res})

      }else this.setState({errOffer:true})//err for one time until come offers (loading)
    })
    .catch((err)=>
    {
        // this.setState({errMessage:err.message},()=>{
          //   console.log(this.state.errMessage);
        
      // })
      console.log(err);
      this.setState(//err in catch because error from database (no result) 
        {
          showWrongAlert: true,
        },
        () =>
          setTimeout(() => {
            this.setState({ showWrongAlert: false });
          }, 5000)
      )
    
    }
    )
    
    // console.log(this.state.offer)
  }
  handleContract = () => {
    const {offerId} = this.state;
    fetch(`/api/v1/offer/${offerId}`,{
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        offerId,
        status:'finished'
      })
    })
    .then(response=>response.json())
    .then(res=>{
      if(res.data){
        const {status} = res.data[0];
        console.log(res.data);
        //hold all state to take from it --> status from offer
        // this.setState(prevState => {
        //   const updatedOffer = { ...prevState.offer };
        //   updatedOffer.status = status;
        //   return { offer: updatedOffer };
        // });
        
      }
    })
    .catch(() =>
        this.setState(
          {
            showWrongAlert: true,
          },
          () =>
            setTimeout(() => {
              this.setState({ showWrongAlert: false });
            }, 5000)
        )
      );
  }
  render() {
    console.log('offer', this.state.offer);
    // console.log('apps', this.state.applications);
    // console.log('myapppppps', this.state.myApplication);


    const {offerId,userInfo, offer, applications, myApplication,showWrongAlert,errorOffer } = this.state;
    const {id} = this.state.userInfo;

    return (
      <>
      {showWrongAlert&&<span> Somthing went error! Try agailn </span>} {/* err in catch because error from database (no result) */}
      
    {!errorOffer && !offer && <Spinner animation="grow" variant="info" />} {/* err for one time until come offers (loading)  */}
    
      {/* {errorOffer && <PageNotFound />}
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
                <SideCard title="skills" items={offer.skills} />
                <SideCard title="offer type" items={offer.offer_type} />

              </div>
            </Col>
          </Row>

        </Container>
        {/* if owner offer and found apps */}
        {id === offer.member_id ? (
          <>
            <Row>
              Applications
             </Row>
            <Col>
              {applications && applications.map(item => (
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
        ) : (
            <>
              {/* {console.log('myappppppppppp', myApplication)} */}
              {/* if not owner offer so search in my app
              {/* if found my app */}
              {/* {myApplication ? (
                <>
                  <ApplicationCard
                    application={myApplication}
                  />
                </>
              ) : (
                  //if not owner and  not found my app--> not post app for this offer before it
                  <>
                  <CoverLetter 
                    offerId={offerId}
                    userInfo = {userInfo}
                  />
                  </>
                )} */}
            </>
          )}  

       </>
    
    )}
}
