export const aiData = {
  title: "Artificial Intelligence (AI)",
  description: "Grasp the AI landscape and learn how to integrate powerful AI tools into your daily professional workflows.",
  modules: [
    {
      id: "ai-mod-1",
      title: "Module 1: Artificial Intelligence Foundations",
      description: "Concepts & Use Cases. Target Outcome: Learner understands the AI landscape.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "ai1-v1", type: "video", title: "What is AI & Real-World Applications", duration: "15 mins", status: "unlocked" },
        { id: "ai1-p1", type: "ppt", title: "Understanding AI vs. ML vs. Deep Learning", duration: "12 Slides", status: "locked" },
        { id: "ai1-t1", type: "text", title: "Types of AI: Narrow, General, and Super", duration: "8 mins read", status: "locked" },
        { id: "ai1-t2", type: "text", title: "AI Ethics & Safety Basics", duration: "6 mins read", status: "locked" },
        { id: "ai1-q1", type: "quiz", title: "Level 1: AI Foundations Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "ai-mod-2",
      title: "Module 2: Applied AI (Daily Use)",
      description: "Using AI Tools for Productivity. Target Outcome: Learner can integrate AI into daily workflows.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "ai2-v1", type: "video", title: "Integrating AI Tools into Work & Business Workflows", duration: "20 mins", status: "locked" },
        { id: "ai2-v2", type: "video", title: "Using AI for Advanced Research & Data Analysis", duration: "18 mins", status: "locked" },
        { id: "ai2-p1", type: "ppt", title: "AI for Content Creation & Automation Basics", duration: "15 Slides", status: "locked" },
        { id: "ai2-t1", type: "text", title: "Top 10 AI Tools for Daily Professional Use", duration: "10 mins read", status: "locked" },
        { id: "ai2-q1", type: "quiz", title: "Level 2: Practical AI Integration Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};