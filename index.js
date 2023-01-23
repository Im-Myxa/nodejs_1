const yargs = require("yargs");
const { addNote, printNites, removeNotes } = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNotes(id);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  handler() {
    printNites();
  },
});

yargs.parse();
