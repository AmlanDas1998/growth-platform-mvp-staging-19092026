export const mutualFundsData = {
  title: "Mutual Funds",
  description: "Navigate the mutual fund ecosystem. Confidently select, analyze, and manage a diversified portfolio.",
  modules: [
    {
      id: "mf-mod-1",
      title: "Module 1: Mutual Fund Investing",
      description: "Structure, Risk & Asset Classes. Target Outcome: Learner understands the mutual fund ecosystem.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "mf1-v1", type: "video", title: "How Mutual Funds Work & AMC Basics", duration: "14 mins", status: "unlocked" },
        { id: "mf1-p1", type: "ppt", title: "Asset Classes: Equity, Debt, and Hybrid", duration: "15 Slides", status: "locked" },
        { id: "mf1-t1", type: "text", title: "Understanding Expense Ratios", duration: "5 mins read", status: "locked" },
        { id: "mf1-t2", type: "text", title: "Risk Categories in Mutual Funds", duration: "7 mins read", status: "locked" },
        { id: "mf1-q1", type: "quiz", title: "Level 1: Mutual Fund Basics Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "mf-mod-2",
      title: "Module 2: Portfolio Management (Daily Use)",
      description: "Selection, Analysis & Optimization. Target Outcome: Learner can build and optimize a mutual fund portfolio.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "mf2-v1", type: "video", title: "How to Read & Analyze Fund Fact Sheets", duration: "18 mins", status: "locked" },
        { id: "mf2-v2", type: "video", title: "Fund Comparison & Diversification Strategies", duration: "22 mins", status: "locked" },
        { id: "mf2-p1", type: "ppt", title: "Advanced Metrics: Alpha & Beta Basics", duration: "12 Slides", status: "locked" },
        { id: "mf2-t1", type: "text", title: "Taxation on Mutual Funds & Exit Loads", duration: "8 mins read", status: "locked" },
        { id: "mf2-q1", type: "quiz", title: "Level 2: Practical Portfolio Management Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};