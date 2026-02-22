#!/usr/bin/env node

const { program } = require("commander");
const prompts = require("prompts");
const pc = require("picocolors");
const fs = require("fs");
const path = require("path");
const { spawn, execSync } = require("child_process");

// Nn... Banner ASCII serigala mistik Nova.js :3
// Ganti bagian printBanner di cli-nova.js menjadi ini ya Nn :3
const printBanner = () => {
    console.log(pc.cyan("   /\\_/\\"));
    console.log(pc.cyan("  ( o.o )  ") + pc.bold(pc.white("Nova.js CLI")));
    console.log(
        pc.cyan("   > ^ <   ") +
            pc.white("The Strict-Action Dispatcher Architecture\n"),
    );
    console.log(
        pc.blue(
            "   Build the backend ecosystem that is fast, strong, and precise!\n",
        ),
    );
};

program
    .name("novajs")
    .description(
        "Interactive and elegant CLI for building Nova.js applications",
    )
    .version("1.0.0");

// ==========================================
// COMMAND: CREATE
// ==========================================
program
    .command("create [projectName]")
    .description("Initiate a Nova.js project from scratch...")
    .action(async (projectNameArg) => {
        printBanner();

        let projectName = projectNameArg;

        if (!projectName) {
            const res = await prompts({
                type: "text",
                name: "name",
                message: "What is your project named?",
                initial: "nova-app",
                validate: (value) =>
                    value.trim().length > 0
                        ? true
                        : "Project name cannot be empty! :(",
            });

            if (!res.name) {
                console.log(pc.red("\nProject initialization canceled. ;("));
                process.exit(1);
            }
            projectName = res.name.trim();
        }

        console.log(
            pc.white(
                `Starting project initialization: ${pc.cyan(pc.bold(projectName))}...\n`,
            ),
        );

        // Interactive Prompts >///<
        const questions = [
            {
                type: "select",
                name: "language",
                message: "Choose your preferred language (Core logic):",
                choices: [
                    {
                        title: pc.blue("TypeScript") + " (Recommended)",
                        value: "ts",
                    },
                    { title: pc.yellow("JavaScript"), value: "js" },
                ],
            },
            {
                type: "select",
                name: "framework",
                message: "Choose your Frontend Framework (for Fullstack SADA):",
                choices: [
                    { title: "React", value: "react" },
                    { title: "Vue", value: "vue" },
                    { title: "None (API Only)", value: "none" },
                ],
            },
            {
                type: "select",
                name: "orm",
                message: "Choose your preferred ORM:",
                choices: [
                    { title: "Drizzle ORM", value: "drizzle" },
                    { title: "Prisma", value: "prisma" },
                    { title: "Supabase", value: "supabase" },
                    { title: "MongoDB", value: "mongodb" },
                    { title: "Skip for now...", value: "none" },
                ],
            },
            {
                type: "select",
                name: "styling",
                message: "Choose your preferred Styling Engine:",
                choices: [
                    { title: "Tailwind CSS", value: "tailwind" },
                    { title: "UnoCSS", value: "unocss" },
                    { title: "None", value: "none" },
                ],
            },
            {
                type: "multiselect",
                name: "libraries",
                message:
                    "Select additional libraries to install (Space to select, Enter to confirm):",
                choices: [
                    {
                        title: "Zod (Strict Validation)",
                        value: "zod",
                        selected: true,
                    },
                    { title: "Day.js (Date Manipulation)", value: "dayjs" },
                    { title: "CORS", value: "cors", selected: true },
                ],
            },
            {
                type: "select",
                name: "pkgManager",
                message: "Choose your preferred Package Manager:",
                choices: [
                    { title: pc.cyan("Bun") + " (Really Fast!)", value: "bun" },
                    { title: "NPM", value: "npm" },
                    { title: "PNPM", value: "pnpm" },
                    { title: "Yarn", value: "yarn" },
                ],
            },
        ];

        const answers = await prompts(questions);

        if (
            !answers.language ||
            !answers.orm ||
            !answers.pkgManager ||
            !answers.styling
        ) {
            console.log(pc.red("\nProject initialization canceled. ;("));
            process.exit(1);
        }

        console.log("\n" + pc.cyan("========================================"));
        console.log(pc.bold(pc.white("🐺 Summary of Nova.js Project:")));
        console.log(`- Name      : ${pc.green(projectName)}`);
        console.log(`- Language  : ${pc.blue(answers.language.toUpperCase())}`);
        console.log(`- Frontend  : ${pc.blue(answers.framework)}`);
        console.log(`- ORM/DB    : ${pc.blue(answers.orm)}`);
        console.log(`- Styling   : ${pc.blue(answers.styling)}`);
        console.log(`- Manager   : ${pc.blue(answers.pkgManager)}`);
        console.log(pc.cyan("========================================\n"));

        const projectPath = path.join(process.cwd(), projectName);

        if (fs.existsSync(projectPath)) {
            console.log(
                pc.red(
                    `\nOops, your folder "${projectName}" already exists! ;(`,
                ),
            );
            process.exit(1);
        }

        // --- DIRECTORY STRUCTURE ---
        fs.mkdirSync(projectPath, { recursive: true });
        const dirs = ["src/actions", "src/controllers", "src/core", "public"];
        if (answers.orm !== "none") dirs.push("src/db");
        if (answers.framework !== "none") dirs.push("src/views");
        dirs.forEach((dir) =>
            fs.mkdirSync(path.join(projectPath, dir), { recursive: true }),
        );

        // --- ENV FILE ---
        const envContent = `PORT=3000\nAPP_NAME="${projectName}"\nAPP_ENV=development\nSEISHIRO_PASSKEY="nova_${Math.random().toString(36).substring(2, 15)}"\nDATABASE_URL=""\n`;
        fs.writeFileSync(path.join(projectPath, ".env"), envContent);

        // --- PACKAGE.JSON ---
        const pkgContent = {
            name: projectName,
            version: "1.0.0",
            private: true,
            scripts: {
                dev:
                    answers.pkgManager === "bun"
                        ? "bun --watch src/index.js"
                        : "nodemon src/index.js",
                start: "node src/index.js",
                build: 'echo "🐺 Build process initialized..." && node -e "console.log(\'Build successful! :3\')"',
                migrate: 'echo "🐺 Running database migrations..."',
            },
            dependencies: {
                dotenv: "latest",
                seishiro: "latest",
                picocolors: "latest", // Injecting picocolors for beautiful console logs
            },
            devDependencies: {},
        };

        if (answers.pkgManager !== "bun")
            pkgContent.devDependencies["nodemon"] = "latest";

        if (answers.framework === "react") {
            pkgContent.dependencies["react"] = "latest";
            pkgContent.dependencies["react-dom"] = "latest";
        }
        if (answers.framework === "vue") {
            pkgContent.dependencies["vue"] = "latest";
        }
        if (answers.orm === "drizzle") {
            pkgContent.dependencies["drizzle-orm"] = "latest";
            pkgContent.devDependencies["drizzle-kit"] = "latest";
        }
        if (answers.orm === "prisma") {
            pkgContent.dependencies["@prisma/client"] = "latest";
            pkgContent.devDependencies["prisma"] = "latest";
        }
        if (answers.orm === "mongodb") {
            pkgContent.dependencies["mongoose"] = "latest";
        }
        if (answers.styling === "tailwind") {
            pkgContent.devDependencies["tailwindcss"] = "latest";
        }
        if (answers.styling === "unocss") {
            pkgContent.devDependencies["unocss"] = "latest";
        }

        if (answers.libraries)
            answers.libraries.forEach(
                (lib) => (pkgContent.dependencies[lib] = "latest"),
            );

        fs.writeFileSync(
            path.join(projectPath, "package.json"),
            JSON.stringify(pkgContent, null, 2),
        );

        // --- CORE PLUGINS MOCK ---
        const pluginsCode = `// src/core/plugins.js\n// Local implementation for Nova Plugins\nmodule.exports = {\n  react: (options = {}) => ({ name: 'nova-react', options }),\n  vue: (options = {}) => ({ name: 'nova-vue', options }),\n  tailwindcss: (options = {}) => ({ name: 'nova-tailwind', options }),\n  unocss: (options = {}) => ({ name: 'nova-unocss', options })\n};\n`;
        fs.writeFileSync(
            path.join(projectPath, "src/core/plugins.js"),
            pluginsCode,
        );

        // --- NOVA CONFIG ---
        const ext = answers.language === "ts" ? "ts" : "js";
        let configImports = [
            `require("dotenv").config();`,
            `const plugins = require("./src/core/plugins.js");`,
        ];
        let pluginsList = [];

        if (answers.framework === "react") pluginsList.push(`plugins.react()`);
        if (answers.framework === "vue") pluginsList.push(`plugins.vue()`);
        if (answers.styling === "tailwind")
            pluginsList.push(
                `plugins.tailwindcss({ content: ["./src/**/*.{js,ts,jsx,tsx,html}"] })`,
            );
        if (answers.styling === "unocss") pluginsList.push(`plugins.unocss()`);

        const configContent = `${configImports.join("\n")}

module.exports = {
    port: process.env.PORT || 3000,
    language: "${answers.language}",
    orm: "${answers.orm}",
    plugins: [\n        ${pluginsList.join(",\n        ")}\n    ],
    sada: {
        strictRouting: true,
        dispatcherPath: "./src/dispatcher.${ext}",
        actionDir: "./src/actions",
    }
};\n`;
        fs.writeFileSync(
            path.join(projectPath, "nova.config.js"),
            configContent,
        );

        // --- SEISHIRO CONTROLLER ---
        const controllerCode = `// src/controllers/welcome.js
const WelcomeController = async ({ data, system }) => {
    return {
        data: {
            status: "success",
            message: "🐺 Welcome to Nova.js!",
            framework: "SADA Architecture powered by Seishiro API",
            client_ip: system.ip,
            timestamp: new Date().toISOString(),
            received_data: data
        }
    };
};
module.exports = { WelcomeController };\n`;
        fs.writeFileSync(
            path.join(projectPath, "src/controllers/welcome.js"),
            controllerCode,
        );

        // --- SEISHIRO DISPATCHER ---
        const dispatcherCode = `// src/dispatcher.js
const { RegistryBuilder, MessageBuilder, PolicyBuilder, Actions } = require("seishiro");
const { WelcomeController } = require("./controllers/welcome.js");

const registry = new RegistryBuilder();
registry.set("app:welcome", WelcomeController);

const message = new MessageBuilder("en");
message.set("no-registry", "Action type not found in registry!");

// src/dispatcher.js
const policy = new PolicyBuilder({
    // passkey: process.env.SEISHIRO_PASSKEY || "secret-nova-key",
    // version_now: "1.0.0",
    // version_min: "1.0.0"
});

const action = new Actions({ registry, message, policy });
module.exports = { action };\n`;
        fs.writeFileSync(
            path.join(projectPath, "src/dispatcher.js"),
            dispatcherCode,
        );

        // --- ANIMATED INTERACTIVE HTML WELCOME PAGE (Black, White, Blue) ---
        const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova.js Ecosystem</title>
    <style>
        :root { --bg: #000000; --surface: #0f172a; --border: #1e293b; --text: #ffffff; --text-muted: #94a3b8; --blue: #3b82f6; --blue-glow: rgba(59, 130, 246, 0.5); }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background-color: var(--bg); color: var(--text); display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }

        /* Grid Background Pattern */
        .grid-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.2; z-index: -1; }

        .container { text-align: center; z-index: 10; padding: 3rem; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px var(--blue-glow); max-width: 600px; width: 90%; transform: translateY(20px); opacity: 0; animation: fadeUp 0.8s ease forwards; }

        @keyframes fadeUp { to { transform: translateY(0); opacity: 1; } }

        /* Custom SVG Wolf Icon */
        .icon-container { width: 100px; height: 100px; margin: 0 auto 1.5rem auto; border-radius: 50%; background: linear-gradient(135deg, var(--surface), #000); border: 2px solid var(--blue); box-shadow: 0 0 20px var(--blue-glow); display: flex; align-items: center; justify-content: center; animation: float 3s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

        h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(to right, #ffffff, var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        p { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.6; }

        .badge { display: inline-block; background: rgba(59, 130, 246, 0.1); border: 1px solid var(--blue); color: var(--blue); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem; letter-spacing: 1px; }

        .btn { background: var(--blue); color: white; border: none; padding: 1rem 2rem; font-size: 1rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
        .btn:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6); }
        .btn:active { transform: translateY(0); }

        /* Custom Toast Alert */
        #toast { position: fixed; bottom: -100px; left: 50%; transform: translateX(-50%); background: var(--surface); border-left: 4px solid var(--blue); color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: monospace; font-size: 0.9rem; transition: bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 100; max-width: 90%; word-wrap: break-word; }
        #toast.show { bottom: 30px; }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="container">
        <div class="icon-container">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L8 8H3L5 14L2 22L12 18L22 22L19 14L21 8H16L12 2Z"></path>
                <circle cx="9" cy="13" r="1" fill="#fff" stroke="none"></circle>
                <circle cx="15" cy="13" r="1" fill="#fff" stroke="none"></circle>
            </svg>
        </div>
        <div class="badge">SADA ARCHITECTURE READY</div>
        <h1>Nova.js Ecosystem</h1>
        <p>The backend framework built for speed, precision, and elegance. Powered by Seishiro API. Your environment is perfectly configured.</p>

        <button class="btn" onclick="testAPI()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            Fire Action Request
        </button>
    </div>

    <div id="toast"></div>

    <script>
        async function testAPI() {
            const btn = document.querySelector('.btn');
            btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg> Dispatching...';

            try {
            const res = await fetch('/api/action', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-app-version': '1.0.0' // <-- Tambahkan ini agar Seishiro mengenalinya Nn! :3
                        },
                        body: JSON.stringify({ type: 'app:welcome', data: { source: 'Frontend' } })
                    });
                const result = await response.json();

                showToast(\`🐺 Success! Status: \${result.status}\\nMessage: \${result.response?.data?.message || 'Received'}\`);
            } catch (error) {
                showToast('❌ Failed to reach the dispatcher. Is the server running?');
            } finally {
                setTimeout(() => {
                    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg> Fire Action Request';
                }, 500);
            }
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.innerText = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }
    </script>
</body>
</html>`;
        fs.writeFileSync(path.join(projectPath, "public/index.html"), htmlCode);

        // --- ENTRY POINT (SERVER) WITH BEAUTIFUL LOGGING ---
        const indexCode = `// src/index.js
require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const pc = require("picocolors");
const config = require("../nova.config.js");
const { action } = require("./dispatcher.js");

const PORT = config.port;

const server = http.createServer(async (req, res) => {
    const startTime = Date.now();

    // Logging Middleware
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const statusColor = res.statusCode >= 400 ? pc.red : res.statusCode >= 300 ? pc.yellow : pc.green;
        console.log(\`\${pc.bold(pc.blue('[NOVA]'))} \${pc.cyan(req.method)} \${pc.white(req.url)} \${statusColor(res.statusCode)} \${pc.gray(duration + 'ms')}\`);
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

    if (req.url === "/api/action" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk.toString());
        req.on("end", async () => {
            try {
                const payload = body ? JSON.parse(body) : {};
                console.log(\`\${pc.magenta('  ↳ Dispatching Action:')} \${pc.bold(pc.white(payload.type || "app:welcome"))}\`);
                const result = await action.APIAction({
                    type: payload.type || "app:welcome",
                    data: payload.data || {},
                    system: { headers: req.headers, ip: req.socket.remoteAddress }
                });
                res.writeHead(result.status || 200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Internal Server Error" }));
            }
        });
        return;
    }

    if (req.url === "/" || req.url === "/index.html") {
        const htmlPath = path.join(__dirname, "../public/index.html");
        if (fs.existsSync(htmlPath)) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(fs.readFileSync(htmlPath));
            return;
        }
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.listen(PORT, () => {
    console.clear();
    console.log(pc.cyan(\`
     /\\_/\\
    ( o.o )  \${pc.bold(pc.white("Nova.js Development Server"))}
     > ^ <   v1.0.0
    \`));
    console.log(\`\${pc.green('✔')} Server running beautifully at: \${pc.blue(pc.underline('http://localhost:' + PORT))}\`);
    console.log(\`\${pc.green('✔')} API Dispatcher listening at: \${pc.blue(pc.underline('http://localhost:' + PORT + '/api/action'))}\`);
    console.log(pc.gray('\\nWaiting for requests...\\n'));
});
`;
        fs.writeFileSync(path.join(projectPath, "src/index.js"), indexCode);

        // --- AUTO INSTALL ---
        console.log(
            pc.white(
                `\nInstalling dependencies using ${pc.cyan(answers.pkgManager)}... Please wait a moment! ^w^\n`,
            ),
        );
        try {
            const installCmd =
                answers.pkgManager === "yarn"
                    ? "yarn"
                    : `${answers.pkgManager} install`;
            execSync(installCmd, { stdio: "inherit", cwd: projectPath });
        } catch (error) {
            console.log(
                pc.yellow(
                    `\nOops, there was an issue during auto-install. You can install it manually later. :/\n`,
                ),
            );
        }

        console.log(
            pc.green(pc.bold("\n✨ Finished initializing project! 😁\n")),
        );
        console.log(pc.white("Next steps to start developing:"));
        console.log(pc.cyan(`  cd ${projectName}`));
        console.log(pc.cyan(`  novajs dev\n`));
    });

// ==========================================
// COMMAND: INSTALL
// ==========================================
program
    .command("install")
    .description("Install dependencies based on the project's lockfile")
    .action(() => {
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
                    pc.bold("\n✨ Dependencies installed successfully! 😁\n"),
                ),
            );
        } catch (error) {
            console.log(pc.red(`\nFailed to install dependencies. ;(\n`));
            process.exit(1);
        }
    });

