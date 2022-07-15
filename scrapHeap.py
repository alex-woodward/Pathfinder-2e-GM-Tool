# Use "https://pf2.d20pfsrd.com/class" as a test web-address.

import requests
import re
from bs4 import BeautifulSoup


def webParser(webUrl):
    # Defines webScraper as a function.
    urlGet = requests.get(webUrl).text
    # Request an HTTP response from the server, creating a Request Object.
    scraps = BeautifulSoup(urlGet, 'html.parser')
    # Creates html with class bs4.BeautifulSoup from the content of
    # Response Object urlGet, parsing the Request Object using lxml.
    # html.prettify()
    # Makes the output more readable by applying standard HTML formatting.
    return scraps
    # Returns a prettified BeautifulSoup html file.


def tbl_scraper(web_source):
    tr_lst = [['Name', 'Link']]
    # Adds the text and url of table rows into tr_lst then,
    if str(web_source.split('/')[-1]) == 'class':
        tr_lst[0].insert(2, 'SkillOne')
        tr_lst[0].insert(3, 'SkillTwo')
    tbl = webParser(web_source).table
    # Request and store the <table> tag content
    # from the webSource into a variable using webParser.

    for tr in tbl.contents:
        if 'Paizo' in tr.text:
            # Verifies that the classes are official.
            chips = tr.find(href=re.compile(web_source + '.*'))
            # re.compile matches '. : any character', '*: any number of times'
            # of type href AFTER the text.
            nam, lnk = chips.text, chips.get('href')

            if str(web_source.split('/')[-1]) == 'class':
                skills = sklScraper(lnk)
                tr_lst.append([nam, lnk, skills[0], skills[1]])
            else:
                tr_lst.append([nam, lnk])
    return tr_lst


def sklScraper(clsLnk):
    skl_lst = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
    # Creates a list of the ability score types of Pathfinder.
    scraps = webParser(clsLnk).section
    # Outputs the 'section' of a scrap file using the webParser function with the passed url.

    for shred in scraps.find_all(text=re.compile('\. At 1st level, your.*')):
        # Searches for all instances of text referencing ability scores.
        abl_lst = []

        if 'or' in shred.parent.text and 'racket' not in shred.parent.text:
            # Creates exception for classes with multiple ability scores by searching for specific text.
            abl_lst.extend(shred.parent.find_all(text=lambda skl: skl in skl_lst, limit=2))
            # Adds skill to abl_lst after verifying the skill exists in the skill list, with a limit of 2.
        elif shred.parent.a.text in skl_lst:
            abl_lst.append(shred.parent.a.text)
            abl_lst.insert(1, 'Null')
            # Inserts 'Null' as the secondary skill to avoid duplicates.

        return abl_lst
