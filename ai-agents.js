const OpenAI = require("openai")
require('dotenv').config()

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: "Say this is a test" }
    ],
  })

  console.log(completion.choices[0].message)
}

const analyzeGoal = async () => {
    const goalText = "learn PYthon";
    const durationDay = "7";

    const prompt = `User wants to ${goalText} within${durationDay} days.
    create s structured learning/execution plan.
    1. main milestones for each week.
    2. success matrices .
    3. potential challenges.
    4. motivational approch.
    
    Return as JSON with this structured:
    {
    "milestones": ["milestone1", "milestone2", "milestone3"],
    "dailyTasks": [{"day": 1, "title": ".....", "descriptions": "....."}],
    "successMetrics": ["metric1",metric2","metric3"],
    "challenges": ["challenge1"],
    "motivationalApproach": "...."
    }`
try{
    const completion = await openai.chat.completions.create({
    model: "stepfun/step-3.5-flash:free",
    messages: [
        {
            role: "system",
            content: "You are a expert personal productivity couch and learning specialist. Create actionable, structured plans."
        },
      { role: "user", content: prompt }
    ],

    temperature: 0.7,
  })

  console.log(completion.choices[0].message)
} catch(err){
    console.error(err)
}
}

analyzeGoal();