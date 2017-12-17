import React, { Component } from 'react';

// ErrorBoundary Is A High Order Component To Catch Any Error
// Wrap The Component Which Might Fail To Do It's Mession
// It For Production To Show A Custom Error Message For User And
// It Will Not Woring For Development Path
class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        });
    }

    render() {
        if(this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>
        } else {
            return this.props.children;
        }
    }
}