import React from 'react';
import queryString from 'query-string';
import '../index.css';

export default class Result extends React.Component {

    constructor(props) {
        super(props);
    
        const { search } = this.props.location;

        const queryObj = queryString.parse(search);
        this.state = {
            total_ei: queryObj.ei,
            total_ns: queryObj.ns,
            total_tf: queryObj.tf,
            total_pj: queryObj.pj,
            result: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/result/search'+ this.props.location.search)
            .then(res=>res.json())
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({result: res});
            });
    }

    render() {
        return (
            <div className='app'>
                <div className="Result">
                    당신의 유형은...
                    <br></br>
                </div>
                <div><img className="image" src = {this.state.result.image} /></div>
                <br></br>
                <div className="resulttype">{this.state.result.result_type}</div>
                <br></br>
                <br></br>
                <div className="description">{this.state.result.description}</div>
                <hr className="typehr"></hr>
                <img className="goodimage" src={this.state.result.goodtype_image} /><div className="type">찰떡궁합 유형<br></br>{this.state.result.goodtype}</div>
                <img className="badimage" src={this.state.result.badtype_image} /><div className="type">최악궁합 유형<br></br>{this.state.result.badtype}</div>
            </div>
        );
    }
}
