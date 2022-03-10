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

passage = """In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.

“Whenever you feel like criticising any one,” he told me, "just remember that all the people in this world haven’t had the advantages that you’ve had.”

He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth."""

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
      # os.system('clear')
      break
    elif answer == "":
      print("Type something here please.")
    else:
      print("Nope, that's not really right! Sorry! -2 points")
      # print(expected_word)

print("YOU WON THE GAME")