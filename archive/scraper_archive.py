import requests
import re
import csv
import os
from bs4 import BeautifulSoup



class pfData:
    def __init__(self):
        self.col = []
        self.row = []

    def add_Col(self, col_Name):
        self.col.append(col_Name)

    def add_Row(self, row_Name):
        self.row.append(row_Name)


def webScraper(web_source):
    f = requests.get(web_source)
    a_lst, link_lst = ['Name'], ['Link']
    soup = BeautifulSoup(f.content, 'lxml')

    for char_class in soup.find(['table']).find_all('tr'):
        if 'Paizo' in char_class.text:
            for link in char_class.find_all('a', attrs={'href': re.compile(web_source)}):
                a_lst.append(link.text)
                link_lst.append(link.get('href'))
    webScraps=list(zip(a_lst, link_lst))
    print(webScraps[1])
    return webScraps


def filepicker(file_type, fileDir):
    sheet_lst = []
    counter = 1
    print("Select", file_type, " from list, if file does not exist type '0'.")
    for chosenFile in os.listdir(fileDir):
        if file_type in chosenFile:
            print("[", counter, "]", chosenFile)
            chosenFile = fileDir + '/' + chosenFile
            counter += 1
            sheet_lst.append(chosenFile)
    return sheet_lst


def csvwriter(mosaic):
    sheet_lst = filepicker('.csv', './csv')
    with open(sheet_lst[int(input()) - 1], 'w') as opencsv:
        # create the csv writer
        writer = csv.writer(opencsv)
        # write a row to the csv file
        writer.writerow(mosaic.col)
        for z in range(len(mosaic.row)):
            writer.writerow(mosaic.row[z])



        """Defines csvWriter function, pulls header and Character Stats
        This will be used as a 'Random Encounter' Generator using 
        Pathfinder 2E recommendations. """


def class_Definer(scraps):
    mosaic = pfData()

    for morsel in range(len(scraps[0])):
        mosaic.add_Col(scraps[0][morsel])
        print(mosaic.col)

    scraps.pop(0)

    for morsel in range(len(scraps)):
        mosaic.add_Row(scraps[morsel])
        print(mosaic.row)

    return mosaic




# https://pf2.d20pfsrd.com/class
# https://pf2.d20pfsrd.com/ancestry/
# https://pf2.d20pfsrd.com/background/
print("Insert weblink to scrape")
csvwriter(class_Definer(webScraper(input())))


#csvwriter(webScraper(input()))
def listbuilder(prompt_set):
    char_poll = []
    # answer list for the prompt below.
    for x in prompt_set:
        print(x)
        char_poll.append(input())
    return char_poll
