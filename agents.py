from langgraph.graph import StateGraph, END
from prompts import meal_prompt, workout_prompt, cheatday_prompt, recommendation_prompt
from langchain_core.runnables import RunnableLambda
from langchain_google_genai import ChatGoogleGenerativeAI
from typing import TypedDict
import os
from dotenv import load_dotenv
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI


google_api_key = os.getenv("GOOGLE_API_KEY")
if not google_api_key:
    raise RuntimeError("Missing GOOGLE_API_KEY in environment.")

llm = ChatGoogleGenerativeAI(model="models/gemini-2.0-flash", google_api_key=google_api_key, temperature=0.3, max_output_tokens=1000)

# RunnableSequence
meal_chain = meal_prompt | llm
workout_chain = workout_prompt | llm
cheatday_chain = cheatday_prompt | llm

# state schema
class AgentState(TypedDict, total=False):
    user: dict
    meals: str
    workouts: str
    cheat_day: str
    weekly_plan: dict

def meal_agent(state):
    user = state.get('user')
    if not user:
        raise ValueError("Missing 'user' in state")
    return {
        "meals": meal_chain.invoke({
            "activity_level": user.get("activity_level", ""),
            "primary_goal": user.get("primary_goal", ""),
            "dietary_restrictions": user.get("dietary_restrictions", ""),
            "medical_conditions": user.get("medical_conditions", ""),
            "name": user.get("name", "")
        })
    }

def workout_agent(state):
    user = state.get('user')
    if not user:
        raise ValueError("Missing 'user' in state")
    return {
        "workouts": workout_chain.invoke({
            "equipment_available": ", ".join(user["equipment_available"]),
            "activity_level": user.get("activity_level", ""),
            "primary_goal": user.get("primary_goal", ""),
            "medical_conditions": user.get("medical_conditions", ""),
            "name": user.get("name", "")
        })
    }

def cheatday_agent(state):
    user = state.get('user')
    if not user:
        raise ValueError("Missing 'user' in state")
    return {
        "cheat_day": cheatday_chain.invoke({})
    }

def merge_agent_outputs(state):
    return {
        "weekly_plan": {
            "meal_plan": state.get("meals"),
            "workout_plan": state.get("workouts"),
            "cheat_day": state.get("cheat_day"),
        }
    }

#LangGraph flow builder
def build_agent_graph():
    builder = StateGraph(state_schema=AgentState)
    builder.add_node("meal_agent", RunnableLambda(meal_agent))
    builder.add_node("workout_agent", RunnableLambda(workout_agent))
    builder.add_node("cheatday_agent", RunnableLambda(cheatday_agent))
    builder.add_node("merge", RunnableLambda(merge_agent_outputs))

    builder.set_entry_point("meal_agent")
    builder.add_edge("meal_agent", "workout_agent")
    builder.add_edge("workout_agent", "cheatday_agent")
    builder.add_edge("cheatday_agent", "merge")
    builder.add_edge("merge", END)

    return builder.compile()
