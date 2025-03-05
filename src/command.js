#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findHope, getAllHopes, newHope, removeAllHopes, removeHope } from "./hopes.js";
import { start } from "./server.js";

yargs(hideBin(process.argv))
  .command(
    "new <hope>", 
    "create new hope",
    (yargs) => {
      return yargs.positional("hope", {
        describe: "the hope to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newHope(argv.hope, tags);
      console.log(note);
    }
  )
  .option("tags", {
    alias: "t", 
    type: "string",
    description: "tags for the hope",
  })
  .command(
    "all",
    "get all notes",
    () => {}, 
    async () => {
      const hopes = await getAllHopes();
      console.log(hopes);
    }
  )
  .command(
    "find <filter>",
    "get matching hopes",
    (yargs) => {
      return yargs.positional("filter", {
        describe: "the filter to apply to the hopes",
        type: "string",
      });
    },
    async (argv) => {
      const hopes = await findHope(argv.filter);
      console.log(hopes);
    }
  )
  .command(
    "remove <id>",
    "remove a hope by id",
    (yargs) => {
      return yargs.positional("id", {
        describe: "the id of the hope to remove",
        type: "number",
      });
    },
    async (argv) => {
      const id = await removeHope(argv.id);
      if (id) {
        console.log("Hope removed ID:" + id);
      } else {
        console.log("Invalid ID, try again");
      }
    }
  )
  .command(
    "web [port]",
    "start a web server",
    (yargs) => {
      return yargs.positional("port", {
        describe: "the port to start the server on",
        type: "number",
        default: 3000,
      });
    },
    async (argv) => {
      const hopes = await getAllHopes();
      start(hopes, argv.port);
    }
  )
  .command(
    "clean",
    "remove all hopes",
    () => {}, 
     () => {
      removeAllHopes();
      console.log("all hopes removed");
    }
  )
  .demandCommand(1) 
  .parse();