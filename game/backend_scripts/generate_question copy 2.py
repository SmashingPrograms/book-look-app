import random
import os
import string

# symbols_to_remove = [
#   '\n',
#   ',',
#   '.',
#   "'",
#   '"',
#   '-',
#   '—',
#   '–',
#   '(',
#   ')',
#   '[',
#   ']',
#   '{',
#   '}',
#   ';',
#   ':',
#   '…',
#   '\\',
#   '/',
#   '=',
#   '+',
#   '_',
#   '!',
#   '?',
#   '>',
#   '<',
#   '~',
#   '@',
#   '§',
#   '#',
#   '$',
#   '%',
#   '^',
#   '&',
#   '*',
#   # Numbers
#   '1',
#   '2',
#   '3',
#   '4',
#   '5',
#   '6',
#   '7',
#   '8',
#   '9',
#   '0',
#   # Fractions
#   '¼',
#   '½',
#   '¾',
#   '⅐',
#   '⅑',
#   '⅒',
#   '⅓',
#   '⅔',
#   '⅕',
#   '⅖',
#   '⅗',
#   '⅘',
#   '⅙',
#   '⅚',
#   '⅛',
#   '⅜',
#   '⅝',
#   '⅞',
#   '⅟',
#   '↉',
#   # Unicode stuff
# ]

books = [
  # {
  #     'book': 'Winnie-the-Pooh',
  #     'author': 'A. A. Milne',
  #     'year': '1926',
  #     'genres': [
  #       'Juvenile',
  #       'Fiction',
  #     ],
  #     'url': 'https://www.gutenberg.org/files/67098/67098-h/67098-h.htm',
  #     'beginning': "Here is Edward Bear",
  #     'ending': 'going up the stairs behind him.',
  # },
  # {
  #     'book': 'Winesburg, Ohio',
  #     'author': 'Sherwood Anderson',
  #     'year': '1919',
  #     'genres': [
  #       'Social commentary',
  #       'Fiction',
  #     ],
  #     'url': 'https://www.gutenberg.org/cache/epub/416/pg416.html',
  #     'beginning': "The writer, an old man with a white mustache",
  #     'ending': 'paint the dreams of his manhood.',
  # },
  # {
  #     'book': 'The Adventures of Tom Sawyer',
  #     'author': 'Mark Twain',
  #     'year': '1876',
  #     'genres': [
  #       'Juvenile',
  #       'Fiction',
  #     ],
  #     'url': 'https://www.gutenberg.org/files/74/74-h/74-h.htm',
  #     'beginning': "Most of the adventures recorded in this book really",
  #     'ending': 'of their lives at present.',
  # },
  # {
  #     'book': 'The Great Gatsby',
  #     'author': 'F. Scott Fitzgerald',
  #     'year': '1925',
  #     'genres': [
  #       'Fiction',
  #     ],
  #     'url': 'https://www.gutenberg.org/files/64317/64317-h/64317-h.htm',
  #     'beginning': "In my younger and",
  #     'ending': 'into the past.',
  # },
  # {
  #     'book': 'Treasure Island',
  #     'author': 'Robert Louis Stevenson',
  #     'year': '1883',
  #     'genres': [
  #       'Adventure',
  #       'Fiction',
  #     ],
  #     'url': 'https://www.gutenberg.org/files/120/120-h/120-h.htm',
  #     'beginning': "QUIRE TRELAWNEY",
  #     'ending': 'ears:',
  # },
  {
      'book': 'Religio Journalistici',
      'author': 'Christopher Morley',
      'year': '1924',
      'genres': [
        'Nonfiction',
      ],
      'url': 'https://www.gutenberg.org/files/66145/66145-h/66145-h.htm',
      'beginning': "coming home",
      'ending': 'Marvell:',
  },
  # {
  #     'book': 'War and Peace',
  #     'author': 'Leo Tolstoy',
  #     'year': '1869',
  #     'genres': [
  #       'Historical fiction',
  #     ],
  #     'url': 'https://www.gutenberg.org/files/2600/2600-h/2600-h.htm',
  #     'beginning': "\"Well, Prince, so Genoa",
  #     'ending': 'we are not conscious.',
  # },
]

