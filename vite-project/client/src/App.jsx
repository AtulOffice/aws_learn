import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/get`, {
        withCredentials: true
      });
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API_URL}/create`, { text }, {
        withCredentials: true
      });
      setText("");
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true
      });
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-slate-800 tracking-tight">
          📝 Notes
        </h1>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 sm:p-6 mb-8 transition-all hover:shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Write a note..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />

            <button
              onClick={addNote}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* Loading / Empty / Notes */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-600 mb-3"></div>
            <p className="text-slate-600 font-medium">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-10 text-center">
            <p className="text-5xl mb-4 text-slate-300">📭</p>
            <p className="text-slate-600 font-medium text-lg">No Notes Found</p>
            <p className="text-slate-400 text-sm mt-2">Add your first note above!</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {notes?.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="break-words flex-1 text-slate-700 leading-relaxed">
                    {note.text}
                  </p>

                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-3 font-medium">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;