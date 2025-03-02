import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('new <hope>', 'create new hope', (yargs) => { //მაქვს ბრძანება new,რომელსაც სჭირდება არგუმენტად hope
    return yargs.positional("hope", {
      describe: "the hope to create",
      type: "string"
    })
  }, (argv) => {
    console.log(argv)
  })
  .option("tags", {
    alias: "t", // შემოკლებული ვარიანტი
    type: "string",
    description: "tags for the hope"
  })
  .demandCommand(1) // აუცილებელია 1 ბრძანება
  .parse()