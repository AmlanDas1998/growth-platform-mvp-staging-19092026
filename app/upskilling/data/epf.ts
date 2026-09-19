export const epfData = {
  title: "Provident Fund (EPF)",
  description: "Master the EPF structure to actively manage your withdrawals, transfers, and long-term retirement planning.",
  modules: [
    {
      id: "epf-mod-1",
      title: "Module 1: EPF & Retirement Systems",
      description: "Structural Foundations. Target Outcome: Learner understands how EPF works.",
      status: "in-progress", // Unlocked by default
      assets: [
        { id: "epf1-v1", type: "video", title: "What is EPF & The EPFO Structure", duration: "12 mins", status: "unlocked" },
        { id: "epf1-p1", type: "ppt", title: "Employer vs Employee Contribution", duration: "10 Slides", status: "locked" },
        { id: "epf1-t1", type: "text", title: "Understanding UAN & Dashboard Basics", duration: "6 mins read", status: "locked" },
        { id: "epf1-t2", type: "text", title: "How EPF Interest Calculation Works", duration: "8 mins read", status: "locked" },
        { id: "epf1-q1", type: "quiz", title: "Level 1: EPF Foundations Certification", duration: "15 Questions", status: "locked" }
      ]
    },
    {
      id: "epf-mod-2",
      title: "Module 2: Managing Your EPF (Daily Use)",
      description: "Withdrawals, Transfers & Retirement Planning. Target Outcome: Learner can actively manage their EPF account.",
      status: "locked", // Locked until Module 1 Quiz is passed
      assets: [
        { id: "epf2-v1", type: "video", title: "How to Check EPF Balance & Make Online Withdrawals", duration: "20 mins", status: "locked" },
        { id: "epf2-v2", type: "video", title: "Step-by-Step: Transfers Between Jobs", duration: "15 mins", status: "locked" },
        { id: "epf2-p1", type: "ppt", title: "EPS (Pension Scheme) Basics & Early Withdrawal Rules", duration: "12 Slides", status: "locked" },
        { id: "epf2-t1", type: "text", title: "Tax Implications on EPF Withdrawals", duration: "7 mins read", status: "locked" },
        { id: "epf2-q1", type: "quiz", title: "Level 2: Practical EPF Management Certification", duration: "20 Questions", status: "locked" }
      ]
    }
  ]
};