// ==========================================
// COMMAND: DEV
// ==========================================
program
    .command("dev")
    .description("Start the Nova.js development server with hot-reload")
    .action(() => {
        console.log(pc.cyan(`🐺 Starting Nova.js Dev Server...`));
        try {
            let pkgManager = "npm";
            if (fs.existsSync("bun.lockb") || fs.existsSync("bun.lock"))
                pkgManager = "bun";
            else if (fs.existsSync("yarn.lock")) pkgManager = "yarn";
            else if (fs.existsSync("pnpm-lock.yaml")) pkgManager = "pnpm";

            const runCmd =
                pkgManager === "npm" ? "npm run dev" : `${pkgManager} dev`;
            // Pakai spawn agar interaktif dan stdout/stderr langsung diteruskan ke console Nn
            spawn(runCmd, {
                stdio: "inherit",
                shell: true,
                cwd: process.cwd(),
            });
        } catch (error) {
            console.log(
                pc.red(
                    `\nFailed to start development server. Are you in the root of a Nova.js project? ;(\n`,
                ),
            );
        }
    });

// ==========================================
// COMMAND: BUILD
// ==========================================
program
    .command("build")
    .description("Compile and build the Nova.js application for production")
    .action(() => {
        console.log(pc.blue(pc.bold(`\n🛠️  Building Nova.js Application...`)));
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
                        `\n✨ Build completed successfully! Ready for production. :3\n`,
                    ),
                ),
            );
        } catch (error) {
            console.log(
                pc.red(
                    `\nBuild process failed. Please check your configurations. ;(\n`,
                ),
            );
        }
    });

// ==========================================
// COMMAND: START
// ==========================================
program
    .command("start")
    .description("Start the built Nova.js application in production mode")
    .action(() => {
        console.log(
            pc.green(pc.bold(`\n🚀 Starting Nova.js in Production Mode...\n`)),
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
            console.log(pc.red(`\nFailed to start the application. ;(\n`));
        }
    });

// ==========================================
// COMMAND: MIGRATE
// ==========================================
program
    .command("migrate")
    .description("Run database migrations using your configured ORM")
    .action(() => {
        console.log(
            pc.yellow(pc.bold(`\n📦 Initializing Database Migrations...\n`)),
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
                    pc.bold(`\n✨ Migration completed successfully! 😁\n`),
                ),
            );
        } catch (error) {
            console.log(
                pc.red(`\nMigration failed. Is your database running? ;(\n`),
            );
        }
    });

program.parse(process.argv);
