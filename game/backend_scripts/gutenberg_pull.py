import urllib.request
from bs4 import BeautifulSoup
# import json

# url = input("Enter URL: ")
url = 'https://www.gutenberg.org/files/67098/67098-h/67098-h.htm'
# beginning = input("Enter beginning text: ")
beginning = "Here is Edward Bear"
# ending = input("Enter ending text: ")
ending = "going up the stairs behind him."
# book = input("Book name: ")
# author = input("Author: ")
# year = input("Year: ")
# genre = input("Genre(s), separate by comma: ")

with urllib.request.urlopen(url) as response:
   html = response.read().decode()
   # html = str(html)
   # html = html.replace('\\n', '\n').replace('\\t', '\t')[2:]

soup = BeautifulSoup(html, 'html.parser')
soup.prettify()

# for data in soup.find_all("p"): 
#     print(data.get_text())

html_parse = soup.find_all()

parsed_text = []

for tag in html_parse:
   if (tag.name == 'div' or tag.name == 'p') and not tag.get_text().isspace():
      parsed_text.append(tag.get_text())

# parsed_text = "\n".join(parsed_text)


parsed_text = "\n".join(parsed_text)

# take out ALL instances of more than 1 \n
while 1:
   if "\n\n" in parsed_text:
      parsed_text = parsed_text.replace("\n\n", "\n")
   else:
      break

# print(parsed_text)
parsed_text = parsed_text[parsed_text.index(beginning):]
parsed_text = parsed_text[:parsed_text.index(ending)+len(ending)]

test = open("test.txt", "w+")
test.write(str(parsed_text))
test.close()

# print(html)

# Each passage will have an ID and an associated difficulty.



# CREATE PASSAGES, will become its own separate file

difficulty = 1
max_difficulty = 20
number_of_blanks = 5

# length takes the difficulty and gives back an appropriate length
length = max_difficulty+1 - difficulty
length *= 50

split_for_passages = parsed_text.split(" ")

filters = [
   'fuck',
   'shit',
   'bitch',
   'nigg',
   'whore',
   'slut',
]

for word in split_for_passages:
   for filter in filters:
      if filter in word:
         split_for_passages[word] = "[redacted]"

passages = []
new_passage = []
passage_dict = {
   'id': len(passages)+1,
   'passage': '',
   'usable': True,
}
count = 0
index = 0
for word in split_for_passages:
   # print(word)
   count += len(word)
   new_passage.append(word)
   if word == '[redacted]':
      passage_dict["usable"] = False
      passage_dict["unusability_desc"] = "contains at least one trigger word"
   # if count >= length or split_for_passages.index(word) == len(split_for_passages)-1:
   if count >= length or index == len(split_for_passages)-1:
      passage_dict["passage"] = " ".join(new_passage)
      passages.append(dict(passage_dict))
      new_passage = []
      passage_dict = {
         'id': len(passages)+1,
         'passage': '',
         'usable': True,
      }
      count = 0
   index += 1

print(split_for_passages[len(split_for_passages)-1])
test = open("test.txt", "w+")
test.write(str(passages))
test.close()