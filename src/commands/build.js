import fs from "node:fs";
import { execSync } from "node:child_process";
import pc from "picocolors";

export default () => {
    console.log(pc.blue(pc.bold(`\n[INFO] Building Nova.js Application...`)));
    try {
        let pkgManager = "npm";
        if (fs.existsSync("bun.lockb") || fs.existsSync("bun.lock"))
            pkgManager = "bun";

        const runCmd =
            pkgManager === "npm" ? "npm run build" : `${pkgManager} build`;
        execSync(runCmd, { stdio: "inherit", cwd: process.cwd() });
        console.log(
            pc.green(
                pc.bold(
                    `\n[SUCCESS] Build completed successfully!\n`,
                ),
            ),
        );
    } catch (error) {
        console.log(
            pc.red(
                `\n[ERROR] Build process failed.\n`,
            ),
        );
    }
};
