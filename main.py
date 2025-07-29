import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.runnables import RunnableMap
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from memory import MemoryStore
from agents import build_agent_graph
from models import UserProfile, RecommendationRequest
from agents import recommendation_prompt
from dotenv import load_dotenv
import re
load_dotenv()

# --- Logging setup ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

google_api_key = os.getenv("GOOGLE_API_KEY")
if not google_api_key:
    logger.error("GOOGLE_API_KEY not found in environment variables.")

llm_gemini = ChatGoogleGenerativeAI(
    model="models/gemini-2.0-flash",
    google_api_key=google_api_key,
    temperature=0.3,
    max_output_tokens=1000
)

memory = MemoryStore()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = build_agent_graph()


#Endpoints
def clean_plan(text):
    match = re.search(r"(Monday|Mon\.)", text)
    if match:
        return text[match.start():]
    return text

@app.post("/plan/weekly", response_class=PlainTextResponse)
def generate_plan(profile: UserProfile):
    try:
        logger.info("Received weekly plan request: %s", profile.model_dump())
        result = graph.invoke({"user": profile.model_dump()})
        logger.info("Result: %s", result)

        plan = result.get("weekly_plan")
        if not plan:
            raise ValueError("Missing 'weekly_plan' key in result.")

        memory.save_plan(profile, plan)
        logger.info("Weekly plan generated successfully.")
        meal_plan = plan['meal_plan'].content if hasattr(plan['meal_plan'], 'content') else plan['meal_plan']
        workout_plan = plan['workout_plan'].content if hasattr(plan['workout_plan'], 'content') else plan['workout_plan']
        cheat_day = plan['cheat_day'].content if hasattr(plan['cheat_day'], 'content') else plan['cheat_day']
        meal_plan = clean_plan(meal_plan)
        workout_plan = clean_plan(workout_plan)
        return (
            f"Meal Plan:\n{meal_plan}\n\n"
            f"Workout Plan:\n{workout_plan}\n\n"
            f"Cheat Day:\n{cheat_day}"
        )
    except Exception as e:
        logger.exception("Error generating weekly plan:")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/plan/recommendations", response_class=PlainTextResponse)
def get_recommendations(request: RecommendationRequest):
    try:
        logger.info("Received recommendation request: %s", request.model_dump())

        prompt = recommendation_prompt
        chain = prompt | llm_gemini
        result = chain.invoke(request.model_dump())
        recommendation_text = result.content
        return recommendation_text

    except Exception as e:
        logger.exception("Error generating recommendations:")
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/plan/history", response_class=PlainTextResponse)
def get_plan_history():
    logger.info("Retrieving plan history.")
    plans = memory.get_all()
    if not plans:
        return "No plan history found."
    output = []
    for i, entry in enumerate(plans, 1):
        output.append(f"Plan {i}:")
        if isinstance(entry, dict):
            meal_plan = entry.get("meal_plan")
            workout_plan = entry.get("workout_plan")
            cheat_day = entry.get("cheat_day")
            if meal_plan:
                output.append("Meal Plan:")
                output.append(str(meal_plan))
            if workout_plan:
                output.append("Workout Plan:")
                output.append(str(workout_plan))
            if cheat_day:
                output.append("Cheat Day:")
                output.append(str(cheat_day))
        else:
            output.append(str(entry))
        output.append("")
    return "\n".join(output)
