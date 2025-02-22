import { PlaygroundProvider } from './ReactPlayground/PlaygroundContext';
import ReactPlayground from './ReactPlayground';
import './App.scss';

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  );
}

export default App;
