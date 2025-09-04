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
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }
            
            .container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #1e40af, #3b82f6, #1e40af);
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
                width: 80px;
                height: 3px;
                background: linear-gradient(90deg, #1e40af, #3b82f6, #1e40af);
                border-radius: 2px;
                box-shadow: 0 2px 4px rgba(30, 64, 175, 0.3);
            }
            
            .name {
                font-size: 28px;
                font-weight: 800;
                color: #1e293b;
                margin-bottom: 6px;
                letter-spacing: -0.8px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .title {
                font-size: 14px;
                font-weight: 600;
                color: #1e40af;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
                background: linear-gradient(90deg, #1e40af, #3b82f6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
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
                font-size: 12px;
                font-weight: 700;
                color: #1e293b;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 10px;
                padding-bottom: 6px;
                border-bottom: 2px solid #e2e8f0;
                position: relative;
                background: white;
                padding: 8px 12px;
                border-radius: 6px 6px 0 0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 12px;
                width: 30px;
                height: 2px;
                background: linear-gradient(90deg, #1e40af, #3b82f6);
                border-radius: 1px;
                box-shadow: 0 1px 2px rgba(30, 64, 175, 0.3);
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
                background: white;
                padding: 10px;
                border-radius: 8px;
                border-left: 4px solid #1e40af;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
                transition: all 0.3s ease;
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
                margin-bottom: 12px;
                padding: 12px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #1e40af;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
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
                color: #1e40af;
            }
            
            .job-dates {
                font-size: 7px;
                color: #64748b;
                font-weight: 700;
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
                color: #1e40af;
                font-weight: bold;
                font-size: 7px;
            }
            
            .education-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 6px;
            }
            
            .education-item {
                background: white;
                padding: 8px;
                border-radius: 6px;
                border-left: 3px solid #10b981;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
                transition: all 0.3s ease;
            }
            
            .education-title {
                font-size: 8px;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 2px;
            }
            
            .education-school {
                font-size: 6px;
                color: #1e40af;
                font-weight: 500;
                margin-bottom: 2px;
            }
            
            .education-dates {
                font-size: 5px;
                color: #64748b;
                font-weight: 700;
                margin-bottom: 2px;
            }
            
            .education-details {
                font-size: 5px;
                color: #475569;
                line-height: 1.1;
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
                color: #1e40af;
                font-weight: 500;
                flex-wrap: wrap;
            }
            .links-bar a {
                color: #1e40af;
                text-decoration: none;
                border-bottom: 1px dotted #1e40af;
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
                color: #1e40af;
                text-decoration: none;
                border-bottom: 1px dotted #1e40af;
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
