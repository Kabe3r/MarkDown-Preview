import React, { useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';

const AppContext = React.createContext();

const getLocalStorage = () => {
      return JSON.parse(localStorage.getItem('notes')) || [];
}

const AppProvider = ({ children }) => {
      const [notes, setNotes] = useState(getLocalStorage());
      const [currentId, setCurrentId] = useState();
      const [selectedTab, setSelectedTab] = useState('write');

      useEffect(() => {
            localStorage.setItem('notes', JSON.stringify(notes));
      }, [notes]);

      const save = async function* (data) {
            const wait = (time) => {
                  return new Promise((a, r) => {
                        setTimeout(() => a(), time);
                  });
            };

            await wait(2000);
            yield "https://picsum.photos/300";
            await wait(2000);
            return true;
      }


      const addNote = () => {
            const newNote = {
                  id: nanoid(),
                  title: `MarkDown Preview`
            }
            setNotes(prevNotes => [newNote, ...prevNotes]);
            setCurrentId(newNote.id);
      }

      const removeNote = (event, id) => {
            event.stopPropagation();
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
      }

      const currentNote = () => {
            return notes.find(note => {
                  return note.id === currentId;
            }) || notes[0];
      }


      const updateNote = (text) => {
            setNotes(oldNotes => {
                  const newArray = []
                  for (let i = 0; i < oldNotes.length; i++) {
                        const oldNote = oldNotes[i]
                        if (oldNote.id === currentId) {
                              newArray.unshift({ ...oldNote, title: text })
                        } else {
                              newArray.push(oldNote)
                        }
                  }
                  return newArray
            })
      }

      return (
            <AppContext.Provider
                  value={{
                        notes,
                        addNote,
                        removeNote,
                        currentNote,
                        currentId,
                        setCurrentId,
                        updateNote,
                        selectedTab,
                        setSelectedTab,
                        save

                  }} >
                  {children}
            </AppContext.Provider>
      );
}

export const useGlobalContext = () => {
      return useContext(AppContext);
}

export { AppContext, AppProvider }