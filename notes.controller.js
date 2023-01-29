const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const nodemon = require("nodemon");

//переменная с путем файла базы данных , таким образом данный путь можно использовать везде
const notesPath = path.join(__dirname, "db.json");

//получаем базу данных и видоизменяем
async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green("Note was added!"));
}

//функция изменения данных в БД
async function editNote(id, title) {
  const notes = await getNotes();
  const editNote = notes.map((note) => {
    if (note.id === id) {
      note.title = title;
    }
    return note;
  });
  console.log(chalk.red(`Note by id: ${id} modify from db`));
  await fs.writeFile(notesPath, JSON.stringify(editNote));
}

//функция удаления записи из бд по id
async function removeNote(id) {
  const notes = await getNotes();
  const removeNote = notes.filter((note) => {
    return note.id !== id;
  });
  console.log(chalk.red(`Note by id: ${id} has been removed from db`));
  await fs.writeFile(notesPath, JSON.stringify(removeNote));
}

//бурем из базы данных объект
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

//функция получения инфо и ее стилизация
async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
