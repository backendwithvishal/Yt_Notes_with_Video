import {create} from 'zustand'
import { jsPDF } from 'jspdf';

export const useNoteStore = create((set,get)=>({
    url:"",
    player:null,
    videoId:"",
    time:"",
    notes:[],

    setPlayer: (player) => set({ player }),

    videoIdExtractor: (url) => {
        const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = match && match[1].length === 11 ? match[1] : "";
        console.log("Extracted Video ID:", videoId || "No match found");
        set({ videoId });
      },

    setUrl:  (newUrl)  =>  {
        if(!newUrl.includes("youtube.com")) return alert("Please enter a valid YouTube URL");
        set({url:newUrl})
         get().videoIdExtractor(newUrl);
    },

    setTime : ()=>{
        const player = get().player;
        if(player){
            const currentTime = player.getCurrentTime();
            // console.log("Current Time:", currentTime);
            return currentTime;
        }
    },

    addNote: (note) => {
        let notes = [];
      
        try {
          const parsed = JSON.parse(localStorage.getItem("ytNotes"));
          notes = Array.isArray(parsed) ? parsed : []; 
        } catch (e) {
          notes = [];
        }
      
        const updated = [...notes, note];
      
        localStorage.setItem("ytNotes", JSON.stringify(updated));
        set({ notes: updated });
      },

    loadNotes :()=>{
        const notes = JSON.parse(localStorage.getItem("ytNotes")) || [];
        set({notes: notes});
    },

    generatePDF: () => {
        const notes = JSON.parse(localStorage.getItem("ytNotes")) || [];
      
        const doc = new jsPDF();
      
        let y = 10;
      
        doc.setFontSize(16);
        doc.text("YouTube Notes", 10, y);
        y += 10;
      
        notes.forEach((note, index) => {
          const time = note.time ? `Time: ${note.time.toFixed(2)}s` : "Time: -";
      
          doc.setFontSize(12);
          doc.text(`${index + 1}. ${note.title || "No Title"}`, 10, y);
          y += 6;
      
          doc.text(time, 10, y);
          y += 6;
      
          doc.text(`Description: ${note.description || "-"}`, 10, y);
          y += 10;
      
          // page break
          if (y > 270) {
            doc.addPage();
            y = 10;
          }
        });
      
        doc.save("yt-notes.pdf");
      },

      clearNotes:()=>{
        localStorage.removeItem("ytNotes");
        set({notes:[]});
      }

}))