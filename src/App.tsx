import './App.scss';
import { PlaygroundProvider } from './ReactPlayground/PlaygroundContext';
import ReactPlayground from './ReactPlayground';

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  );
}

export default App;
