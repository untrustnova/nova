import fs from "node:fs";
import { execSync } from "node:child_process";
import pc from "picocolors";

export default () => {
    console.log(
        pc.yellow(pc.bold(`\n[INFO] Initializing Database Migrations...\n`)),
    );
    try {
        let pkgManager = "npm";
        if (fs.existsSync("bun.lockb") || fs.existsSync("bun.lock"))
            pkgManager = "bun";

        const runCmd =
            pkgManager === "npm"
                ? "npm run migrate"
                : `${pkgManager} migrate`;
        execSync(runCmd, { stdio: "inherit", cwd: process.cwd() });
        console.log(
            pc.green(
                pc.bold(`\n[SUCCESS] Migration completed successfully!\n`),
            ),
        );
    } catch (error) {
        console.log(
            pc.red(`\n[ERROR] Migration failed. Is your database running?\n`),
        );
    }
};
