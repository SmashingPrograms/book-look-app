# GUTENBERG PULL FILE
import urllib.request
from bs4 import BeautifulSoup
# import json

# url = input("Enter URL: ")

def gutenberg_pull(book, title):
   # print("Here we go again!")
   #title = book['simple_title'][0]
   # I don't know why the above didn't work! For now, I'm just gonna pull it out directly
   # title = simplified_title
   try:
      url = book['url'][0]
      # start = input("Enter start text: ")
      start = book['start'][0]
      # end = input("Enter end text: ")
      end = book['end'][0]
      with urllib.request.urlopen(url) as response:
         html = response.read().decode('UTF8', 'replace')
   except ValueError:
      url = book['url']
      start = book['start']
      end = book['end']
      with urllib.request.urlopen(url) as response:
         html = response.read().decode('UTF8', 'replace')
   # book = input("Book name: ")
   # author = input("Author: ")
   # year = input("Year: ")
   # genre = input("Genre(s), separate by comma: ")
      # html = str(html)
      # html = html.replace('\\n', '\n').replace('\\t', '\t')[2:]

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

   # Slices all unnecessary start and end text based on specified start/end data 

   parsed_text = parsed_text[parsed_text.index(start):]
   parsed_text = parsed_text[:parsed_text.index(end)+len(end)]

   # Takes out all double returns. It has to be after the slice above for...some reason? Or it doesn't work with some books.
   while 1:
      if "\n\n" in parsed_text:
         parsed_text = parsed_text.replace("\n\n", "\n")
      elif "\n \n" in parsed_text:
         parsed_text = parsed_text.replace("\n \n", "\n")
      else:
         break
   try:
      book = open(f"game/backend_scripts/books/{title}.txt", "x")
   except FileExistsError:
      book = open(f"game/backend_scripts/books/{title}.txt", "w+")
   book.write(str(parsed_text))
   book.close()