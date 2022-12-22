const addButton = document.querySelector('#notebtn');
const addLocalData = () =>{
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    // console.log(notes);
    localStorage.setItem('notes',JSON.stringify(notes));
}
const addNewNote = (text = '') =>{
    const note = document.createElement('div');
    note.classList.add('note');
    const addHtml = `
    <div class="opeartion">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="main ${text?"":"hidden"} "></div>
    <textarea class="${text?"hidden":""}"></textarea>
    `;
    note.insertAdjacentHTML('beforeend',addHtml);
    const editbtn = note.querySelector('.edit');
    const deletebtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textar = note.querySelector('textarea');
    
    document.body.appendChild(note);
    deletebtn.addEventListener('click',() => {
        note.remove();
        addLocalData();
    })
    textar.value = text;
    mainDiv.innerHTML = text;
    editbtn.addEventListener('click',() =>{
        mainDiv.classList.toggle("hidden");
        textar.classList.toggle("hidden");
    })
    textar.addEventListener('change',(event) =>{
        const value = event.target.value;
        mainDiv.innerHTML = value;
        addLocalData();
        
    })   
}
const notes = JSON.parse(localStorage.getItem("notes"));
if(notes){ notes.forEach((note)=> addNewNote(note) )}

addButton.addEventListener('click',() =>{
    addNewNote();
})
