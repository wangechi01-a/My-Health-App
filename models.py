from pydantic import BaseModel, Field
from typing import List, Optional

class UserProfile(BaseModel):
    """User input data for generating personalized plans."""
    name: Optional[str] = None
    age: int
    weight: float
    height: float
    gender: str
    activity_level: Optional[str] = None
    primary_goal: Optional[str] = None
    dietary_restrictions: Optional[str] = None
    medical_conditions: Optional[str] = None
    equipment_available: Optional[List[str]] = None

class Meal(BaseModel):
    """Represents a single meal with optional calorie count."""
    name: str
    calories: Optional[int] = None

class Workout(BaseModel):
    """Describes a workout activity."""
    name: str
    type: str  
    duration: int  
    equipment_needed: Optional[List[str]] = None  

class MealPlan(BaseModel):
    """Meal plan for a single day."""
    day: str
    meals: List[Meal]

class WorkoutPlan(BaseModel):
    """Workout plan for a single day."""
    day: str
    workouts: List[Workout]

class WeeklyPlan(BaseModel):
    """Combined weekly meal and workout plan."""
    meal_plan: List[MealPlan]
    workout_plan: List[WorkoutPlan]
    cheat_day: str 

class RecommendationRequest(BaseModel):
    """Request format for personalized health recommendations."""
    symptoms: str
    context: Optional[str] = None  
