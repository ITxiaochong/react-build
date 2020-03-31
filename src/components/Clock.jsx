import React from 'react';
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.test = [123, 456, 789, 111, 222, 333];
        this.count = 0;
        this.state = {
            date: new Date(),
            name: 'World'
        };
    }
    sayHello() {
        if (this.count % 2) {
            this.setState({
                name: `Odd${this.count}`
            })
        } else {
            this.setState({
                name: `Even${this.count}`
            })
        }
        this.count++;
    }
    render() {
        return (
            <div>
                {this.test.map(item => <h2 key={item.toString()}>{item}</h2>)}
                <h1 onClick={this.sayHello.bind(this)}>Hello,{this.state.name}</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }

    tick() {
        this.setState(() => ({
            date: new Date()
        }))
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
export default Clock;
