import random
import os
import string
from create_passages import create_passages

host_name = "localhost:8000"
book = {
    'book': 'The Great Gatsby',
    'simple_title': 'the-great-gatsby',
    'author': 'F. Scott Fitzgerald',
    'year': '1925',
    'genre': 'General',
    'url': 'https://www.gutenberg.org/files/64317/64317-h/64317-h.htm',
    'beginning': "In my younger and",
    'ending': 'into the past.',
}
difficulty = 9
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

def generate_question(host_name, book, difficulty, filters):
  passages = create_passages(host_name, book, difficulty, filters)
  extra_passage = create_passages(host_name, book, difficulty, filters, extra=True)['passage']
  # passage_to_blank, passages

  passage = passages[0]['passage']

  # header = f"From \"{book['book']}\" ({book['year']}), by {book['author']}"
  
  # passage = f". . . {passage['passage']} . . ."
  # logic to figure out what words can be used in the game

  def generate_expected_words(passage):
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
    return expected_words
    
  expected_passage_words_split = passage.split(" ")

  expected_words = generate_expected_words(passage)
  print("Got here")
  while 1:
    extra_words = generate_expected_words(extra_passage)
    to_continue = False
    for word in extra_words:
      if word in expected_words:
        print(f'{extra_words}:\n{word} is in expected words:\n{expected_words}')
        to_continue = True
        break
    if to_continue:
      continue
    else:
      break
    

  # generate the blanks

  upper_test_list = []

  for element in expected_passage_words_split:
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
    for element in expected_passage_words_split:
      element = element.upper()
      parse_index += 1
      if word == element:
        if count_of_word_in_passage > 1:
          to_instance += 1
          if to_instance != instance_in_passage:
            continue
        expected_passage_words_split[parse_index] = f"_____({expected_words.index(word)+1})"
        break
          
        
        # print(parse_index)


  word_choices = list(expected_words) + list(extra_words)
  random.shuffle(word_choices)

  passage_with_blanks = " ".join(expected_passage_words_split)


  # test game
  count = 0
  for expected_word in expected_words:
    count += 1
    print("PASSAGE:\n")
    # print(header)
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

generate_question(host_name, book, difficulty, filters)