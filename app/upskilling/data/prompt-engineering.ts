export const promptEngineeringData = {
  title: "Prompt Engineering",
  description: "Master structured AI communication. Design optimized, high-performance prompts for professional systems.",
  modules: [
    {
      id: "prompt-mod-1",
      title: "Module 1: Prompt Engineering Foundations",
      description: "Structured AI Communication. Target Outcome: Learner understands structured prompting techniques.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "pe1-v1", type: "video", title: "What is Prompting & The Anatomy of a Good Prompt", duration: "14 mins", status: "unlocked" },
        { id: "pe1-p1", type: "ppt", title: "Zero-Shot vs. Few-Shot Prompting Explained", duration: "10 Slides", status: "locked" },
        { id: "pe1-t1", type: "text", title: "The Rules of Prompt Clarity & Context", duration: "7 mins read", status: "locked" },
        { id: "pe1-v2", type: "video", title: "Role Prompting & System Instructions", duration: "12 mins", status: "locked" },
        { id: "pe1-q1", type: "quiz", title: "Level 1: Prompt Foundations Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "prompt-mod-2",
      title: "Module 2: Advanced Prompt Design (Daily Use)",
      description: "High-Performance AI Interaction Systems. Target Outcome: Learner can design optimized AI prompts for professional use.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "pe2-v1", type: "video", title: "Chain-of-Thought Prompting & Complex Logic", duration: "20 mins", status: "locked" },
        { id: "pe2-p1", type: "ppt", title: "High-Performance Prompt Frameworks (e.g., CREATE, RACE)", duration: "15 Slides", status: "locked" },
        { id: "pe2-t1", type: "text", title: "Iterative Optimization & Debugging AI Outputs", duration: "10 mins read", status: "locked" },
        { id: "pe2-v2", type: "video", title: "Designing AI Workflows & Building Prompt Libraries", duration: "22 mins", status: "locked" },
        { id: "pe2-q1", type: "quiz", title: "Level 2: Advanced Prompt Engineering Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};