import csv
import os
from pfDataPrep import dataDefiner
from scrapHeap import tbl_scraper


def filepicker(file_type, fileDir):
    # How the user chooses which csv to write to
    sheet_lst = []
    counter = 1
    # iterator
    print("Select", file_type, " from list, if file does not exist type '0'.")
    # Prints the file type searched for and some text
    for file_inst in os.listdir(fileDir):
        # Looks for every instance of the directory listed
        if file_type in file_inst:
            # Verifies file is the same type as passed
            print("[", counter, "]", file_inst)
            # prints a cute little thing that lets you choose
            file_inst = fileDir + '/' + file_inst
            # Makes a valid path to search in Python
            counter += 1
            sheet_lst.append(file_inst)
            # returns list of files in directory
    return sheet_lst
# This could probably eat some lines from csvwriter for posterity
# This is being pulled AFTER the text prompt for some reason.


def csvwriter(mosaic):
    sheet_lst = filepicker('.csv', './csv')
    # summons the filePicker, looking for .csv files in the directory csv
    with open(sheet_lst[int(input()) - 1], 'w') as opencsv:
        # Opens the file chosen from the list given from filepicker
        writer = csv.writer(opencsv)
        # Creates the writer with the file passed
        writer.writerow(mosaic.col)
        # Writes the columns
        for z in range(len(mosaic.row)):
            writer.writerow(mosaic.row[z])
            # Writes the rows

        """Defines csvWriter function, pulls header and Character Stats
        This will be used as a 'Random Encounter' Generator using 
        Pathfinder 2E recommendations. """


if __name__ == "__main__":
    csvwriter(dataDefiner(tbl_scraper('https://pf2.d20pfsrd.com/class')))
