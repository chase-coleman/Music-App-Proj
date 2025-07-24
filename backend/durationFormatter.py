from datetime import timedelta

# timedelta represents a duration/difference between 2 dates, times, or datetime instances
# it allows for performing arithmetic operations on these things. 

def format_duration(duration_str):
  try:
    parts = list(map(int, duration_str.strip().split(":")))
    if len(parts) == 3:
      hours, minutes, seconds = parts
    elif len(parts) == 2:
      hours = 0
      minutes, seconds = parts
    else:
      raise ValueError("Invalid duration format")
    
    return str(timedelta(hours=hours, minutes=minutes, seconds=seconds))
  except Exception as e:
    return "00:00:00"
