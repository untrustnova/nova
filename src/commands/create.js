import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import prompts from "prompts";
import { printBanner } from "../utils/banner.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (projectNameArg) => {
    printBanner();

    let projectName = projectNameArg;
    if (!projectName) {
        const res = await prompts({
            type: "text",
            name: "name",
            message: pc.white("What is your galaxy named?"),
            initial: "nova-app",
            validate: (value) => value.trim().length > 0 ? true : "Galaxy name required!",
        });
        if (!res.name) process.exit(1);
        projectName = res.name.trim();
    }

    const answers = await prompts([
        { type: "select", name: "language", message: "Core Language", choices: [{ title: pc.blue("TypeScript"), value: "ts" }, { title: pc.yellow("JavaScript"), value: "js" }] },
        { type: "select", name: "framework", message: "UI Framework", choices: [{ title: pc.cyan("React"), value: "react" }, { title: pc.green("Vue"), value: "vue" }] },
        { type: "confirm", name: "includeAuth", message: "Include Auth + Dashboard?", initial: true },
        { type: "select", name: "orm", message: "Database / ORM", choices: [{ title: "Drizzle", value: "drizzle" }, { title: "Prisma", value: "prisma" }, { title: "MongoDB", value: "mongodb" }, { title: "Supabase", value: "supabase" }, { title: "None", value: "none" }] },
        { type: "select", name: "pkgManager", message: "Package Manager", choices: [{ title: pc.magenta("Bun"), value: "bun" }, { title: "NPM", value: "npm" }, { title: "PNPM", value: "pnpm" }] },
    ]);

    if (!answers.language) process.exit(1);

    const projectPath = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectPath)) { console.log(pc.red("  Error: Folder already exists!")); process.exit(1); }

    console.log(pc.white(`\n  🐺 Deploying ecosystem in ${pc.bold(projectName)}...`));

    // --- EXECUTION ---
    const dirs = ["src/actions", "src/controllers", "src/agents", "src/mcp", "src/registry", "src/messages", "src/policy", "src/middleware", "src/core", "src/utils", "web", "public/images", "public/css", "database/models", "database/migrations", "database/seeds"];
    dirs.forEach(d => fs.mkdirSync(path.join(projectPath, d), { recursive: true }));

    const templateDir = path.join(__dirname, "..", "templates");
    
    // Core SADA & Infrastructure
    const files = [
        ["index.js.template", "src/index.js"], ["dispatcher.js.template", "src/dispatcher.js"], ["registry.js.template", "src/registry/index.js"],
        ["messages.js.template", "src/messages/index.js"], ["policy.js.template", "src/policy/index.js"], ["welcome.js.template", "src/controllers/welcome.js"],
        ["plugins.js.template", "src/core/plugins.js"], ["utils/logger.js.template", "src/utils/logger.js"], ["utils/error-handler.js.template", "src/utils/error-handler.js"],
        ["utils/cache.js.template", "src/utils/cache.js"], ["utils/s3.js.template", "src/utils/s3.js"], ["docker/Dockerfile.template", "Dockerfile"],
        ["docker/docker-compose.yml.template", "docker-compose.yml"], ["nova-project-cli.js.template", "nova"], ["index.html.template", "public/index.html"],
        ["gitignore.template", ".gitignore"]
    ];
    files.forEach(([s, d]) => fs.copyFileSync(path.join(templateDir, s), path.join(projectPath, d)));

    if (answers.includeAuth) {
        fs.copyFileSync(path.join(templateDir, "controllers/auth.js.template"), path.join(projectPath, "src/controllers/auth.js"));
        fs.copyFileSync(path.join(templateDir, "controllers/register.js.template"), path.join(projectPath, "src/controllers/register.js"));
        fs.copyFileSync(path.join(templateDir, "middleware/auth.js.template"), path.join(projectPath, "src/middleware/auth.js"));
    }

    // SPA Selection
    if (answers.framework === "react") {
        fs.copyFileSync(path.join(templateDir, "dashboard/react/App.jsx"), path.join(projectPath, "web/App.jsx"));
        fs.copyFileSync(path.join(templateDir, "dashboard/react/main.jsx"), path.join(projectPath, "web/main.jsx"));
        fs.copyFileSync(path.join(templateDir, "dashboard/react/index.css.template"), path.join(projectPath, "web/index.css"));
    } else {
        fs.copyFileSync(path.join(templateDir, "dashboard/vue/App.vue"), path.join(projectPath, "web/App.vue"));
        fs.copyFileSync(path.join(templateDir, "dashboard/vue/main.js"), path.join(projectPath, "web/main.js"));
        fs.copyFileSync(path.join(templateDir, "dashboard/react/index.css.template"), path.join(projectPath, "web/index.css"));
    }

    // Assets
    const assetsDir = path.join(templateDir, "assets");
    ["nova.png", "nova-full.png", "nova-anime.png"].forEach(f => {
        if (fs.existsSync(path.join(assetsDir, f))) fs.copyFileSync(path.join(assetsDir, f), path.join(projectPath, "public/images", f));
    });

    // Config & Pkg
    const ext = answers.language === "ts" ? "ts" : "js";
    let cfg = fs.readFileSync(path.join(templateDir, "nova.config.js.template"), "utf8");
    let plgs = [answers.framework === 'react' ? 'plugins.react()' : 'plugins.vue()', 'plugins.tailwind()'];
    cfg = cfg.replace("{{APP_NAME}}", projectName).replace("{{LANGUAGE}}", answers.language).replace("{{ORM}}", answers.orm).replace("{{INCLUDE_AUTH}}", answers.includeAuth).replace("{{FRAMEWORK}}", answers.framework).replace("{{PLUGINS}}", plgs.join(",\n        "));
    fs.writeFileSync(path.join(projectPath, `nova.config.${ext}`), cfg);

    const env = `PORT=3000\nSEISHIRO_PASSKEY="nova_${Math.random().toString(36).substring(7)}"\nDATABASE_URL=""\n`;
    fs.writeFileSync(path.join(projectPath, ".env"), env);

    const pkg = { 
        name: projectName, 
        type: "module", 
        scripts: { dev: "nova dev", start: "node src/index.js" }, 
        dependencies: { 
            "dotenv": "latest", 
            "seishiro": "latest", 
            "picocolors": "latest", 
            "lucide-react": "latest", 
            "simple-icons": "latest",
            "gsap": "latest", 
            "framer-motion": "latest",
            "sonner": "latest"
        } 
    };
    if (answers.framework === "react") {
        Object.assign(pkg.dependencies, { "react": "latest", "react-dom": "latest" });
    } else {
        Object.assign(pkg.dependencies, { "vue": "latest", "lucide-vue-next": "latest" });
    }
    
    pkg.devDependencies = {};
    Object.assign(pkg.devDependencies, { "tailwindcss": "^4.0.0", "@tailwindcss/cli": "^4.0.0", "@tailwindcss/postcss": "^4.0.0", "postcss": "latest", "autoprefixer": "latest", "nodemon": "latest" });
    
    fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(pkg, null, 2));
    fs.chmodSync(path.join(projectPath, "nova"), "755");

    console.log(pc.green(`  [DONE] Project files initialized.`));

    // Auto Install
    console.log(pc.cyan(`\n  [INFO] Installing dependencies via ${answers.pkgManager}...`));
    try {
        execSync(`${answers.pkgManager} install`, { stdio: 'inherit', cwd: projectPath });
        console.log(pc.green(`\n  [SUCCESS] Created project: ${pc.bold(projectName)}`));
    } catch (e) { console.log(pc.yellow("\n  [WARN] Manual install required.")); }

    console.log(`\n  Next steps:`);
    console.log(`  cd ${projectName}`);
    console.log(`  nova dev\n`);
};
