import express , { Request, Response, NextFunction } from 'express';
import puppeteer from 'puppeteer-core';

const router = express.Router();
const BROWSER_PATH = '/usr/bin/google-chrome'; 


router.get("/pdf", async (req, res) => {
  const targetUrl = req.query.url || 'https://example.com';
    let browser;

    try {
        // Launch using the explicit executable path
        browser = await puppeteer.launch({
            executablePath: BROWSER_PATH,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for many server environments
        });

        const page = await browser.newPage();
        await page.goto(targetUrl.toString(), { waitUntil: 'networkidle0' });
        
        const screenshot = await page.screenshot({ type: 'png' });
        
        res.contentType('image/png');
        res.send(screenshot);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to capture screenshot');
    } finally {
        if (browser) await browser.close();
    }
});


export default router;