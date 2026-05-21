"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const router = express_1.default.Router();
const BROWSER_PATH = "/usr/bin/google-chrome";
router.get("/pdf", async (req, res) => {
    const targetUrl = req.query.url || "https://example.com";
    let browser;
    try {
        // Launch using the explicit executable path
        browser = await puppeteer_core_1.default.launch({
            executablePath: BROWSER_PATH,
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for many server environments
        });
        const page = await browser.newPage();
        await page.goto(targetUrl.toString(), { waitUntil: "networkidle0" });
        const screenshot = await page.screenshot({ type: "png" });
        res.contentType("image/png");
        res.send(screenshot);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to capture screenshot");
    }
    finally {
        if (browser)
            await browser.close();
    }
});
exports.default = router;
