//Ayda Github Project
document.addEventListener("DOMContentLoaded", function () {
    const notesList = document.getElementById("notes-list");
    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");
    const addNoteButton = document.getElementById("add-note");
    const saveNoteButton = document.getElementById("save-note");
    const deleteNoteButton = document.getElementById("delete-note");
    const noNoteSelected = document.getElementById("no-note-selected");
    const noteEditor = document.getElementById("note-editor");

    let selectedNoteIndex = null;
    let notes = [];

    // Load notes from browser
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        renderNotesList();
    }

    // Event listeners for click
    addNoteButton.addEventListener("click", createNote);
    saveNoteButton.addEventListener("click", saveNote);
    deleteNoteButton.addEventListener("click", deleteNote);
    notesList.addEventListener("click", selectNote);

    // Functions
    function createNote() {
        const newNote = {
            title: "",
            body: "",
        };
        notes.push(newNote);
        selectedNoteIndex = notes.length - 1;
        renderNotesList();
        renderNoteEditor();
    }

    function saveNote() {
        notes[selectedNoteIndex].title = noteTitle.value;
        notes[selectedNoteIndex].body = noteBody.value;
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotesList();
        renderNoteEditor();
    }

    function deleteNote() {
        if (selectedNoteIndex !== null) {
            notes.splice(selectedNoteIndex, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            selectedNoteIndex = null;
            renderNotesList();
            renderNoteEditor();
        }
    }

    function selectNote(event) {
        const target = event.target;
        if (target.tagName === "LI") {
            selectedNoteIndex = Array.from(notesList.children).indexOf(target);
            renderNoteEditor();
        }
    }

    function renderNotesList() {
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = note.title || "Untitled Note";
            if (selectedNoteIndex === index) {
                listItem.classList.add("selected");
            }
            notesList.appendChild(listItem);
        });

        if (notes.length === 0) {
            noNoteSelected.classList.remove("hidden");
            noteEditor.classList.add("hidden");
        } else {
            noNoteSelected.classList.add("hidden");
            noteEditor.classList.remove("hidden");
        }
    }

    function renderNoteEditor() {
        if (selectedNoteIndex !== null) {
            const selectedNote = notes[selectedNoteIndex];
            noteTitle.value = selectedNote.title;
            noteBody.value = selectedNote.body;
        } else {
            noteTitle.value = "";
            noteBody.value = "";
        }
        renderNotesList();
    }
});
