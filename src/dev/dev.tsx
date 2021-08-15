import * as Nano from '../core'
import { Component } from '../component'
import { useState } from '../hooks/useState';
import useEffect from '../hooks/useEffect';

function Test() {
    const [count, setCount] = useState(0, 'Test');

    useEffect(() => {
        console.log('mount');
        return () => console.log('unmount');
    }, [], 'Test');

    useEffect(() => {
        console.log('count changed');
    }, [count], 'Test');

    const onClick = () => {
        setCount(count + 1);
    };

    return (
        <button onClick={onClick}>
            {count}
        </button>
    );
}

class App extends Component {

    constructor() {
        super(undefined);
        this.state = { removed: false };
    };

    onClick = () => {
        this.setState({ removed: true }, true);
    };

    render() {
        return (
            <div>
                <div onClick={() => this.onClick()}>Nano JSX App</div>
                {!this.state.removed && <Test />}
            </div>
        );
    };
}

Nano.render(<App />, document.getElementById('root'))
