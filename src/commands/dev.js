import fs from "node:fs";
import { spawn } from "node:child_process";
import pc from "picocolors";

export default () => {
    console.log(pc.cyan(`\n🐺 Dispatching Nova ecosystem...`));
    
    // 1. Detect Package Manager for CLI Runner
    const isBun = fs.existsSync("bun.lockb") || fs.existsSync("bun.lock");
    const runner = isBun ? "bunx" : "npx";

    // 2. Run Tailwind v4 Build locally
    if (fs.existsSync("./web/index.css")) {
        const tailwindCmd = `${runner} @tailwindcss/cli -i ./web/index.css -o ./public/css/nova.css --watch`;
        
        // Silence stderr to hide "invalid @ rule" warnings
        const tailwindProcess = spawn(tailwindCmd, { stdio: ['ignore', 'pipe', 'ignore'], shell: true });
        
        tailwindProcess.stdout.on('data', (data) => {
            if (data.toString().includes('Done')) {
                console.log(pc.green(`  [CSS] Tailwind v4 engine active (${runner}).`));
            }
        });
    }

    // 3. Intelligent Server Engine Detection
    let runCmd = isBun ? "bun --watch src/index.js" : "npx nodemon src/index.js";
    
    spawn(runCmd, {
        stdio: "inherit",
        shell: true,
        cwd: process.cwd(),
    });
};
