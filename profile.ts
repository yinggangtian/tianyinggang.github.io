export const profile = {
  name: "Yinggang Tian",
  role: "AI Engineer",
  email: "ytia0059@student.monash.edu",
  github: "https://github.com/yinggangtian/",
  linkedin: "https://www.linkedin.com/in/yinggang-tian",
  avatar: "/images/avatar.jpg",
  webproject:"https://github.com/yinggangtian/tianyinggang.github.io",
  instagram:"https://www.instagram.com/tianyinggang/",
  introduction: {
    passion: "Passionate about applying machine learning and data science to solve real-world problems.",
    current: "Currently a master's student at Monash University."
  },

  experiences: [
    {
      title: "AUTOSAR Architect",
      company: "HL Mando",
      period: "2023 - 2025",
      location: "Suzhou, China",
      description: "Led algorithm design and prototype development for braking-related Advanced Driver Assistance Systems (ADAS). Developed perception and decision logic modules that integrate sensor inputs and produce braking decisions under real-time constraints; implemented core modules in C++/Python and collaborated with embedded teams for vehicle integration. Worked on dataset curation and annotation pipelines for scenario-driven testing; designed offline training/validation workflows and online evaluation metrics for braking scenarios. Performed runtime profiling and optimization to meet hard latency deadlines: identified CPU/GPU and I/O bottlenecks, applied algorithmic simplifications and pipeline optimizations to reduce inference latency; prepared artifacts for OTA/prototype deployment. Coordinated with system engineers on ECU interfacing, diagnostic logs, and safety checks; contributed design documents and verification reports.",
      logo: "/images/hl-mando-logo.png"
    },
    {
      title: "AUTOSAR Development",
      company: "Huawei",
      period: "2020 - 2022",
      location: "Suzhou, China",
      description: "Contributed to development of vehicle gateway platform: diagnostics, network management, software upgrade and routing modules. Independently developed a vehicle gateway product for Jiangling project - end-to-end development including detailed design, testing and documentation. Hands-on experience with CAN, Ethernet, TBOX comms, UDS diagnostics; familiar with Vector CANoe, Lauterbach, ZCANPro workflows.",
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
      title: "AI-Powered Interactive System Design and Implementation ",
      description: "Cloud-Deployed AI System: Designed scalable architecture for AI voice recognition API optimization using machine learning. Hardware Integration: Developed custom hardware circuits for AI voice recognition interaction systems. Advanced Neural Networks: Implemented and compared CNN vs RNN architectures for speaker recognition, establishing Bidirectional RNN (BRNN) as optimal network structure. Loss Function Optimization: Comprehensive analysis of 8 loss functions (Sigmoid Cross-Entropy, Softmax Loss, Triplet Loss, Center Loss, etc.) for speaker recognition performance. Framework Proficiency: Gained expertise in PyTorch and TensorFlow for deep learning implementation. Industry Practices: Applied DevOps and Agile development methodologies in research environment."
    },
    {
      title: "Microsoft Xiaoyuan COVID-19 Q&A Chatbot ",
      description: "Built comprehensive knowledge base for COVID-19 related inquiries during Wuhan outbreak. Deployed chatbot across WeChat and open-source communities. Core Technology: Microsoft Dialog Engine for intelligent pandemic response system."
    }
  ],
    education: [
    {
      degree: "Master of Artificial Intelligence",
      school: "Monash University",
      period: "2025 - Present",
      location: "Melbourne, Australia",
      logo: "/images/monash-logo.svg"
    },
    {
      degree: "Bachelor of Comminication Engineering",
      school: "Xi'AN MINGDE INSTITUTE OF TECHNOLOGY",
      period: "2016 - 2020",
      location: "Xi'An, China",
      logo: "/images/mingde-logo.png"
    }
  ],
} as const; 