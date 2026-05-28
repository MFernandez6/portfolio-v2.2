const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const {
  name,
  titleGeneral,
  location,
  email,
  phone,
  website,
  summaryGeneral,
  experienceGeneral,
  educationGeneral,
  renderJobs,
  renderEducationGeneral,
} = require("./resume-content");

async function generateResume() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Miguel Angel Fernandez - Resume</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 9px;
                line-height: 1.3;
                color: #1a1a1a;
                background: white;
                padding: 0;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: white;
            }
            
            .header {
                text-align: center;
                margin-bottom: 15px;
                position: relative;
            }
            
            .header::after {
                content: '';
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 2px;
                background: linear-gradient(90deg, #2563eb, #3b82f6);
                border-radius: 1px;
            }
            
            .name {
                font-size: 24px;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 4px;
                letter-spacing: -0.5px;
            }
            
            .title {
                font-size: 12px;
                font-weight: 500;
                color: #64748b;
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .contact-info {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
                font-size: 9px;
                color: #475569;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                gap: 3px;
            }
            
            .section {
                margin-bottom: 12px;
            }
            
            .section-title {
                font-size: 11px;
                font-weight: 600;
                color: #1e293b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
                padding-bottom: 4px;
                border-bottom: 1px solid #e2e8f0;
                position: relative;
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 20px;
                height: 1px;
                background: #2563eb;
            }
            
            .summary {
                font-size: 9px;
                line-height: 1.4;
                color: #475569;
                text-align: justify;
            }
            
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 8px;
            }
            
            .skill-category {
                background: #f8fafc;
                padding: 6px;
                border-radius: 4px;
                border-left: 2px solid #2563eb;
            }
            
            .skill-category h4 {
                font-size: 8px;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 3px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }
            
            .skill-list {
                font-size: 8px;
                color: #64748b;
                line-height: 1.2;
            }
            
            .job {
                margin-bottom: 10px;
                padding: 8px;
                background: #f8fafc;
                border-radius: 4px;
                border-left: 2px solid #2563eb;
            }
            
            .job-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 5px;
            }
            
            .job-title {
                font-size: 10px;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 2px;
            }
            
            .job-company {
                font-size: 8px;
                font-weight: 500;
                color: #2563eb;
            }
            
            .job-dates {
                font-size: 7px;
                color: #64748b;
                font-weight: 500;
                white-space: nowrap;
            }
            
            .job-description {
                font-size: 8px;
                color: #475569;
                line-height: 1.3;
            }
            
            .job-description ul {
                list-style: none;
                padding-left: 0;
            }
            
            .job-description li {
                position: relative;
                padding-left: 10px;
                margin-bottom: 2px;
            }
            
            .job-description li::before {
                content: '▸';
                position: absolute;
                left: 0;
                color: #2563eb;
                font-weight: bold;
                font-size: 7px;
            }
            
            .education-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 8px;
            }
            
            .education-item {
                background: #f8fafc;
                padding: 6px;
                border-radius: 4px;
                border-left: 2px solid #10b981;
            }
            
            .education-title {
                font-size: 9px;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 2px;
            }
            
            .education-school {
                font-size: 7px;
                color: #2563eb;
                font-weight: 500;
                margin-bottom: 2px;
            }
            
            .education-dates {
                font-size: 6px;
                color: #64748b;
                font-weight: 500;
                margin-bottom: 2px;
            }
            
            .education-details {
                font-size: 6px;
                color: #475569;
                line-height: 1.2;
            }
            
            .certification {
                background: linear-gradient(135deg, #fef3c7, #fde68a);
                padding: 6px;
                border-radius: 4px;
                border-left: 2px solid #f59e0b;
                margin-bottom: 8px;
            }
            
            .keywords {
                font-size: 6px;
                color: #94a3b8;
                margin-top: 15px;
                padding-top: 8px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
                line-height: 1.2;
            }
            
            .links-bar {
                display: flex;
                justify-content: center;
                gap: 18px;
                margin-bottom: 8px;
                font-size: 9px;
                color: #2563eb;
                font-weight: 500;
                flex-wrap: wrap;
            }
            .links-bar a {
                color: #2563eb;
                text-decoration: none;
                border-bottom: 1px dotted #2563eb;
                transition: color 0.2s;
            }
            .links-bar a:hover {
                color: #1e293b;
                border-bottom: 1px solid #1e293b;
            }
            .footer {
                text-align: center;
                font-size: 8px;
                color: #64748b;
                margin-top: 18px;
                border-top: 1px solid #e2e8f0;
                padding-top: 6px;
            }
            .footer .footer-title {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 2px;
            }
            .footer .footer-link {
                color: #2563eb;
                text-decoration: none;
                border-bottom: 1px dotted #2563eb;
                margin-left: 6px;
                font-weight: 500;
            }
            .footer .footer-link:hover {
                color: #1e293b;
                border-bottom: 1px solid #1e293b;
            }
            
            @media print {
                body {
                    font-size: 8px;
                }
                .container {
                    padding: 15px;
                }
                .job, .education-item, .skill-category {
                    break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="name">${name}</div>
                <div class="title">${titleGeneral}</div>
                <div class="contact-info">
                    <div class="contact-item">📍 ${location}</div>
                    <div class="contact-item">📧 ${email}</div>
                    <div class="contact-item">📱 ${phone}</div>
                    <div class="contact-item">🌐 ${website}</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="summary">${summaryGeneral}</div>
            </div>

            <div class="section">
                <div class="section-title">Education</div>
                <div class="education-grid">
                    ${renderEducationGeneral(educationGeneral)}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Professional Experience</div>
                ${renderJobs(experienceGeneral)}
            </div>

            <div class="section">
                <div class="section-title">Technical Skills</div>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Programming Languages</h4>
                        <div class="skill-list">JavaScript, Java, HTML, CSS, SQL, Python, TypeScript</div>
                    </div>
                    <div class="skill-category">
                        <h4>Frameworks & Tools</h4>
                        <div class="skill-list">React.js, Node.js, Spring Boot, Docker, Git, Jenkins, Next.js, Tailwind CSS</div>
                    </div>
                    <div class="skill-category">
                        <h4>Legal Technology</h4>
                        <div class="skill-list">Everlaw, KLDiscovery's Nebula, Thomson Reuters CoCounsel</div>
                    </div>
                    <div class="skill-category">
                        <h4>DevOps & CI/CD</h4>
                        <div class="skill-list">Jenkins, Agile/Scrum, UAT Environment Management</div>
                    </div>
                    <div class="skill-category">
                        <h4>Database & Cloud</h4>
                        <div class="skill-list">MySQL, PostgreSQL, AWS, Cloud Computing</div>
                    </div>
                    <div class="skill-category">
                        <h4>Languages</h4>
                        <div class="skill-list">English (Fluent), Spanish (Fluent)</div>
                    </div>
                </div>
            </div>

            <div class="keywords">
                KEYWORDS FOR ATS: Claims Adjuster, Florida 6-20 License, Property Claims, Coverage Analysis, Insurance Adjusting, Legal Technology, Software Engineering, Paralegal, Construction Defects, Insurance Defense, Cybersecurity, React.js, Litigation, Settlement Negotiation, Bilingual, Spanish, English
            </div>
            <div class="footer">
                <div class="footer-title">${titleGeneral}</div>
            </div>
        </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  await page.pdf({
    path: path.join(__dirname, "../public/resume.pdf"),
    format: "A4",
    margin: {
      top: "0.4in",
      right: "0.4in",
      bottom: "0.4in",
      left: "0.4in",
    },
    printBackground: true,
  });

  await browser.close();
  console.log("Resume PDF generated successfully!");
}

generateResume().catch(console.error);
