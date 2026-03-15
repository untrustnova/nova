import fs from "node:fs";
import { execSync } from "node:child_process";
import pc from "picocolors";

export default () => {
    let pkgManager = "npm";
    let installCmd = "npm install";

    if (fs.existsSync("bun.lockb") || fs.existsSync("bun.lock")) {
        pkgManager = "bun";
        installCmd = "bun install";
    } else if (fs.existsSync("yarn.lock")) {
        pkgManager = "yarn";
        installCmd = "yarn";
    } else if (fs.existsSync("pnpm-lock.yaml")) {
        pkgManager = "pnpm";
        installCmd = "pnpm install";
    }

    console.log(
        pc.white(
            `Detecting lockfile... using ${pc.cyan(pc.bold(pkgManager))} to install dependencies!\n`,
        ),
    );
    try {
        execSync(installCmd, { stdio: "inherit", cwd: process.cwd() });
        console.log(
            pc.green(
                pc.bold("\n✨ Dependencies installed successfully!\n"),
            ),
        );
    } catch (error) {
        console.log(pc.red(`\nFailed to install dependencies.\n`));
        process.exit(1);
    }
};
