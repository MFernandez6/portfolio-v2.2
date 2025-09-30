const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generateInsuranceResume() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Miguel Angel Fernandez - Insurance Adjusting Resume</title>
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
                line-height: 1.35;
                color: #000000;
                background: white;
                padding: 0;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: white;
                border-radius: 0;
                box-shadow: none;
                position: relative;
                overflow: visible;
            }
            
            .container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 0;
                background: none;
            }
            
            .header {
                text-align: center;
                margin-bottom: 12px;
                position: relative;
            }
            
            .header::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                background: none;
                border-radius: 0;
                box-shadow: none;
            }
            
            .name {
                font-size: 24px;
                font-weight: 800;
                color: #000000;
                margin-bottom: 4px;
                letter-spacing: -0.5px;
                text-shadow: none;
            }
            
            .title {
                font-size: 12px;
                font-weight: 600;
                color: #000000;
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
            }
            
            .contact-info {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
                font-size: 9px;
                color: #000000;
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
                font-weight: 800;
                color: #000000;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 8px;
                padding-bottom: 4px;
                border-bottom: 1px solid #000000;
                position: relative;
                background: none;
                padding: 0;
                border-radius: 0;
                box-shadow: none;
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 0;
                background: none;
                border-radius: 0;
                box-shadow: none;
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
                background: none;
                padding: 0;
                border-radius: 0;
                border-left: none;
                box-shadow: none;
                transition: none;
            }
            
            .skill-category h4 {
                font-size: 8px;
                font-weight: 700;
                color: #000000;
                margin-bottom: 3px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }
            
            .skill-list {
                font-size: 8px;
                color: #000000;
                line-height: 1.3;
            }
            
            .job {
                margin-bottom: 10px;
                padding: 0;
                background: none;
                border-radius: 0;
                border-left: none;
                box-shadow: none;
                transition: none;
            }
            
            .job-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 5px;
            }
            
            .job-title {
                font-size: 10px;
                font-weight: 700;
                color: #000000;
                margin-bottom: 2px;
            }
            
            .job-company {
                font-size: 8px;
                font-weight: 500;
                color: #000000;
            }
            
            .job-dates {
                font-size: 7px;
                color: #000000;
                font-weight: 700;
                white-space: nowrap;
            }
            
            .job-description {
                font-size: 8px;
                color: #000000;
                line-height: 1.35;
            }
            
            .job-description ul {
                list-style: disc;
                padding-left: 14px;
            }
            
            .job-description li {
                position: relative;
                padding-left: 10px;
                margin-bottom: 2px;
            }
            
            .job-description li::before {
                content: '';
                position: static;
                left: auto;
                color: #000000;
                font-weight: normal;
                font-size: 0;
            }
            
            .education-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 6px;
            }
            
            .education-item {
                background: none;
                padding: 0;
                border-radius: 0;
                border-left: none;
                box-shadow: none;
                transition: none;
            }
            
            .education-title {
                font-size: 8px;
                font-weight: 700;
                color: #000000;
                margin-bottom: 2px;
            }
            
            .education-school {
                font-size: 6px;
                color: #000000;
                font-weight: 500;
                margin-bottom: 2px;
            }
            
            .education-dates {
                font-size: 5px;
                color: #000000;
                font-weight: 700;
                margin-bottom: 2px;
            }
            
            .education-details {
                font-size: 5px;
                color: #000000;
                line-height: 1.2;
            }
            
            .keywords {
                font-size: 6px;
                color: #000000;
                margin-top: 15px;
                padding-top: 8px;
                border-top: 1px solid #000000;
                text-align: center;
                line-height: 1.2;
            }

            .license-item {
                font-size: 9px;
                color: #000000;
                font-weight: 700;
                margin-bottom: 8px;
            }
            
            .links-bar {
                display: flex;
                justify-content: center;
                gap: 18px;
                margin-bottom: 8px;
                font-size: 9px;
                color: #000000;
                font-weight: 500;
                flex-wrap: wrap;
            }
            .links-bar a {
                color: #000000;
                text-decoration: none;
                border-bottom: 1px dotted #000000;
                transition: color 0.2s;
            }
            .links-bar a:hover {
                color: #000000;
                border-bottom: 1px solid #000000;
            }
            .footer {
                text-align: center;
                font-size: 8px;
                color: #000000;
                margin-top: 18px;
                border-top: 1px solid #000000;
                padding-top: 6px;
            }
            .footer .footer-title {
                font-weight: 600;
                color: #000000;
                margin-bottom: 2px;
            }
            .footer .footer-link {
                color: #000000;
                text-decoration: none;
                border-bottom: 1px dotted #000000;
                margin-left: 6px;
                font-weight: 500;
            }
            .footer .footer-link:hover {
                color: #000000;
                border-bottom: 1px solid #000000;
            }
            
            @media print {
                body {
                    font-size: 8px;
                }
                .container {
                    padding: 15px;
                }
                .job, .education-item, .skill-category, .license-item {
                    break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="name">Miguel Angel Fernandez</div>
                <div class="title">Insurance Claims Specialist & Legal Professional</div>
                <div class="contact-info">
                    <div class="contact-item">📍 Miami-Dade County, Florida</div>
                    <div class="contact-item">📧 MiguelFernandez023@gmail.com</div>
                    <div class="contact-item">📱 (786) 417-3869</div>
                    <div class="contact-item">🌐 MiguelAngelFernandez.com</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Licenses</div>
                <div class="license-item">Florida 6-20 Adjuster License No. G279764</div>
            </div>

            <div class="section">
                <div class="section-title">Insurance & Legal Experience</div>
                
                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Construction Defects Paralegal</div>
                            <div class="job-company">Cole Scott & Kissane | Miami, FL</div>
                        </div>
                        <div class="job-dates">September 2023 - Present</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Specialized in construction defects litigation involving building code violations, structural damage, and property insurance claims</li>
                            <li>Analyzed complex insurance policies and coverage issues for construction defect claims and property damage disputes</li>
                            <li>Conducted detailed claim assessments and coordinated with expert witnesses and insurance adjusters</li>
                            <li>Managed high-volume of construction defect cases</li>
                            <li>Implemented advanced legal technology solutions for efficient claim processing and document analysis</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Corporate Paralegal - Insurance Defense</div>
                            <div class="job-company">Wood & Associate | Miami, FL</div>
                        </div>
                        <div class="job-dates">February 2019 - May 2022</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>First-party insurance defense firm specializing in property damage, and coverage disputes</li>
                            <li>Prepared comprehensive settlement proposals and conducted thorough insurance policy analysis</li>
                            <li>Drafted legal memoranda on insurance coverage issues</li>
                            <li>Conducted detailed claim investigations and coordinated with insurance adjusters</li>
                            <li>Managed complex insurance litigation matters with focus on coverage disputes and claim resolution</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Litigation Paralegal</div>
                            <div class="job-company">Pollack Pollack Isaac & DeCicco | New York, NY</div>
                        </div>
                        <div class="job-dates">July 2017 - January 2019</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Premier personal injury firm handling premises liability and bodily injury claims</li>
                            <li>Prepared discovery requests and responses based on claim representations</li>
                            <li>Conducted comprehensive claim investigations and analyzed insurance coverage for complex cases</li>
                            <li>Assisted in client intake and trial preparation related to insurance disputes</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Personal Injury Paralegal</div>
                            <div class="job-company">Nunez Law | Miami, FL</div>
                        </div>
                        <div class="job-dates">March 2016 - May 2017</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Plaintiff's personal injury firm specializing in motor vehicle collisions, and slip and falls</li>
                            <li>Managed insurance claim files and coordinated with insurance adjusters and property damage experts</li>
                            <li>Conducted detailed claim investigations and prepared comprehensive property damage assessments</li>
                            <li>Assisted in insurance coverage analysis and settlement negotiations for property damage claims</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Personal Injury & Medical Malpractice Paralegal</div>
                            <div class="job-company">Diaz-Arguelles & Tejedor | Orlando, FL</div>
                        </div>
                        <div class="job-dates">June 2015 - December 2015</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Specialized in medical malpractice cases involving insurance coverage disputes and claim analysis</li>
                            <li>Conducted detailed investigations of insurance policies and coverage issues for medical negligence claims</li>
                            <li>Coordinated with insurance adjusters and expert witnesses for comprehensive claim evaluation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Education & Certifications</div>
                
                <div class="education-grid">
                    <div class="education-item">
                        <div class="education-title">AdjustPro Pre-Licensing Course</div>
                        <div class="education-school">AdjustPro Training</div>
                        <div class="education-dates">Completed 2025</div>
                        <div class="education-details">Florida Certified Adjuster Pre-Licensing Course - Fulfills DFS prerequisites for 6-20 Resident, 3-20 Public Adjuster, and 30-20 Public Adjuster Apprentice licenses.</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Associate of Science in Cybersecurity</div>
                        <div class="education-school">Miami Dade College</div>
                        <div class="education-dates">May 2024 - August 2025</div>
                        <div class="education-details">Network Security, Digital Forensics, Incident Response, Risk Assessment</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Bachelor of Science in Political Science</div>
                        <div class="education-school">Florida State University</div>
                        <div class="education-dates">January 2009 - August 2011</div>
                        <div class="education-details">American government, policy analysis, and regulatory frameworks</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Master of Science in Law and Policy</div>
                        <div class="education-school">Nova Southeastern University</div>
                        <div class="education-dates">September 2015 - September 2017</div>
                        <div class="education-details">Magna Cum Laude; 3.78 GPA | Administrative Law, Federal Privacy Law, Regulatory Compliance</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Insurance Skills</div>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Insurance Expertise</h4>
                        <div class="skill-list">Property Damage Assessment, Coverage Analysis, Claims Investigation, Settlement Negotiation, Policy Interpretation</div>
                    </div>
                    <div class="skill-category">
                        <h4>Legal Technology</h4>
                        <div class="skill-list">Everlaw, KLDiscovery's Nebula, Thomson Reuters CoCounsel, Document Analysis, AI-Assisted Review</div>
                    </div>

                    <div class="skill-category">
                        <h4>Specialized Knowledge</h4>
                        <div class="skill-list">Construction Defects, First-Party Insurance, Business Interruption, Regulatory Compliance, Risk Assessment</div>
                    </div>
                    <div class="skill-category">
                        <h4>Languages</h4>
                        <div class="skill-list">English (Fluent), Spanish (Fluent)</div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div class="keywords">
                    KEYWORDS FOR ATS: Insurance Claims, Property Damage, Coverage Analysis, Claims Investigation, Settlement Negotiation, Construction Defects, First-Party Insurance, Business Interruption, Policy Interpretation, Claims Processing, Risk Assessment, Legal Technology, Document Analysis, Regulatory Compliance, Bilingual, Spanish, English
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  await page.pdf({
    path: path.join(__dirname, "../public/insurance-resume.pdf"),
    format: "A4",
    margin: {
      top: "0.3in",
      right: "0.3in",
      bottom: "0.3in",
      left: "0.3in",
    },
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });

  await browser.close();
  console.log("Insurance Resume PDF generated successfully!");
}

generateInsuranceResume().catch(console.error);
