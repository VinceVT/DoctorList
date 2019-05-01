import React, { Fragment } from 'react';
import fetch from 'isomorphic-fetch';

export default class Doctor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: 0
        }
    }
    
    componentDidMount() {
        this.fetchDoctor()
    }

    fetchDoctor = async () => {
        const data = await fetch('/doctor.json')
            .then(response => response.json())
            .catch(error => console.log(error));

        this.setState({
            data: data,
        })
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({ 
            selected: event.target.value,
         });
        
    }

    render() {
        //Specialty is based of Expertise displays all doctors that have same expertise as a suggestion
        const { data, selected } = this.state;
        const styles = {
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignContent: "center",
            marginLeft: "5px"
        };

        let docArray = data.filter(sel => {
            return sel.specialty === data[selected].specialty;
        })

        console.log(docArray);
        return (
            <div style={ styles }>
                <select value={this.state.selected} onChange={this.handleChange}>{ 
                        this.state.data.map((doctor, index) => { 
                            return <option key={doctor.id} value={index} >{doctor.firstName + " " + doctor.lastName}</option>
                        })
                    }</select>
                <Fragment>
                    {
                        data[selected] && (
                            <Fragment>
                                <ul>First Name: {data[selected].firstName}</ul>
                                <ul>Last Name: {data[selected].lastName}</ul>
                                <ul>Area Code: {data[selected].area}</ul>
                                <ul>Phone Number: {data[selected].number}</ul>
                                <ul>Rating: {data[selected].rating}</ul>
                                <ul>Expertise: {data[selected].specialty}</ul>
                                <ul>Similiar Doctors: {
                                    docArray.filter(sel => {
                                        return sel.lastName !== data[selected].lastName
                                    }).map(d => <div>{d.firstName + " " + d.lastName}</div>)
                                }</ul>
                            </Fragment>
                        )
                    }
                </Fragment>
            </div>
        )
    }
}