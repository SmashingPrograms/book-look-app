import random
import os

symbols_to_remove = [
  '\n',
  ',',
  '.',
  "'",
  '"',
  '-',
  '—',
  '–',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  ';',
  ':',
  '…',
  '\\',
  '/',
  '=',
  '+',
  '_',
  '!',
  '?',
  '>',
  '<',
  '~',
  '@',
  '§',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  # Numbers
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  # Fractions
  '¼',
  '½',
  '¾',
  '⅐',
  '⅑',
  '⅒',
  '⅓',
  '⅔',
  '⅕',
  '⅖',
  '⅗',
  '⅘',
  '⅙',
  '⅚',
  '⅛',
  '⅜',
  '⅝',
  '⅞',
  '⅟',
  '↉',
  # Unicode stuff
]

passage = """Most of the adventures recorded in this book really occurred; one or two were experiences of my own, the rest those of boys who were schoolmates of mine. Huck Finn is drawn from life; Tom Sawyer also, but not from an individual—he is a combination of the characteristics of three boys whom I knew, and therefore belongs to the composite order of architecture.

The odd superstitions touched upon were all prevalent among children and slaves in the West at the period of this story—that is to say, thirty or forty years ago.

Although my book is intended mainly for the entertainment of boys and girls, I hope it will not be shunned by men and women on that account, for part of my plan has been to try to pleasantly remind adults of what they once were themselves, and of how they felt and thought and talked, and what queer enterprises they sometimes engaged in."""

passage = passage.replace("”", "\"")
passage = passage.replace("“", "\"")
passage = passage.replace("’", "'")
passage = passage.replace("‘", "'")
passage = passage.replace("`", "'")
passage = passage.replace('\u200b', "")


# logic to figure out what words can be used in the game

passage_words_split = passage.split(" ")

passage_words = []

for word in passage_words_split:

  # take out symbols that are likely to cause problems
  to_continue = False
  for symbol in symbols_to_remove:
    if symbol in word or len(word) < 2:
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

number_of_choices = 10
expected_words = []

for i in range(0, number_of_choices):
  while 1:
    random_index = random.randint(0, len(passage_words)) - 1
    if passage_words[random_index] not in expected_words:
      expected_words.append(passage_words[random_index])
      break

# if 'THE' not in expected_words:
#   expected_words.append('THE')
#   expected_words.pop(0)

# print(expected_words)


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
  # print(expected_words)
  # if len(set(expected_words)) != len(expected_words):
  #   print("THIS DIDN'T WORK")
  #   print(set(expected_words))
  #   exit()

passage_with_blanks = " ".join(passage_words_split)


# test game
count = 0
for expected_word in expected_words:
  count += 1
  print("PASSAGE:\n")
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

print("YOU WON THE GAME")