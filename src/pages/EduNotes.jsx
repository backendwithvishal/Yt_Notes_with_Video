import React from 'react'
import Ytsection from '../components/Ytsection'
import NotesSection from '../components/NotesSection'
import { useNoteStore } from '../store/useNotes'

const EduNotes = () => {
  const {generatePDF, clearNotes} = useNoteStore();



  return (
    <div className='flex flex-col justify-center items-center'>
      <Ytsection />
      <NotesSection />
      <div>
        <button
        onClick={clearNotes}
        style={{
          background:
            "linear-gradient(to right, green -123%, green 74%)",
        }}
        className='m-4 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all'>
        Clear Notes</button>
      <button
        onClick={generatePDF}
        style={{
          background:
            "linear-gradient(to right, white -123%, black 74%)",
        }}
        className='m-4 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all'>
        Export PDF</button>

        </div>

    </div>
  )
}

export default EduNotes
