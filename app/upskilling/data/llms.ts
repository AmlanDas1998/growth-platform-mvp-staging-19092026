export const llmsData = {
  title: "Large Language Models (LLMs)",
  description: "Learn the core architecture of LLMs and how to strategically integrate them into business applications.",
  modules: [
    {
      id: "llm-mod-1",
      title: "Module 1: LLM Architecture & Core Principles",
      description: "Foundational Mechanics. Target Outcome: Learner understands how LLMs function.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "llm1-v1", type: "video", title: "What is an LLM & The Transformers Architecture", duration: "18 mins", status: "unlocked" },
        { id: "llm1-t1", type: "text", title: "Understanding Tokens and Context Windows", duration: "7 mins read", status: "locked" },
        { id: "llm1-p1", type: "ppt", title: "Pre-training vs. Fine-tuning Explained", duration: "12 Slides", status: "locked" },
        { id: "llm1-t2", type: "text", title: "Hallucinations & Current LLM Limitations", duration: "8 mins read", status: "locked" },
        { id: "llm1-q1", type: "quiz", title: "Level 1: LLM Architecture Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "llm-mod-2",
      title: "Module 2: Working with LLMs (Daily Use)",
      description: "Applications, Integrations & Optimization. Target Outcome: Learner can strategically use LLM tools.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "llm2-v1", type: "video", title: "Getting Started with LLM APIs (OpenAI, Anthropic)", duration: "22 mins", status: "locked" },
        { id: "llm2-p1", type: "ppt", title: "Fine-Tuning Basics for Custom Data", duration: "15 Slides", status: "locked" },
        { id: "llm2-v2", type: "video", title: "High-Value Business Applications for LLMs", duration: "20 mins", status: "locked" },
        { id: "llm2-t1", type: "text", title: "Safety, Data Privacy & Bias Considerations", duration: "10 mins read", status: "locked" },
        { id: "llm2-q1", type: "quiz", title: "Level 2: Practical LLM Integration Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};