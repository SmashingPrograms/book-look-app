import urllib.request
import json

with urllib.request.urlopen('https://api.datamuse.com/words?ml=ringing+in+the+ears') as response:
   html = response.read()

print(json.loads(html))
print("\n\n\n\n\n\n\n\n")
print(json.loads(html)[0])
print("\n\n\n\n\n\n\n\n")
print(json.loads(html)[0]['word'])