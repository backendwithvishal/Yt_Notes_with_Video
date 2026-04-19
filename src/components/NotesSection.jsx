import { useNoteStore } from "../store/useNotes"
import { useEffect, useState } from "react"
const NotesSection = () => {

  const { setTime, addNote, loadNotes,notes } = useNoteStore();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const UpdateNote = () => {
    const currentTime = setTime();
    const notes = { time: currentTime, title, description };
    addNote(notes);
    setTitle("");
    setDescription("");
  }

  useEffect(() => {
    loadNotes();
    console.log(notes)

  },[UpdateNote])


  return (
    <div className="border mt-10 p-2 w-6xl h-60 overflow-y-auto flex  text-xl">
      {/* All Notes Section - 1st div */}
      <div className="overflow-y-auto w-80" >
        
        <ul>
          <h2 className="text-center font-bold underline bg-green-200 p-1">Notes</h2>
          {
            notes.map((note,index)=>(
              <li className="p-1 cursor-pointer" key={index}>
                <h3>{note.title}</h3>
              </li>
            ))
          }
        </ul>
        
      </div>


      {/* second div  */}
      


        {/* input Section  */}
        <div className="flex gap-4">
          {/* <input type="text" name="title" placeholder="Title" /> */}
          <div className="flex flex-col gap-4">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder="Title" className="border w-200 p-2" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="desc" id="desc" placeholder="Description" className="border w-200 h-40 p-2"></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={UpdateNote} className="cursor-pointer px-4 p-1 hover:bg-green-200 rounded-2xl">Add</button>
          </div>
        </div>
        
    </div>

    
  )
}

export default NotesSection
