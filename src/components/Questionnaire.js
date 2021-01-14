import React, { Component } from 'react'
import dataSet from '../api/dataSet';
import QuizArea from './QuizArea';
import ScoreArea from './ScoreArea';

class Questionnaire extends Component {

    constructor() {
        super();
        this.state = {
            current:0,
            dataSet : dataSet,
            correct : 0,
            incorrect : 0,
            inFinished : false
        }

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(choice) {
        if(choice == this.state.dataSet[this.state.current].correct) {
            this.setState({correct:this.state.correct + 1})
        } else {
            this.setState({correct:this.state.incorrect + 1})
        }

        if(this.state.current == this.state.dataSet.length - 1) {
            this.setState({isFinished:true})
        } else {
            this.setState({isFinished:this.state.current + 1})
        }
    }
    render() {
        return (
            <div>
                <QuizArea handleClick={this.handleClick} isFinished={this.state.isFinished} dataSet={this.state.dataSet[this.state.current]}/>
                <ScoreArea correct={this.state.correct} incorrect={this.state.incorrect}/>
            </div>
        )
    }
}

export default Questionnaire;