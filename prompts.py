from langchain.prompts import PromptTemplate

# Lean Weekly Meal Plan Prompt
meal_prompt = PromptTemplate(
    input_variables=["activity_level", "primary_goal", "dietary_restrictions", "medical_conditions"],
    template=(
        "Create a concise weekly meal plan for a Kenyan user. "
        "Use local ingredients like kienyeji greens, beans, sweet potatoes, tilapia. "
        "Consider: {dietary_restrictions} and {medical_conditions}. "
        "Goal: {primary_goal}. Activity: {activity_level}. "
        "Format: Monday to Sunday with breakfast, lunch, dinner as bullet points. "
        "Keep each meal description brief (1-2 lines max). "
        "Address as 'you'. Make it web-friendly and easy to read."
    )
)

# Lean Weekly Workout Plan Prompt
workout_prompt = PromptTemplate(
    input_variables=["equipment_available", "activity_level", "primary_goal", "medical_conditions"],
    template=(
        "Create a concise weekly workout plan using: {equipment_available}. "
        "Goal: {primary_goal}. Activity: {activity_level}. Medical: {medical_conditions}. "
        "Format: Monday to Sunday with workouts as bullet points. "
        "Keep each workout brief (1-2 lines max). "
        "Address as 'you'. Make it web-friendly and easy to read."
    )
)

# Lean Cheat Day Treats Prompt
cheatday_prompt = PromptTemplate(
    input_variables=[],
    template=(
        "Suggest 3-5 fun cheat day treats in Nairobi. "
        "Think: Gallitos, KFC, Shawarma Street, street food, desserts. "
        "Keep each suggestion brief (1 line max). "
        "Use bullet points. Make it web-friendly."
    )
)

# Health Recommendation Prompt (unchanged)
recommendation_prompt = PromptTemplate(
    input_variables=["symptoms", "context"],
    template=(
        "You are a health advisor. The user describes their current symptoms or health concerns as: {symptoms}. "
        "Additional context: {context}. "
        "Provide 5 or more tailored, practical, and safe health recommendations or next steps. Use short, readable paragraphs. Use bullet points only where necessary. "
        "Ensure the output is clean and easy to read on a web interface."
    )
)
