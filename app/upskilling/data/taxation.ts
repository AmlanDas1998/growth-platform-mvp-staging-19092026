export const taxationData = {
  title: "Indian Taxation",
  description: "Understand Indian income tax structures, file your own ITR confidently, and optimize your taxes.",
  modules: [
    {
      id: "tax-mod-1",
      title: "Module 1: Indian Tax Foundations",
      description: "Income Tax & ITR Essentials. Target Outcome: Understand how Indian income tax works.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "tax1-v1", type: "video", title: "Tax Structure in India & Slabs", duration: "15 mins", status: "unlocked" },
        { id: "tax1-t1", type: "text", title: "Old vs New Regime Comparison", duration: "5 mins read", status: "locked" },
        { id: "tax1-p1", type: "ppt", title: "Key Deductions (80C, 80D, HRA)", duration: "12 Slides", status: "locked" },
        { id: "tax1-t2", type: "text", title: "What is ITR, Who Should File & Due Dates", duration: "8 mins read", status: "locked" },
        { id: "tax1-q1", type: "quiz", title: "Level 1: Tax Foundations Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "tax-mod-2",
      title: "Module 2: Practical Tax Filing (Daily Use)",
      description: "ITR Preparation & Optimization Strategies. Target Outcome: File your own ITR confidently and optimize taxes.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "tax2-v1", type: "video", title: "Step-by-step ITR Walkthrough & Choosing Regimes", duration: "25 mins", status: "locked" },
        { id: "tax2-p1", type: "ppt", title: "Salary Structure Interpretation", duration: "10 Slides", status: "locked" },
        { id: "tax2-t1", type: "text", title: "Capital Gains Basics & Tax Planning Strategies", duration: "10 mins read", status: "locked" },
        { id: "tax2-p2", type: "ppt", title: "Common Filing Mistakes to Avoid", duration: "8 Slides", status: "locked" },
        { id: "tax2-q1", type: "quiz", title: "Level 2: Practical Taxation Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};