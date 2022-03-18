import urllib.request
import json
import random
#
def create_passages(host_name, book, difficulty, filters, extra=False):
  # get filters in there

  title = book["simple_title"]
  # difficulty = 2
  # title = "winesburg-ohio"
  url = f"http://{host_name}/api/v1/filters"
  # url = f"http://localhost:8000/api/v1/filters"
  # book_text = open(f"books/{title}.txt", "r").read()

  book_text = open(f"game/backend_scripts/books/{title}.txt", "r").read()


  # with urllib.request.urlopen(url) as response:
  #   filter_list = json.loads(response.read())
  #   filters = [ filter['string'] for filter in filter_list ]

  max_difficulty = 10

  passages = []
  new_passage = []
  passage_dict = {
    'difficulty': 0,
    'passage': '',
    'passage_num': 0,
    'usable': True,
  }
  passage_dict_reset = dict(passage_dict)

  # length takes the difficulty and gives back an appropriate length

  length = max_difficulty+2 - difficulty
  length *= 50

  split_for_passages = book_text.split(" ")

  for word in split_for_passages:
    for filter in filters:
        if filter in word:
          # print("Word was ", word)
          split_for_passages[split_for_passages.index(word)] = "[redacted]"

  def make_unusable(description):
    passage_dict["usable"] = False
    passage_dict["unusability_desc"] = description
  
  count = 0
  index = 0
  passage_num = 0
  for word in split_for_passages:
    # print(word)
    count += len(word)
    new_passage.append(word)
    if word == '[redacted]':
        make_unusable("Contains at least one trigger word")
    # if count >= length or split_for_passages.index(word) == len(split_for_passages)-1:
    if count >= length or index == len(split_for_passages)-1:
      if index == 0:
        make_unusable("Beginning passage; will cause problems with passage parsing")
      if index == len(split_for_passages)-1:
        make_unusable("Ending passage; will be too short for difficulty given")
      passage_dict["difficulty"] = difficulty
      passage_num += 1
      passage_dict["passage_num"] = passage_num
      passage_dict["passage"] = " ".join(new_passage)
      if "unusability_desc" not in passage_dict:
        passage_dict["unusability_desc"] = ""
      passages.append(dict(passage_dict))
      new_passage = []
      passage_dict = dict(passage_dict_reset)
      count = 0
    index += 1






  while 1:
    primary_passage = random.choice(passages)
    if primary_passage["usable"] == True:
      break
    
  if extra == False:
    passage_before = passages[passages.index(primary_passage)-1]
    passage_after = passages[passages.index(primary_passage)+1]
    
    passages_to_return = [primary_passage, passage_before, passage_after]

    return passages_to_return
  else:
    return primary_passage