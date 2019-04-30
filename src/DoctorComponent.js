import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Doctor extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
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

    render() {
        return (
            <div>
                <select>{ 
                        this.state.data.map((doc) => {
                            return <option value={doc.area}>{doc.firstName}</option>
                        })
                    }</select>
            </div>
        
        )
    }
}