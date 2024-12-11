import React, { Component } from "react";
import {PositiveNumber, NegativeNumber} from "../components/Basic"

export default class SignedNumber extends Component{
    render(){
        if(Number.parseInt(this.props.children,10) >= 0)
        {
            return(<PositiveNumber>{this.props.children}</PositiveNumber>);
        }
        else
        {
           return(<NegativeNumber>{this.props.children}</NegativeNumber>)
        }
    }
}