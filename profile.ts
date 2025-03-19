export const profile = {
  name: "Yinggang Tian",
  role: "Data Science Researcher",
  email: "yinggang.tian@monash.edu",
  github: "https://github.com/tianyinggang",
  linkedin: "https://www.linkedin.com/in/yinggang-tian",
  avatar: "/images/avatar.jpg",
  webproject:"https://github.com/tianyinggang/webproject",
  instagram:"https://www.instagram.com/tianyinggang",
  introduction: {
    passion: "Passionate about applying machine learning and data science to solve real-world problems.",
    current: "Currently pursuing research at Monash University."
  },
  education: [
    {
      degree: "Master of Data Science",
      school: "Monash University",
      period: "2023 - Present",
      location: "Melbourne, Australia",
      logo: "/images/monash-logo.svg"
    },
    {
      degree: "Master of Data Science",
      school: "Monash University",
      period: "2023 - Present",
      location: "Melbourne, Australia",
      logo: "/images/monash-logo.svg"
    }
  ],
  experiences: [
    {
      title: "AUTOSAR Architect",
      company: "HL Mando",
      period: "2021 - 2023",
      location: "Shanghai, China",
      description: "Led AUTOSAR architecture design and implementation for autonomous driving systems.",
      logo: "/images/hl-mando-logo.png"
    },
    {
      title: "AUTOSAR Development",
      company: "Huawei",
      period: "2019 - 2021",
      location: "Shanghai, China",
      description: "Developed AUTOSAR-based software solutions for intelligent vehicles.",
      logo: "/images/huawei-logo.png"
    },
    {
      title: "Software Engineer",
      company: "Sercomm",
      period: "2018 - 2019",
      location: "Suzhou, China",
      description: "Developed embedded software for IoT devices.",
      logo: "/images/sercomm-logo.png"
    },
    {
      title: "Full Stack Development Engineer",
      company: "Microsoft",
      period: "2017 - 2018",
      location: "Suzhou, China",
      description: "Developed web applications using .NET and React.",
      logo: "/images/microsoft-logo.png"
    }
  ],
  research: [
    {
      title: "Machine Learning in Healthcare",
      description: "Focusing on applying advanced machine learning techniques to solve healthcare challenges."
    },
    {
      title: "Machine Learning in Healthcare",
      description: "Focusing on applying advanced machine learning techniques to solve healthcare challenges."
    }
  ]
} as const; 