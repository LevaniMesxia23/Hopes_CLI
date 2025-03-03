import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findHope, getAllHopes, newHope } from "./hopes.js";

yargs(hideBin(process.argv))
  .command(
    "new <hope>", //მაქვს ბრძანება new,რომელსაც სჭირდება არგუმენტად hope
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
    alias: "t", // შემოკლებული ვარიანტი
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
  .command("remove <id>", "remove a hope by id", (yargs) => {
    return yargs.positional("id", {
      describe: "the id of the hope remove",
      type: "number",
    });
  })
  .command("web [port]", "start a web server", (yargs) => {
    return (
      yargs.positional("port", {
        describe: "the port to start the server on",
        type: "number",
        default: 5000,
      }),
      (argv) => {
        console.log(argv);
      }
    );
  })
  .command(
    "clean",
    "remove all hopes",
    () => {},
    (argv) => {}
  )
  .demandCommand(1) // აუცილებელია 1 ბრძანება
  .parse();
