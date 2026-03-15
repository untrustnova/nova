import fs from "node:fs";
import { spawn } from "node:child_process";
import pc from "picocolors";

export default () => {
    console.log(
        pc.green(pc.bold(`\n[INFO] Starting Nova.js in Production Mode...\n`)),
    );
    try {
        let pkgManager = "npm";
        if (fs.existsSync("bun.lockb") || fs.existsSync("bun.lock"))
            pkgManager = "bun";

        const runCmd =
            pkgManager === "npm" ? "npm run start" : `${pkgManager} start`;
        spawn(runCmd, {
            stdio: "inherit",
            shell: true,
            cwd: process.cwd(),
        });
    } catch (error) {
        console.log(pc.red(`\n[ERROR] Failed to start the application.\n`));
    }
};
