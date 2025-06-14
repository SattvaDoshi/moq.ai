import {
  Calendar,
  LayoutDashboard,
  List,
  Settings,
  WalletCards,
} from "lucide-react";

import {
  Code2Icon,
  User2Icon,
  BriefcaseBusiness,
  Puzzle,
  ShieldCheckIcon, // Added for Leadership
} from "lucide-react"; // Adjust if you're using a different icon library

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedule Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: ShieldCheckIcon,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.

🎯 Your task: Generate a list of high-quality interview questions based **only** on the selected interview type(s), job details, and candidate experience.

---

📄 Inputs:
- **Job Title**: {{jobTitle}}  
- **Job Description**: {{jobDescription}}  
- **Interview Duration**: {{duration}} minutes  
- **Interview Type(s)**: {{interviewType}}  
- **Candidate Experience Level**: {{experience}}  

---

📌 Rules & Constraints:
1. 🚫 **Do NOT include questions from unselected interview types.** Only include questions that strictly belong to the selected interview type(s): {{interviewType}}.
2. 🎯 For each selected interview type, ensure every question matches its category:
   - **Technical**: Focus on coding, technologies, system design, tools, and technical depth.
   - **Behavioral**: Soft skills, team communication, conflict resolution, decision-making.
   - **Problem Solving**: Analytical thinking, logical reasoning, debugging.
   - **Experience**: Past project exposure, responsibilities, decision outcomes.
   - **Leadership**: Team leadership, architecture decisions, strategic thinking — include only if experience is 5+ years or role includes leadership.
3. 🎚️ Adjust difficulty based on experience:
   - **Fresher**: Basic concepts, learning potential.
   - **1–2 Years**: Hands-on exposure, practical application.
   - **3–5 Years**: System thinking, scalability, tradeoffs.
   - **5+ Years**: Ownership, leadership, architecture.

---

📦 Output Format:
Return **only** a JSON object using the format below, and include the original job context in the object as well:

\`\`\`json
{
  "interviewQuestions": [
    {
      "question": "Your question here",
      "type": "Technical" | "Behavioral" | "Experience" | "Problem Solving" | "Leadership"
    }
  ],
  "jobTitle": "{{jobTitle}}",
  "jobDescription": "{{jobDescription}}",
  "interviewDuration": "{{duration}}",
  "interviewType": "{{interviewType}}",
  "experienceLevel": "{{experience}}"
}
\`\`\`

⚠️ Make sure:
- All questions strictly align with the selected interview type(s).
- Do not generate unrelated or mixed-type questions.
- Do not include generic or vague questions.

`;

export const FEEDBACK_PROMPT = `{{conversation}}

Depends on this Interview Conversation between assitant and user, 

Give me feedback for user interview. Give me rating out of 10 for technical Skills, 

Communication, Problem Solving, Experince. Also give me summery in 3 lines 

about the interview and one line to let me know whether is recommanded 

for hire or not with msg. Give me response in JSON format

{

    feedback:{

        rating:{

            techicalSkills:5,

            communication:6,

            problemSolving:4,

            experince:7

        },

        summery:<in 3 Line>,

        Recommendation:'',

        RecommendationMsg:''



    }

}

`;
