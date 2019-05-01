import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Doctor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: 1
        }
    }
    
    componentDidMount() {
        this.fetchDate()
    }

    fetchDate = async () => {
        const data = await fetch('/doctor.json')
            .then(response => response.json())
            .catch(error => console.log(error));

        this.setState({
            data: data
        })
    }

    handleChange = (event) => {
        this.setState({ selected: event.target.value });
        console.log(this.state.selected)
        console.log(this.state.data.firstName)
    }

    render() {
        return (
            <div>
                <select value={this.state.selected} onChange={this.handleChange}>{ 
                        this.state.data.map((doctor) => { 
                            return <option value={doctor.id} key={doctor.id}>{doctor.firstName + " " + doctor.lastName}</option>
                        })
                    }</select>
                <div>
                    <ul>First Name: {this.state.data.firstName}</ul>
                    <ul>Last Name: {this.state.data.lastName}</ul>
                    <ul>Area Code: {this.state.data.area}</ul>
                    <ul>Phone Number: {this.state.data.number}</ul>
                    <ul>Expertise: {this.state.data.specialty}</ul>
                </div>
            </div>
        )
    }
}