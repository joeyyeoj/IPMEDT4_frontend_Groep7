import React from "react";
import  {Redirect, withRouter} from 'react-router-dom'
import axios from "axios";
import {connect} from "react-redux";
import './CodeInvoeren.css'
import '../FormsStyling/Forms.css'


class CodeInvoeren extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code: null,
            vragenlijstId: null,
            readyToRedirect: '',
            validCode: null,
            codeTouched: false,
        }

        this.handleCodeChange = this.handleCodeChange.bind(this)
    }

    componentDidMount() {

        const fetchedCode = this.props.match.params.code;
        this.setState({
            code: fetchedCode
        })

        if(fetchedCode){
            this.fetchVragenlijstIdEnRedirect(fetchedCode)
        }

    }


    render(){

        if(this.state.validCode && this.state.vragenlijstId){
            return(
                <Redirect to={{
                    pathname: '/vragenlijst',
                    state: { id: this.state.vragenlijstId }
                }} />
            )
        }

        return(
            <form onSubmit={this.onSubmit} className="form form--code">
                <fieldset className="form__fieldset">
                    <label className="form__label" htmlFor="code">Code</label>
                    <input onChange={this.handleCodeChange} type="text" name="code" className={this.state.validCode == false && this.state.codeTouched ? "form__input form__input--invalid" : "form__input"}/>
                </fieldset>
                <input type="submit" value="Start" className="form__submit" disabled={this.state.codeTouched ? '' : true} />
            </form>
        )
    }


    fetchVragenlijstIdEnRedirect(code){
        const BASE_URL = "http://127.0.0.1:8000/api/"
        axios.get(BASE_URL + "code/" + code + "/vragenlijst").then(response => {
            this.setState({
                vragenlijstId: response.data.id,
                validCode: true
            })
        }).catch(
            this.setState({
                validCode: false
            })
        )
    }

    handleCodeChange(event){
        const target = event.target;
        const value = target.value;
        console.log(value)


        this.setState({
            code: value,
            codeTouched: true
        })
    }

    onSubmit = event => {
        event.preventDefault();
        this.fetchVragenlijstIdEnRedirect(this.state.code);
    }
}

const mapStateToProps = state => {
    return { csrf_token: state.CSRFToken }
}

export default withRouter(connect(mapStateToProps) (CodeInvoeren))
