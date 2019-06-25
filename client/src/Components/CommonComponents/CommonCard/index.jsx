import React , { Component } from 'react';
import { Card , Button ,Spinner , Alert} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './style.css';

 class CommonCard extends Component{
    state={
        offer:null,
        statusLabel:'',
        statusDiv:'', 
        saved:'',

        hovered:'',

    }
    componentDidMount(){
        const {offer,status} = this.props;
        console.log('propsss',this.props);
        const borderColor = {
            completed:'green',
            finished:'red',
            pending:'orange',
            active:'blue'
        };
        this.setState(() => {
            return {
              offer,
              saved: offer.saved,
              statusLabel: `offer-card__status--${status}`,//label status
              statusDiv: `offer-card__border--${borderColor[status]}`,//border card
            };
          });
        //saved

        //hovered
        // handleHover = ()=> this.setState({hovered:'offer-card--hovered'})
        
    }
    render(){
        const {offer , hovered , statusLabel, statusDiv} = this.state;
        const { hover , history }= this.props
        
        return(
            <>
                {console.log('offer return',offer)
                }
                {
                    offer?(
                        <Card
                        className= 'offer-card--hovered' 
                        key={offer.id}
                        onClick={() => history.push(`/app/offers/${offer.id}`)}
                        >
                             {hover ? (
                       <span className={`offer-card__border ${statusDiv}`}> </span>
                     ) : null}
                     <Card.Header>
                         <div>
                             <span>{offer.position}</span>
                             <span className="offer-card__title">{offer.title}</span>
                         </div>
                         {hover ? (
                         <span className={`offer-card__status ${statusLabel}`}>
                           {' '}
                           {offer.status}
                         </span>
                       ) : null}
                     </Card.Header>
                     <Card.Body>
                       <Card.Text className="offer-card__description">
                         {offer.description.substring(0, 300)}
                       </Card.Text>
                     </Card.Body>
                        </Card>
         
                    ):(
                        <Spinner animation="border" variant="info" />
                    )
                }
              
                   
                    
    
            </>
        )
    }

}
export default withRouter(CommonCard);
