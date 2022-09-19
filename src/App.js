import './scss/Style.scss';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Split from "react-split";

function App() {

  return (
    <main>
    <Split
     sizes={[20 , 80]}
     direction="horizontal"
     className="split"
     >
      <Sidebar />
      <Editor />
     </Split>
    </main>
    
  );
}

export default App;
