

import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import {
  LandingPage,
  Login,
  Signup,
  Home,
  Header,
  Footer,
  PageNotFound,
  MyOffers,
  MyApplications,
  OfferDetails
} from './Components';


export default class App extends Component{
  state={
    islogged:true,
    userInfo: null,
  }
  setUserInfo = (_userInfo, ) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || _userInfo;
    this.setState({ userInfo});
  };

  render(){
    const {islogged} = this.state;
    return(
      <>
      <Router>
      <Header islogged={islogged} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} /> */}
               <Route
                exact
                path="/login"
                setUserInfo={this.setUserInfo}
                render={props => (
                  <Login {...props} setUserInfo={this.setUserInfo} />
                )}
              />
              <Route
                exact
                path="/signup"
                setUserInfo={this.setUserInfo}
                render={props => (
                  <Signup {...props} setUserInfo={this.setUserInfo} />
                )}
              />
            <Route exact path="/home" component={Home} />
            <Route exact path="/app/offers/my-offers" component={MyOffers} />
            <Route exact path="/app/offers/my-app" component={MyApplications} />

            <Route exact path="/app/offers/:offerId" component={OfferDetails} />


            <Route component={PageNotFound} />
          </Switch>
          <Footer />
      </Router>
      </>
    )
  }
}

