import yargs, { argv } from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "new <hope>",
    "create new hope",
    (yargs) => {
      //მაქვს ბრძანება new,რომელსაც სჭირდება არგუმენტად hope
      return yargs.positional("hope", {
        describe: "the hope to create",
        type: "string",
      });
    },
    (argv) => {
      console.log(argv);
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
    (argv) => {
      console.log(argv);
    }
  )
  .command("find <filter>", "get matching hopes", (yargs) => {
    return (
      yargs.positional("filter", {
        describe: "the filter to apply to the hopes",
        type: "string",
      }),
      (argv) => {
        console.log(argv);
      }
    );
  })
  .command("remove <id>", "remove a hope by id", (yargs) => {
    return yargs.positional("id", {
      describe: "the id of the hope remove",
      type: "number",
    });
  })
  .command("web [port]", "start a web server", (yargs)=>{
    return yargs.positional("port", {
      describe: "the port to start the server on",
      type: "number",
      default: 5000
    }),
    (argv) => {
      console.log(argv);
    }
  })
  .command("clean", "remove all hopes", () => {}, (argv) => {})
  .demandCommand(1) // აუცილებელია 1 ბრძანება
  .parse();
