import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Doctor extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            selected: 1
        }
    }
    
    componentDidMount() {
        fetch('/doctor.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ data: data })
        })
        .catch(error => console.log(error));
    }

    handleChange() {
        this.setState({ selected: this.state.data.key });
    }


    render() {
        return (
            <div>
                <select onChange={this.handleChange}>{ 
                        this.state.data.map((doctor) => { 
                            return <option key={doctor.id}>{doctor.firstName}</option>
                        })
                    }</select>
                <div>
                    <ul>{this.state.data.firstName}</ul>
                    <ul>{this.state.data.lastName}</ul>
                    <ul>{this.state.data.area}</ul>
                    <ul>{this.state.data.number}</ul>
                    <ul>{this.state.data.specialty}</ul>
                </div>
            </div>
        )
    }
}