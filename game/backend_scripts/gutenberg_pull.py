# GUTENBERG PULL FILE
import urllib.request
from bs4 import BeautifulSoup
import random
# import json

# url = input("Enter URL: ")

book = books[random.randint(0, len(books)-1)]
print("book: " + book['book'])
url = book['url']
# beginning = input("Enter beginning text: ")
beginning = book['beginning']
# ending = input("Enter ending text: ")
ending = book['ending']
# book = input("Book name: ")
# author = input("Author: ")
# year = input("Year: ")
# genre = input("Genre(s), separate by comma: ")

with urllib.request.urlopen(url) as response:
   print("Got here")
   html = response.read().decode()
   # html = str(html)
   # html = html.replace('\\n', '\n').replace('\\t', '\t')[2:]

print("Got this far")
soup = BeautifulSoup(html, 'html.parser')
soup.prettify()

# for data in soup.find_all("p"): 
#     print(data.get_text())

html_parse = soup.find_all()

parsed_text = []

# Takes out any stray page numbers that are on SOME Gutenberg pages
spans = soup.find_all('span', class_='pagenum')
# exit()

for tag in spans:
   tag.string = ''
   tag.unwrap()

# Takes all the book's text and puts it in text-only format instead of HTML

for tag in html_parse:
   if (tag.name == 'div' or tag.name == 'p') and not tag.get_text().isspace():
   parsed_text.append(tag.get_text())

for line in parsed_text:
   parsed_text[parsed_text.index(line)] = line.lstrip()

parsed_text = "\n".join(parsed_text)

# Preliminary string cleanup: takes out all symbols we don't want ANYWHERE
while 1:
   if "  " in parsed_text:
   parsed_text = parsed_text.replace("  ", "\n")
   elif "  " in parsed_text:
   parsed_text = parsed_text.replace("  ", "\n")
   elif "  " in parsed_text:
   parsed_text = parsed_text.replace("  ", "\n")
   else:
   break

parsed_text = parsed_text.replace("”", "\"")
parsed_text = parsed_text.replace("“", "\"")
parsed_text = parsed_text.replace("’", "'")
parsed_text = parsed_text.replace("‘", "'")
parsed_text = parsed_text.replace("`", "'")
parsed_text = parsed_text.replace("\r", "")
parsed_text = parsed_text.replace('\u200b', "")

# Slices all unnecessary beginning and end text based on specified beginning/ending data 
parsed_text = parsed_text[parsed_text.index(beginning):]
parsed_text = parsed_text[:parsed_text.index(ending)+len(ending)]

# Takes out all double returns. It has to be after the slice above for...some reason? Or it doesn't work with some books.
while 1:
   if "\n\n" in parsed_text:
   parsed_text = parsed_text.replace("\n\n", "\n")
   else:
   break

test = open("test.txt", "w+")
test.write(str(parsed_text))
test.close()