export const insuranceData = {
  title: "Insurance Strategy",
  description: "Understand risk coverage and independently select, compare, and manage your personal insurance policies.",
  modules: [
    {
      id: "ins-mod-1",
      title: "Module 1: Insurance Fundamentals",
      description: "Risk, Coverage & Policy Types. Target Outcome: Learner understands how insurance products work.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "ins1-v1", type: "video", title: "What is Insurance & How Premium Logic Works", duration: "14 mins", status: "unlocked" },
        { id: "ins1-p1", type: "ppt", title: "Term Life vs. Endowment Plans", duration: "10 Slides", status: "locked" },
        { id: "ins1-v2", type: "video", title: "Health Insurance Basics & Important Riders", duration: "18 mins", status: "locked" },
        { id: "ins1-q1", type: "quiz", title: "Level 1: Insurance Fundamentals Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "ins-mod-2",
      title: "Module 2: Personal Insurance Strategy (Daily Use)",
      description: "Selecting, Comparing & Claiming Policies. Target Outcome: Learner can select and manage insurance independently.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "ins2-v1", type: "video", title: "How to Calculate Your Ideal Coverage Amount", duration: "15 mins", status: "locked" },
        { id: "ins2-p1", type: "ppt", title: "How to Read Policy Documents & Spot Red Flags", duration: "15 Slides", status: "locked" },
        { id: "ins2-v2", type: "video", title: "The Claim Process: Avoiding Rejections & Mis-selling", duration: "20 mins", status: "locked" },
        { id: "ins2-t1", type: "text", title: "Checklist for Comparing Plans (Health & Term)", duration: "8 mins read", status: "locked" },
        { id: "ins2-q1", type: "quiz", title: "Level 2: Practical Insurance Strategy Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};