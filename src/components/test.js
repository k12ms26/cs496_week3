import React from 'react';
import { Link } from 'react-router-dom'

export default class Test extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            message: null,
            showScore: false,
            total_ei: 0,
            total_ns: 0,
            total_tf: 0,
            total_pj: 0,
            current: 0,
            questions: [],
            count: 0
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/api/question')
            .then(res=>res.json())
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({count:res.count});
                this.setState({questions: res.results.map(item => ({
                    content: item.content,
                    options: item.options,
                    index: item.index
                }))
            });
        })
    }
    
    render() {
        const handleAnswerOptionClick = (option) => {
            this.setState({total_ei:this.state.total_ei + option.ei_point});
            this.setState({total_ns:this.state.total_ns + option.ns_point});
            this.setState({total_tf:this.state.total_tf + option.tf_point});
            this.setState({total_pj:this.state.total_pj + option.pj_point});
        
            const next = this.state.current+1;
            if (next < this.state.count) {
                this.setState({current:next});
            } else {
                this.setState({showScore:this.state.showScore+1});
            }
        };
    
        const questiontextcomponent = this.state.questions.map(item => {
            if (item.index == this.state.current+1) {
                return <div className='question-text'>{item.content}</div>
            }
        })
    
        const questionoptioncomponent = this.state.questions.map(item => {
            if (item.index == this.state.current+1) {
                return item.options.map((option) => (
                <button onClick={() => handleAnswerOptionClick(option)}>{option.description}</button>
                ))
            }
        })
    
        return (
            <div className='app'>
                {this.state.showScore ? (
                <div className='score-section'>
                    <p className="testEnd">모든 질문에 답변하셨습니다.</p>
                    <Link to={{
                            pathname: "/result",
                            search: "?ei=" +this.state.total_ei+ "&ns=" +this.state.total_ns+ "&tf=" +this.state.total_tf + "&pj=" +this.state.total_pj,
                        }} className='link'>
                        <button className="result_go">결과 확인</button>
                    </Link>
                </div>
                ) : (
                <>
                    <div className='question-section'>
                    <div className='question-count'>
                        <span>  Question {this.state.current + 1}</span>/{this.state.count}
                    </div>
                    <br></br>
                    <div className="ques">{questiontextcomponent}</div>
                    </div>
                    <div className='answer-section'>
                    {questionoptioncomponent}
                    </div>
                </>
                )}
            </div>
        );
    }
}