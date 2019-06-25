import React , { Component } from 'react';

import './style.css';

export default class SideCard extends Component{
    state={

    }
    componentDidMount(){
        console.log('props side card',this.props);
        
    }
    render() {
        const{title,items} = this.props;
        return (
            <>
            <div className="side-card__title">
                <span>{title}</span>
            </div>
            <ul>
                {items&& items.map(item=>{
                    console.log('ggggggggggggg',item);
                    
                    return(
                        <li className="side-card__li">{item}</li>
                    )
                })}
            </ul>
            </>
        )
    }
}