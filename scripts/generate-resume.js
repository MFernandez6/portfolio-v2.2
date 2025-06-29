const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

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
                <div class="name">Miguel Angel Fernandez</div>
                <div class="title">Legal Professional & Software Engineer</div>
                <div class="contact-info">
                    <div class="contact-item">📍 Miami-Dade County, Florida</div>
                    <div class="contact-item">📧 MiguelFernandez023@gmail.com</div>
                    <div class="contact-item">📱 (786) 417-3869</div>
                    <div class="contact-item">🌐 MiguelAngelFernandez.com</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="summary">
                    Bilingual legal tech specialist and software engineer with extensive experience in both law and technology. Proven track record in leveraging AI and modern software to streamline legal workflows, support high-stakes litigation, and deliver business value. Experienced in implementing legal tech solutions, conducting document analysis, and bridging the gap between legal expertise and innovative technology.
                </div>
            </div>

            <div class="section">
                <div class="section-title">Education</div>
                
                <div class="certification">
                    <div class="education-title">CompTIA Security+ Certification</div>
                    <div class="education-dates">Anticipated Completion: July 2025</div>
                    <div class="education-details">Industry-standard cybersecurity certification covering network security, compliance, and operational security</div>
                </div>

                <div class="education-grid">
                    <div class="education-item">
                        <div class="education-title">Associate of Science in Cybersecurity</div>
                        <div class="education-school">Miami Dade College</div>
                        <div class="education-dates">May 2024 - August 2025</div>
                        <div class="education-details">Second associate degree. Coursework: Network Security, Digital Forensics, Ethical Hacking, Cybersecurity Fundamentals, Incident Response</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Certificate in Full-Stack Web Development</div>
                        <div class="education-school">University of Miami</div>
                        <div class="education-dates">September 2019 - March 2020</div>
                        <div class="education-details">HTML, CSS, JavaScript, Node.js, SQL, Java, Docker, Git, Spring Boot</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Master of Science in Law and Policy</div>
                        <div class="education-school">Nova Southeastern University</div>
                        <div class="education-dates">September 2015 - September 2017</div>
                        <div class="education-details">Magna Cum Laude; 3.78 GPA | Administrative Law, Immigration Law, Federal Privacy Law</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Law School (First Year)</div>
                        <div class="education-school">Barry University School of Law | Orlando, FL</div>
                        <div class="education-dates">August 2014 - August 2015</div>
                        <div class="education-details">Completed first year without failing any classes. Transitioned to Master's program.</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Certificate in Paralegal Studies</div>
                        <div class="education-school">University of Miami</div>
                        <div class="education-dates">June 2013 - December 2013</div>
                        <div class="education-details">Legal research, document preparation, civil procedure, and paralegal ethics</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Bachelor of Science in Political Science</div>
                        <div class="education-school">Florida State University</div>
                        <div class="education-dates">January 2009 - August 2011</div>
                        <div class="education-details">American government, international relations, political theory, and research methods</div>
                    </div>

                    <div class="education-item">
                        <div class="education-title">Associate of Arts in Political Science</div>
                        <div class="education-school">Miami Dade College</div>
                        <div class="education-dates">August 2006 - December 2008</div>
                        <div class="education-details">General education and political science foundation courses</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Professional Experience</div>
                
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
                            <li>Construction defects paralegal supporting complex litigation involving building code violations, structural issues, and construction negligence</li>
                            <li>Implement and maintain legal tech solutions including Everlaw, KLDiscovery's Nebula, and Thomson Reuters CoCounsel to streamline workflows and enhance efficiency</li>
                            <li>Leverage AI software to analyze extensive document productions using targeted prompts for rapid insights</li>
                            <li>Support associates and partners in trial prep, depositions, and legal strategy development</li>
                            <li>Manage complex construction defect litigation cases and coordinate with multiple stakeholders</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Software Engineer Consultant</div>
                            <div class="job-company">FDM Group | Remote</div>
                        </div>
                        <div class="job-dates">June 2022 - June 2023</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Created and implemented UI/UX designs using React.js, Node, and Java</li>
                            <li>Managed SDLC of software components through to production</li>
                            <li>Experienced in CI/CD tools (Jenkins) and DevOps for UAT environments</li>
                            <li>Worked in Agile/Scrum teams and participated in code reviews</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">FDM Consultant (Software Engineer)</div>
                            <div class="job-company">Deutsche Bank | Cary, NC</div>
                        </div>
                        <div class="job-dates">November 2022 - April 2023</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Selected by Deutsche Bank to support mobile corporate banking development team</li>
                            <li>Engaged with stakeholders and simplified technical procedures for improved understanding</li>
                            <li>Wrote, tested, and maintained code; identified and fixed bugs in software</li>
                            <li>Collaborated with senior engineers and project managers to deliver high-quality solutions</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Corporate Paralegal</div>
                            <div class="job-company">Wood & Associate | Miami, FL</div>
                        </div>
                        <div class="job-dates">February 2019 - May 2022</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>First-party insurance defense firm specializing in property damage, business interruption, and insurance coverage disputes</li>
                            <li>Prepared proposals for settlements, propounded named insured and AOB discovery</li>
                            <li>Drafted motions, pleadings, and legal memoranda for complex insurance litigation matters</li>
                            <li>Conducted legal research on insurance law, coverage issues, and regulatory compliance requirements</li>
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
                            <li>Premier New York personal injury law firm specializing in catastrophic injuries, medical malpractice, and complex litigation</li>
                            <li>Communicated with opposing counsel, judicial assistants, and court reporters across multiple jurisdictions</li>
                            <li>Prepared summons, complaints, and legal demands for high-value personal injury and medical negligence cases</li>
                            <li>Assisted in case management, document review, and trial preparation for complex litigation matters</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Paralegal</div>
                            <div class="job-company">Nunez Law | Miami, FL</div>
                        </div>
                        <div class="job-dates">March 2016 - May 2017</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Plaintiff's personal injury law firm specializing in auto accidents, slip and falls, and medical negligence cases</li>
                            <li>Managed case files, prepared legal documents, and coordinated with clients and medical providers</li>
                            <li>Assisted in discovery processes, document review, and trial preparation for complex personal injury litigation</li>
                            <li>Conducted client intake interviews and maintained detailed case documentation and medical records</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Law Clerk</div>
                            <div class="job-company">Diaz-Arguelles & Tejedor | Miami, FL</div>
                        </div>
                        <div class="job-dates">June 2015 - December 2015</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Plaintiff's personal injury firm specializing in medical malpractice and complex healthcare litigation</li>
                            <li>Conducted legal research on medical standards of care, expert witness qualifications, and case law</li>
                            <li>Worked as a law clerk while attending law school, gaining hands-on experience in high-stakes medical negligence cases</li>
                            <li>Assisted attorneys in preparing for depositions, expert witness interviews, and trial strategy development</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Paralegal</div>
                            <div class="job-company">Pollack & Rosen | Miami, FL</div>
                        </div>
                        <div class="job-dates">January 2014 - May 2014</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>One of Florida's largest collections law firms providing comprehensive collection services nationwide</li>
                            <li>Managed high-volume debt collection cases across multiple jurisdictions and industries</li>
                            <li>Prepared legal documents for collection proceedings, including complaints, motions, and settlement agreements</li>
                        </ul>
                    </div>
                </div>

                <div class="job">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Calendar Clerk</div>
                            <div class="job-company">Gonzalez & Associate | Miami, FL</div>
                        </div>
                        <div class="job-dates">February 2013 - December 2013</div>
                    </div>
                    <div class="job-description">
                        <ul>
                            <li>Plaintiff's personal injury law firm calendar clerk managing court deadlines and attorney schedules</li>
                            <li>Coordinated court appearances, depositions, mediations, and client meetings across multiple cases</li>
                            <li>Maintained accurate case calendars and ensured compliance with court deadlines and procedural requirements</li>
                        </ul>
                    </div>
                </div>
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
                KEYWORDS FOR ATS: Legal Technology, Software Engineering, Paralegal, Legal Research, Document Analysis, AI, React.js, Node.js, Java, Insurance Defense, Personal Injury, Medical Malpractice, Collections, Construction Defects, Litigation, Case Management, Trial Preparation, Discovery, Legal Documents, Compliance, Cybersecurity, DevOps, CI/CD, Agile, Scrum, Bilingual, Spanish, English
            </div>
            <div class="footer">
                <div class="footer-title">Legal Professional & Software Engineer</div>
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
