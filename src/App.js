import React from 'react';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    state = {
        companyinfoarray: [],
    };

    addCompany = (companyinfo) => {
        this.setState(prevState => ({
            companyinfoarray: [...prevState.companyinfoarray, companyinfo],
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addCompany} />
                <CompanyList companyinfoarray={this.state.companyinfoarray} />
            </div>
        );
    }
}

class Form extends React.Component {
    state = { companyName: '' };

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://vylwyqxl3e.execute-api.us-west-2.amazonaws.com/beta/datalookup?ipAddress=${this.state.companyName}`);
        this.props.onSubmit(resp.data);
        this.setState({ companyName: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span className="formtext">&#x3C;Form /&#x3E;</span>
                <input
                    type="text"
                    value={this.state.companyName}
                    onChange={event => this.setState({ companyName: event.target.value })}
                    placeholder="Enter IP Address or Domain/File Hash"
                    required
                />
                <button>Go!</button>
            </form>
        );
    }
}

class Company extends React.Component {
    render() {
        const p = this.props;
        return (
            <div className="company">
                <span className="companytext">&#x3C;Info /&#x3E;</span>
                <div className="companyinfo">
                    <div>IP: {p.ip}</div>
                    <div>Country Name: {p.country_name}</div>
                    <div>City: {p.city}</div>
                    <div>Time Zone: {p.time_zone}</div>
                </div>
            </div>
        );
    }
}

class CompanyList extends React.Component {
    render() {
        const p = this.props;
        return (
            <div className="companylist">
                <span className="companylisttext">&#x3C;CompanyList /&#x3E;</span>
                {p.companyinfoarray.map(companyinfo => <Company key={companyinfo.ip} {...companyinfo}/>)}
            </div>
        );
    }
}

export default App;
