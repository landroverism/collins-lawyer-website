/**
 * This script runs `npx @convex-dev/auth` to help with setting up
 * environment variables for Convex Auth.
 *
 * You can safely delete it and remove it from package.json scripts.
 */

import fs from "fs";
import { config as loadEnvFile } from "dotenv";
import { spawnSync } from "child_process";
import { createDefaultAdmin } from "./convex/auth.js";
import { ConvexHttpClient } from "convex/browser";

if (!fs.existsSync(".env.local")) {
  // Something is off, skip the script.
  process.exit(0);
}

const config = {};
loadEnvFile({ path: ".env.local", processEnv: config });

const runOnceWorkflow = process.argv.includes("--once");

if (runOnceWorkflow && config.SETUP_SCRIPT_RAN !== undefined) {
  // The script has already ran once, skip.
  process.exit(0);
}

const result = spawnSync("npx", ["@convex-dev/auth", "--skip-git-check"], {
  stdio: "inherit",
});

if (runOnceWorkflow) {
  fs.writeFileSync(".env.local", `
SETUP_SCRIPT_RAN=1
`, { flag: "a" });
}

const client = new ConvexHttpClient("http://localhost:8181"); // Replace with your Convex server URL

try {
  await client.mutation(createDefaultAdmin)();
  console.log("Default admin user ensured.");
} catch (error) {
  console.error("Failed to create default admin user:", error);
}

process.exit(result.status);