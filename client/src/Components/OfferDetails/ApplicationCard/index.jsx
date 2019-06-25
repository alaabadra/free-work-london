import React , { Component } from 'react';
import { Image, Card, Button, Container } from 'react-bootstrap';
import './style.css';

export default class OfferDetails extends Component{
    
    state={
        application:'',
        userInfo:'',
        showWrongAlert:''
    }
    handleProfile=()=>{
      const {application:{username},history} = this.props
      history.push(`/app/profile/${username}`)
    }
    handleHireMe=()=>{
      const {application:{member_id}, match}= this.props;
      const {application:{status}}=this.props
      const {params:{offerId}}= match;
      fetch(`/api/v1/hired-member`,{
        method:'POST',
        credentials:'same-origin',
        body:JSON.stringify({
          member_id,
          offer_id:offerId,
          status:'pending'
        })
      })
        .then(res=>{
          if(res){
            console.log(res);// rows: [ { offer_id: 2, member_id: 3, status: 'pending' } ],
            // res.send('add hired member successfully')  
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
    handleAccept=()=>{
      const userInfo = {
        id: 2,
        fullName: 'Alaa Badra',
        username: 'alaabadra',
        avatar:
          'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
      };
      // this.setState({userInfo})
        // const {userInfo} = this.state;
        const {match}= this.props;
        const {params:{offerId}}= match;
        fetch(`/api/v1/hired-member/${userInfo.id}`,{
            method:'PATCH',
            body:JSON.stringify({offer_id:offerId,status:'accepted'}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(res=>{
            if(res.data){
                console.log(res.data)
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
    handleRefuse=()=>{
        const {userInfo} = this.state;
        const {match}= this.props;
        const {params:{offerId}}= match;
        fetch(`/api/v1/hired-member/${userInfo.id}`,{
            method:'PATCH',
            body:JSON.stringify({offer_id:offerId,status:'refused'}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(res=>{
            if(res.data){
                console.log(res.data)
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
    componentDidMount(){
        const {application} = this.props;
        const userInfo = {
            id: 2,
            fullName: 'Alaa Badra',
            username: 'alaabadra',
            avatar:
              'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
          };
          this.setState({application,userInfo})
        {console.log(this.props)}

    }
    render(){
        const {
            full_name: fullName,
            avatar,
            discription,
            status,
           
          } = this.props.application;
          const { viewProfile, HireMe} = this.props;
          const {userInfo} = this.state;
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
                                    Hire me
                                    
                                </Button>
                            ):(  
                              //in account owner app 
                              <Card.Text>
                              {userInfo.id === this.props.application.member_id &&
                            this.props.application.status === 'pending' ? (
                                <>
                                  <Button
                                    className="application-card__button refuse-btn"
                                    onClick={this.handleRefuse}
                                  >
                                    Refuse
                                  </Button>
                                  <Button
                                    className="application-card__button accept-btn"
                                    onClick={this.handleAccept}
                                  >
                                    Accept
                                  </Button>
                                </>
                              ) : (
                                //in account owner offer
                                <span >
                                  {status}
                                </span>
                              )}
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