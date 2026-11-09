// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Sterin Paul",
  firstName: "STERIN",
  lastName: "PAUL",
  role: "Software Developer",
  location: "Kerala, India",
  timeZone: "Asia/Kolkata",
  currently: "Software Developer at Lifology",
  email: "sterinpaul@gmail.com",
  phone: "+91 9895815583",
  showPhone: false, // set to true to show the phone number in the contact section
  resume: "https://drive.google.com/uc?export=download&id=1PSAEwjYHyAXk853WjUweHdpkU7eiu3di",
  siteUrl: "https://sterinpaul.dev", // change to your real domain before deploying
  tagline:
    "Full-stack developer building real-time web and mobile products with Next.js, React Native and Node.js.",
  links: {
    linkedin: "https://www.linkedin.com/in/sterinpaul",
    github: "https://github.com/sterinpaul",
    leetcode: "https://leetcode.com/sterinpaul",
  },
  about: {
    lead:
      "I turn real-world requirements into fast, maintainable software - from real-time chat and video calls to payments and mobile apps.",
    body: [
      "I'm a software developer at Lifology in Trivandrum, contributing to application development, debugging and feature delivery alongside product and engineering teams.",
      "My path into engineering started in business - a B.Com and an MBA - so I care as much about the problem and the people using the product as I do about the code behind it.",
    ],
  },
  stats: [
    { value: "200+", label: "LeetCode problems solved" },
    { value: "50%+", label: "Code efficiency gained through optimisation at Techfriar" },
    { value: "4", label: "Featured products built across web and mobile" },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    company: "Lifology",
    role: "Software Developer",
    period: "May 2025 - Present",
    location: "Trivandrum, Kerala",
    current: true,
    points: [
      "Contributing to application development, debugging and feature delivery.",
      "Collaborating with product and engineering teams to build maintainable software aligned with business requirements.",
    ],
  },
  {
    company: "Techfriar",
    role: "Junior Software Developer",
    period: "Aug 2024 - Apr 2025",
    location: "Ernakulam, Kerala",
    points: [
      "Analysed customer requirements and translated them into new features for existing software applications.",
      "Reviewed project requirements to identify customer expectations, project scope and the resources needed to meet goals.",
      "Recommended workflow improvements and optimised code efficiency by over 50% through analysis and error correction.",
    ],
  },
];

export type Project = {
  name: string;
  kind: string;
  summary: string;
  points: string[];
  tags: string[];
  link: string;
  linkLabel: string;
  hue: number; // drives the colour of the project's cover art
};

// TIP: replace the GitHub profile links below with each project's repository URL.
export const projects: Project[] = [
  {
    name: "EventBuzzer",
    kind: "Event discovery app",
    summary:
      "A platform for discovering upcoming festivals, cultural events and community happenings - filterable by district, category, date and search.",
    points: [
      "Android app built with React Native and Expo: featured and trending events, category exploration and rich event details.",
      "Image galleries, sharing, map directions, Google Calendar integration and notification workflows.",
    ],
    tags: ["React Native", "Expo", "Google Calendar", "Maps", "Notifications"],
    link: "https://eventbuzzer.in",
    linkLabel: "eventbuzzer.in",
    hue: 82,
  },
  {
    name: "Pulz",
    kind: "Social media app",
    summary:
      "A real-time social platform with chat, notifications and video calling, plus admin tooling for moderation.",
    points: [
      "Real-time text, emoji and image chat and notifications with Socket.IO; video calls with PeerJS.",
      "JWT authentication, Redux state management, social interactions and admin dashboards for user and report management.",
    ],
    tags: ["Socket.IO", "PeerJS", "WebRTC", "Redux", "JWT"],
    link: "https://github.com/sterinpaul",
    linkLabel: "GitHub",
    hue: 265,
  },
  {
    name: "BigShopper",
    kind: "E-commerce app",
    summary:
      "A full-stack e-commerce application with payments, coupons and a complete admin back office.",
    points: [
      "Built with Node.js, Express and MongoDB with Razorpay payment integration.",
      "Product listing, cart, discount coupons, checkout and orders, plus admin management for inventory, users, categories and coupons.",
    ],
    tags: ["Node.js", "Express", "MongoDB", "Razorpay"],
    link: "https://github.com/sterinpaul",
    linkLabel: "GitHub",
    hue: 22,
  },
  {
    name: "ProManage",
    kind: "Task manager app",
    summary:
      "A task management tool designed for scalable team workflows with fine-grained access control.",
    points: [
      "Role-based authentication with permission management.",
      "Drag-and-drop task management and dynamic header configuration.",
    ],
    tags: ["Role-based auth", "Permissions", "Drag & drop"],
    link: "https://github.com/sterinpaul",
    linkLabel: "GitHub",
    hue: 190,
  },
];

export const skills = {
  "Technical stack": ["Next.js", "React", "React Native", "Node.js", "Express", "MongoDB", "PostgreSQL", "Strapi"],
  Languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
  "Tools & practices": [
    "Git", "Docker", "AWS", "Microsoft Azure", "REST", "GraphQL", "WebSocket", "WebRTC",
    "Redux", "Recoil", "TanStack Query", "JWT", "Tailwind CSS", "Ant Design", "Bootstrap", "Jira", "Agile",
  ],
} as const;

export const education = [
  { degree: "MBA", school: "Chinmaya Institute of Management and Technology, Thrissur", period: "2013 - 2015" },
  { degree: "B.Com", school: "Co-operative College of Arts and Sciences, Thrissur", period: "2009 - 2012" },
];
