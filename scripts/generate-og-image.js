const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function generateOGImage() {
  try {
    // Read the SVG file
    const svgPath = path.join(__dirname, "../public/og-image.svg");
    const svgContent = fs.readFileSync(svgPath, "utf8");

    // Create HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>OG Image</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            width: 1200px; 
            height: 630px; 
            overflow: hidden;
        }
        svg { 
            width: 1200px; 
            height: 630px; 
            display: block;
        }
    </style>
</head>
<body>
    ${svgContent}
</body>
</html>
`;

    // Write the HTML file
    const htmlPath = path.join(__dirname, "../public/og-image.html");
    fs.writeFileSync(htmlPath, htmlContent);

    // Launch browser and take screenshot
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(htmlContent);

    // Wait for any fonts to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Take screenshot
    const pngPath = path.join(__dirname, "../public/og-image.png");
    await page.screenshot({
      path: pngPath,
      width: 1200,
      height: 630,
      type: "png",
    });

    await browser.close();

    console.log("✅ OG Image generated successfully!");
    console.log(`📁 PNG saved to: ${pngPath}`);
    console.log(`📁 HTML saved to: ${htmlPath}`);

    // Clean up HTML file
    fs.unlinkSync(htmlPath);
    console.log("🧹 Cleaned up temporary HTML file");
  } catch (error) {
    console.error("❌ Error generating OG image:", error);
    process.exit(1);
  }
}

generateOGImage();
