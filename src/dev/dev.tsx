import * as Nano from '../core'
import { Component } from '../component'
import { useState } from '../hooks/useState';

function Test() {
    const [count, setCount] = useState(0, 'test', Test);

    const onClick = () => {
        //console.log(Test.prototype._elements);
        setCount(count + 1);
    };

    return (
        <button onClick={onClick}>
            {count}
        </button>
    );
}

class App extends Component {
  render() {
      return (
          <div>
              <div>Nano JSX App</div>
              <Test />
          </div>
      );
  }
}

Nano.render(<App />, document.getElementById('root'))
