from typing import List, Dict
from models import UserProfile

class MemoryStore:
    def __init__(self):
        self.memory = []

    def save_plan(self, profile: UserProfile, plan: str):
        self.memory.append({
            "user_profile": profile.dict(),
            "generated_plan": plan
        })

    def get_all(self) -> List[Dict]:
        return self.memory