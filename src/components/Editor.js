import React from 'react';
import MarkDownView from "showdown";
import ReactMde from "react-mde";
import { useGlobalContext } from '../context';


const Editor = () => {
  const { updateNote, currentNote, currentId, selectedTab, setSelectedTab, notes, save } = useGlobalContext();


  const converter = new MarkDownView.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });


  return (
    <section className='editor-container'>
      {currentId && notes.length > 0 &&
        <ReactMde
          value={currentNote().title}
          onChange={updateNote}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))}
          paste={{
            saveImage: save
          }}
          minEditorHeight={50}
          heightUnits="vh" />
      }
    </section>
  )

}

export default Editor;