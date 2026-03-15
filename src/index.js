import { program } from "commander";
import pc from "picocolors";
import createCommand from "./commands/create.js";
import installCommand from "./commands/install.js";
import devCommand from "./commands/dev.js";
import buildCommand from "./commands/build.js";
import startCommand from "./commands/start.js";
import migrateCommand from "./commands/migrate.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));

const printGlobalBanner = () => {
    console.log(pc.cyan(`
   /\\_/\\   ${pc.bold(pc.white('Nova.js CLI'))} ${pc.gray('v' + packageJson.version)}
  ( o.o )  ${pc.blue('Engineered for Absolute Performance')}
   > ^ <   ${pc.gray('-----------------------')}
    `));
};

program
    .name("nova")
    .description("Interactive and elegant CLI for building Nova.js applications")
    .version(packageJson.version, "-v, --version", "Output the current version")
    .addHelpText("before", () => {
        printGlobalBanner();
    });

// Override default help to show banner when no args
if (process.argv.length <= 2) {
    printGlobalBanner();
    console.log(pc.white(pc.bold("WELCOME TO THE PACK!")));
    console.log(pc.gray("Nova.js is a SADA-based framework built for speed and precision.\n"));
    console.log(pc.white("Quick Start:"));
    console.log(`  ${pc.cyan("nova create <name>")}   ${pc.gray("Initialize a new high-performance project")}\n`);
    console.log(pc.white("Run ") + pc.cyan("nova --help") + pc.white(" to see all available commands.\n"));
    process.exit(0);
}

program
    .command("create [projectName]")
    .description("Initiate a Nova.js project from scratch")
    .action(createCommand);

program
    .command("install")
    .description("Install project dependencies using the correct lockfile")
    .action(installCommand);

program
    .command("dev")
    .description("Start the development server (Proxy to local ./nova dev)")
    .action(devCommand);

program
    .command("build")
    .description("Compile the application for production")
    .action(buildCommand);

program
    .command("start")
    .description("Run the production build")
    .action(startCommand);

program
    .command("migrate")
    .description("Run database migrations")
    .action(migrateCommand);

program.parse(process.argv);
