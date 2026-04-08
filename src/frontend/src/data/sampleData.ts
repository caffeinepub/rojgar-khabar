import type { BreakingNewsItem, ImportantLink, Post } from "../types";

export const SAMPLE_POSTS: Post[] = [
  {
    id: "post-1",
    title: "Bihar Police Constable Recruitment 2026 - 12000 Posts",
    summary:
      "Bihar Police has released the official notification for constable recruitment 2026. A total of 12,000 vacancies are available for eligible candidates across Bihar. Last date to apply online is 30 April 2026.",
    content:
      "<h2>Bihar Police Constable Recruitment 2026 – Complete Details</h2><p>The Bihar Police Department has officially released the recruitment notification for 12,000 Constable posts in 2026.</p><h3>Important Dates</h3><ul><li><strong>Application Start:</strong> 10 March 2026</li><li><strong>Last Date:</strong> 30 April 2026</li><li><strong>Admit Card:</strong> June 2026</li><li><strong>Exam Date:</strong> July 2026</li></ul><h3>Eligibility</h3><ul><li>Education: 12th Pass</li><li>Age: 18-25 years</li></ul><h3>Application Fee</h3><ul><li>General/OBC: ₹75</li><li>SC/ST: ₹25</li></ul>",
    category: "Latest Jobs",
    featuredImageUrl: "/assets/generated/post-police-constable.dim_600x300.jpg",
    applyLink: "https://bpssc.bih.nic.in",
    tags: ["Bihar Police", "Constable", "Government Job", "12th Pass"],
    publishedAt: BigInt(Date.now() * 1000000),
    isPublished: true,
  },
  {
    id: "post-2",
    title: "BPSC 70th CCE Admit Card 2026 Released - Download Now",
    summary:
      "BPSC has released the admit card for the 70th Combined Competitive Examination 2026. Candidates can now download their hall ticket from the official BPSC website.",
    content:
      "<h2>BPSC 70th CCE Admit Card 2026</h2><p>The Bihar Public Service Commission has officially released the admit card for 70th CCE 2026.</p><h3>Exam Date</h3><p>05 April 2026, 12:00 PM - 2:00 PM</p><h3>How to Download</h3><ol><li>Visit bpsc.bih.nic.in</li><li>Click on Download Admit Card</li><li>Enter Registration Number and DOB</li><li>Download and print</li></ol><h3>Documents Required</h3><ul><li>Printed Admit Card</li><li>Valid Photo ID</li><li>Two passport photos</li></ul>",
    category: "Admit Card",
    featuredImageUrl: "/assets/generated/post-bpsc-admit-card.dim_600x300.jpg",
    applyLink: "https://bpsc.bih.nic.in",
    tags: ["BPSC", "Admit Card", "70th CCE", "Hall Ticket"],
    publishedAt: BigInt((Date.now() - 86400000) * 1000000),
    isPublished: true,
  },
  {
    id: "post-3",
    title: "Bihar Board 10th Result 2026 - Check Your Score Now",
    summary:
      "Bihar Board Matric Result 2026 has been declared. Over 16 lakh students appeared for the exam. Check result on the official Bihar Board website with roll number.",
    content:
      "<h2>Bihar Board 10th Result 2026 Declared</h2><p>The Bihar School Examination Board has declared the Matric Result 2026. Over 16 lakh students can now check their results online.</p><h3>Statistics</h3><ul><li>Students Appeared: 16,85,432</li><li>Overall Pass: 79.88%</li><li>Girls Pass: 82.34%</li></ul><h3>How to Check</h3><ol><li>Visit biharboardonline.bihar.gov.in</li><li>Enter Roll Number and DOB</li><li>Click Submit</li></ol>",
    category: "Results",
    featuredImageUrl:
      "/assets/generated/post-bihar-board-result.dim_600x300.jpg",
    applyLink: "https://biharboardonline.bihar.gov.in",
    tags: ["Bihar Board", "10th Result", "Matric", "BSEB"],
    publishedAt: BigInt((Date.now() - 172800000) * 1000000),
    isPublished: true,
  },
  {
    id: "post-4",
    title: "Mukhyamantri Kanya Utthan Yojana 2026 - Apply Online",
    summary:
      "Bihar government has launched Mukhyamantri Kanya Utthan Yojana 2026. Financial assistance of ₹50,000 provided to girl students who pass graduation. Apply on official portal.",
    content:
      "<h2>Mukhyamantri Kanya Utthan Yojana 2026</h2><p>Bihar Government has launched the scheme with enhanced benefits for girl students pursuing higher education.</p><h3>Benefits</h3><ul><li>₹50,000 on passing graduation</li><li>₹25,000 on passing intermediate</li><li>₹10,000 on passing matriculation</li><li>Free sanitary napkins for class 1-12</li></ul><h3>Eligibility</h3><ul><li>Permanent resident of Bihar</li><li>Girl student who passed graduation</li><li>Family income below ₹3 lakh/year</li><li>Must be unmarried at time of application</li></ul><h3>Apply At</h3><p>Visit edudbt.bih.nic.in and register with Aadhaar number.</p>",
    category: "Government Schemes",
    featuredImageUrl:
      "/assets/generated/post-kanya-utthan-yojana.dim_600x300.jpg",
    applyLink: "https://edudbt.bih.nic.in",
    tags: ["Kanya Utthan Yojana", "Girl Education", "Bihar Scheme"],
    publishedAt: BigInt((Date.now() - 259200000) * 1000000),
    isPublished: true,
  },
  {
    id: "post-5",
    title: "Bihar Post Matric Scholarship 2026 - Apply Before Last Date",
    summary:
      "Bihar Social Welfare Department invites applications for Post Matric Scholarship 2026. SC, ST, OBC, EBC students eligible. Last date: 31 May 2026.",
    content:
      "<h2>Bihar Post Matric Scholarship 2026</h2><p>The Bihar Social Welfare Department has invited applications for Post Matric Scholarship 2026 for SC, ST, OBC, EBC students.</p><h3>Scholarship Amount</h3><ul><li>SC/ST: ₹1,200/month + book allowance</li><li>OBC: ₹1,000/month + book allowance</li><li>EBC: ₹800/month + book allowance</li></ul><h3>Important Dates</h3><ul><li>Application Start: 01 February 2026</li><li>Last Date: 31 May 2026</li></ul><h3>Apply At</h3><p>Visit pmsonline.bih.nic.in and register as new student.</p>",
    category: "Scholarships",
    featuredImageUrl: "/assets/generated/post-scholarship.dim_600x300.jpg",
    applyLink: "https://pmsonline.bih.nic.in",
    tags: ["Scholarship", "Bihar", "SC ST OBC", "Post Matric"],
    publishedAt: BigInt((Date.now() - 345600000) * 1000000),
    isPublished: true,
  },
];

