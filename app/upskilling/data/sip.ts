export const sipData = {
  title: "Systematic Investment Plan (SIP)",
  description: "Harness the power of compounding. Learn to build, automate, and optimize your mutual fund SIP portfolios.",
  modules: [
    {
      id: "sip-mod-1",
      title: "Module 1: SIP Foundations",
      description: "Compounding & Investment Discipline. Target Outcome: Learner understands why SIP works.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "sip1-v1", type: "video", title: "What is a SIP & The Power of Compounding", duration: "16 mins", status: "unlocked" },
        { id: "sip1-p1", type: "ppt", title: "Understanding NAV Basics & Risk Levels", duration: "12 Slides", status: "locked" },
        { id: "sip1-t1", type: "text", title: "Asset Classes: Equity vs. Debt Funds Explained", duration: "8 mins read", status: "locked" },
        { id: "sip1-q1", type: "quiz", title: "Level 1: SIP Foundations Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "sip-mod-2",
      title: "Module 2: Building SIP Portfolios (Daily Use)",
      description: "Fund Selection & Automation. Target Outcome: Learner can start and manage SIPs independently.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "sip2-v1", type: "video", title: "Choosing Funds: Direct vs. Regular Plans", duration: "18 mins", status: "locked" },
        { id: "sip2-v2", type: "video", title: "Step-by-Step SIP Setup & Automation Guide", duration: "20 mins", status: "locked" },
        { id: "sip2-p1", type: "ppt", title: "Asset Allocation Strategies for Long-Term Wealth", duration: "14 Slides", status: "locked" },
        { id: "sip2-t1", type: "text", title: "Portfolio Monitoring, Rebalancing & Step-Up SIPs", duration: "10 mins read", status: "locked" },
        { id: "sip2-q1", type: "quiz", title: "Level 2: Practical SIP Management Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};