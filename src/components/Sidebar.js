
import { FaPlus, FaTrashAlt} from 'react-icons/fa' 
import { useGlobalContext } from '../context';

const Sidebar = () => {
      const {notes, addNote, removeNote,setCurrentId} = useGlobalContext();
      

      return (
            <aside className="sidebar">
            <header className="sidebar--header">
            <h3>add notes</h3>
            <button className="sidebar--header--add" onClick={addNote}>
            <FaPlus />
            </button>
            </header>
            {notes.map(note  => {
                  return (
                  <div key={note.id} className="sidebar--note"
                  onClick={() => setCurrentId(note.id)}>
                    <h4 className="sidebar--note--snippet">{note.title.split("\n")[0]}</h4>  
                  <button className='sidebar--note--del'
                  onClick={(event) => removeNote(event, note.id)}>
                  <FaTrashAlt />
                  </button>
                  </div>
                  )})}
                  
            </aside>

      );
}

export default Sidebar;