export const SAMPLE_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: "bn-1",
    text: "Bihar Police Constable 2026 Notification Released - 12000 Posts Available - Apply Now",
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    id: "bn-2",
    text: "BPSC 70th CCE Admit Card 2026 Available for Download - Check Official Website",
    createdAt: BigInt((Date.now() - 3600000) * 1000000),
  },
  {
    id: "bn-3",
    text: "CM Kisan Samman Nidhi Yojana 2026 - New Registration Open - Apply Before 30 April",
    createdAt: BigInt((Date.now() - 7200000) * 1000000),
  },
];

export const SAMPLE_IMPORTANT_LINKS: ImportantLink[] = [
  {
    id: "link-1",
    title: "Bihar Government Official Site",
    url: "https://state.bihar.gov.in",
    category: "Government",
  },
  {
    id: "link-2",
    title: "BPSC Official Website",
    url: "https://bpsc.bih.nic.in",
    category: "Jobs",
  },
  {
    id: "link-3",
    title: "Bihar Board Official",
    url: "https://biharboardonline.bihar.gov.in",
    category: "Education",
  },
  {
    id: "link-4",
    title: "Bihar Police Recruitment",
    url: "https://bpssc.bih.nic.in",
    category: "Jobs",
  },
  {
    id: "link-5",
    title: "SSPMIS Bihar Pension Portal",
    url: "https://sspmis.bihar.gov.in",
    category: "Schemes",
  },
];

export const CATEGORIES = [
  "Latest Jobs",
  "Admit Card",
  "Results",
  "Answer Keys",
  "Government Schemes",
  "Scholarships",
];
