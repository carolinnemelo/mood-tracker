from fastapi import FastAPI
from pydantic import BaseModel

class MoodEntry(BaseModel):
    emoji: str
    note: str | None = None
    
class MoodDB: 
  def __init__(self):
    self.data = []
    
  def add_mood(self, mood: dict):
    self.data.append(mood)
    
  def get_all(self):
    return self.data
  
db = MoodDB()

app = FastAPI()
 
@app.get("/")
def read_root():
    return {"message": "Hello, Carol"}


@app.post("/moods")
def add_mood(entry: MoodEntry):
    print("New mood entry received: ", entry)
    db.add_mood(entry.model_dump())
    return { "status": "ok", "emoji": entry.emoji, "note": entry.note}

    
@app.get("/moods")
def get_moods():
  return db.get_all()