while 1:

  # Each passage will have an ID and an associated difficulty.



  # CREATE PASSAGES, will become its own separate file

  difficulty = 9
  max_difficulty = 10

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
    'negro',
    'mulatt',
    'octoroon',
  ]

  for word in split_for_passages:
    for filter in filters:
        if filter in word:
          # print("Word was ", word)
          split_for_passages[split_for_passages.index(word)] = "[redacted]"

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

  test = open("test.txt", "w+")
  test.write(str(passages))
  test.close()

  # GENERATE QUESTION FILE

  random.shuffle(passages)

  passage_dict = passages[0]

  header = f"From \"{book['book']}\" ({book['year']}), by {book['author']}"

  if passage_dict["usable"] == False:
    continue
  
  passage = f". . . {passage_dict['passage']} . . ."
  # logic to figure out what words can be used in the game

  passage_words_split = passage.split(" ")

  passage_words = []

  for word in passage_words_split:

    # take out symbols that are likely to cause problems, with word choices
    to_continue = False
    if len(word) < 4:
      continue
    for letter in word:
      if (letter not in string.ascii_uppercase and letter not in string.ascii_lowercase):
        to_continue = True
        break
    if to_continue == True:
      continue

    # words in all caps or caps in the middle of a word, again likely to cause problems
    word_to_check_for_upper = word[1:]
    if word_to_check_for_upper != word_to_check_for_upper.lower():
      continue

    # doing the lowering now since cap testing is done
    word = word.upper()

    # checking for repeat words
    if word in passage_words:
      continue

    passage_words.append(word)


  # print(passage_words)


  # generate word choices

  number_of_blanks = 6
  expected_words = []

  for i in range(0, number_of_blanks):
    while 1:
      random_index = random.randint(0, len(passage_words)) - 1
      if passage_words[random_index] not in expected_words:
        expected_words.append(passage_words[random_index])
        break

  # generate the blanks

  upper_test_list = []

  for element in passage_words_split:
    upper_test_list.append(element.upper())

  passage_with_blanks = []

  for word in expected_words:

    count_of_word_in_passage = upper_test_list.count(word)

    if count_of_word_in_passage > 1:
      instance_in_passage = random.randint(1, count_of_word_in_passage)
      # print(f"{word} appeared {count_of_word_in_passage} times. It's on {instance_in_passage}.")

    # blank_added = False
    parse_index = -1
    to_instance = 0
    for element in passage_words_split:
      element = element.upper()
      parse_index += 1
      if word == element:
        if count_of_word_in_passage > 1:
          to_instance += 1
          if to_instance != instance_in_passage:
            continue
        passage_words_split[parse_index] = f"_____({expected_words.index(word)+1})"
        break
          
        
        # print(parse_index)


  word_choices = list(expected_words)
  random.shuffle(word_choices)

  passage_with_blanks = " ".join(passage_words_split)


  # test game
  count = 0
  for expected_word in expected_words:
    count += 1
    print("PASSAGE:\n")
    print(header)
    print(passage_with_blanks)
    print("\n\n")
    print("Your choices:\n")
    print(word_choices)
    print("\n")
    while 1:
      answer = input(f"Guess word #{count}) ")
      answer = answer.upper()
      if answer == expected_word:
        passage_with_blanks = passage_with_blanks.replace(f"_____({expected_words.index(expected_word)+1})", f"{answer}({expected_words.index(expected_word)+1})")
        word_choices.remove(expected_word)
        print("Wow! You got it!")
        input("Next: ")
        print("\n\n\n\n")
        break
      elif answer == "":
        print("Type something here please.")
      else:
        print("Nope, that's not really right! Sorry! -2 points")

  print(passage_with_blanks)
  print("\n\n\n\n\n\nYOU WON THIS ROUND\n\n\n\n\n\n\n\n")