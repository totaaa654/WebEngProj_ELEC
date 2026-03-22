const base = "/departments/CPE"; // public folder path

export const CPE = {
  code: "CPE",
  title: "COMPUTER ENGINEERING",
  subtitle: "Bachelor of Science in Computer Engineering",



  theme: { accentHex: "#2563eb" },

  images: {
    heroLeft: `${base}/hero-left.png`,
    heroBig: `${base}/hero-big.png`,
    heroSmall1: `${base}/hero-small-1.png`,
    heroSmall2: `${base}/hero-small-2.png`,
    peo: `${base}/`,
    watermark: `${base}/watermark.png`,
  },

  hero: {
    university: "Bulacan State University • College of Engineering",
    description: "The Bachelor of Science in Computer Engineering program builds competence in embedded systems, hardware-software integration, and network infrastructure through high-impact research and industry-aligned practice.",
    stats: [
      { label: "AACCUP accreditation", value: "Level II", highlight: true },
      { label: "Proposed Units", value: "182", highlight: false },
      { label: "Engineering Excellence", value: "Top 10", highlight: false }
    ]
  },

  links: {
    explore: "#",
    performance: "#"
  },

  programOverview: {
    heading: "Program Overview",
    text: "EDIT ME: Computer Engineering program overview.",
    stats: { nonTeaching: 111, faculty: 22, students: 333 },
  },

  peo: {
    title: "Program Educational Objectives",
    subtitle: "EDIT ME: subtitle",
    bullets: [
      "To equip the graduates with a strong foundation in the basic physical and engineering sciences which could be a tool in planning, designing, development, management, and maintenance of computer systems.",
      "To prepare graduates to lead in the design, analysis and applications of hardware and software computing structures for professional Computer Engineering career.",
      "To arm the graduates to be knowledgeable of human, financial, physical and resource management and equip them with essential graduate research skills, specializing in one of the Computer Engineering fields.",
      "To promote the holistic growth of the graduates by providing them with opportunities to enhance not only their vocational skills but also their life perspectives and value-system.",
      "To develop critical thinking and scientific inquiry through active participation and research endeavors.",
      "To promote a strong sense of nationalism through productive involvement in extension and community outreach programs."
    ],
  },

  so: {
    title: "Student Outcomes",
    subtitle: "By the time of graduation, the students of the Computer Engineering program shall have the ability to:",
    outcomes: [
      { title: "SO 1", text: "Apply knowledge of mathematics and science to solve complex engineering problems;" },
      { title: "SO 2", text: "Design and conduct experiments, as well as to analyze and interpret data;" },
      { title: "SO 3", text: "Design a system, component or process to meet desired needs with realistic constraints such as economic, environmental, social, political, ethical, health and safety, manufacturability, and sustainability, in accordance with standards;" },
      { title: "SO 4", text: "Function on multidisciplinary teams;" },
      { title: "SO 5", text: "Identify, formulate, and solve complex engineering problems;" },
      { title: "SO 6", text: "Understand the professional and ethical responsibility;" },
      { title: "SO 7", text: "Communicate effectively;" },
      { title: "SO 8", text: "Have a broad education necessary to understand the impact of engineering solutions in a global, economic, environmental, and societal context;" },
      { title: "SO 9", text: "Recognition of the need for, and an ability to engage in life-long learning;" },
      { title: "SO 10", text: "Knowledge of contemporary issues;" },
      { title: "SO 11", text: "Use techniques, skills and modern engineering tools necessary for engineering practices;" },
      { title: "SO 12", text: "Have a knowledge of understanding of engineering and management principles as a member and leader in a team, to manage projects and in multidisciplinary environments." },
    ],
  },

  curriculum: {
    title: "Curriculum Overview",
    text: "The BSCpE curriculum at BulSU transitioned to a four-year program in 2018. It is designed to balance general engineering sciences, hardware-software integration, and professional specialization.",
    bullets: ["Mathematics & Sciences: Calculus (1 & 2), Differential Equations, Physics for Engineers, and Chemistry.",
       "Core Engineering: Programming Logic & Design, Computer Fundamentals, and Circuits.",
        "Major/Professional Courses: Digital Logic Design, Operating Systems, Computer Architecture, Data Communications and Networking, and Microprocessors.",
        "Capstone/Thesis: A significant portion of the final years is dedicated to a design project or undergraduate thesis (similar to your current pork freshness project).",
      
      ],  
  },

  laboratories: {
    title: "Laboratories",
    items: ["Materials Lab", "Surveying Lab", "Hydraulics Lab"],
  },

  faculty: {
    title: "Faculty",
    members: [
      { name: "Engr. Maria Lorena SP. Villena", role: "Program Chair, Faculty" },
      { name: "Engr. Alexander M. Aquino", role: "Faculty" },
      { name: "Dr. Lech Walesa M. Navarra", role: "Faculty" },
      { name: "Engr. Bernard G. Yasay ", role: "Faculty" },
      { name: "Engr. Catherine V. Dela Cruz", role: "Faculty" },
      { name: "Engr. Richard Y. Dela Cruz ", role: "Faculty" },
      { name: "Dr. Ma. Magdalena V. Gatdula", role: "University Registrar, Faculty" },
      { name: "Dr. Monaliza S. Jimenez", role: "Faculty" },
      { name: "Engr. Julius Vincent M. Abanel ", role: "Part-Time Instructor, Faculty" },
      { name: "Engr. Hiroyoshi  DG. Arai", role: "Part-Time Instructor, Faculty" },
      { name: "Engr. Robert Justin S. Chavez", role: "Faculty" },
      { name: "Engr. Albert C. Cruz Jr.", role: "Part-Time Instructor, Faculty" },
      { name: "Engr. Maria Ana G. Dangan", role: "Guest Lecturer, Faculty" },
      { name: "Engr. Sheila May M. Liwag", role: "Guest Lecturer, Faculty" },

    ],
  },

  careers: {
    title: "Career Opportunities",
    subtitle: "EDIT ME: careers subtitle.",
    cards: [
      { icon: "🏗️", title: "Site Engineer", text: "Description..." },
      { icon: "📐", title: "Structural Engineer", text: "Description..." },
      { icon: "🌉", title: "Project Engineer", text: "Description..." },
    ],
  },
};
