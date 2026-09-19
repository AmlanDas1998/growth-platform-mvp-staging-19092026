export const mlData = {
  title: "Machine Learning (ML)",
  description: "Understand how ML models work conceptually and learn to evaluate applied algorithms for business use cases.",
  modules: [
    {
      id: "ml-mod-1",
      title: "Module 1: Machine Learning Fundamentals",
      description: "Data & Algorithms Explained. Target Outcome: Learner understands how ML models work conceptually.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "ml1-v1", type: "video", title: "What is ML & The Role of Training Data", duration: "16 mins", status: "unlocked" },
        { id: "ml1-p1", type: "ppt", title: "Supervised vs. Unsupervised Learning", duration: "14 Slides", status: "locked" },
        { id: "ml1-t1", type: "text", title: "Understanding Bias, Variance, and Overfitting", duration: "8 mins read", status: "locked" },
        { id: "ml1-q1", type: "quiz", title: "Level 1: ML Fundamentals Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "ml-mod-2",
      title: "Module 2: Practical Machine Learning (Daily Use)",
      description: "Tools, Models & Real-World Applications. Target Outcome: Learner understands applied ML logic and use cases.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "ml2-v1", type: "video", title: "The End-to-End ML Workflow Basics", duration: "20 mins", status: "locked" },
        { id: "ml2-p1", type: "ppt", title: "Model Evaluation Metrics for Business", duration: "12 Slides", status: "locked" },
        { id: "ml2-v2", type: "video", title: "Interpreting ML Outputs for Decision Making", duration: "18 mins", status: "locked" },
        { id: "ml2-t1", type: "text", title: "High-ROI ML Business Use Cases", duration: "10 mins read", status: "locked" },
        { id: "ml2-q1", type: "quiz", title: "Level 2: Practical ML Application Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};