class PfData:
    def __init__(self):
        self.col = []
        self.row = []
        # Defines the row and column object types

    def add_Col(self, col_Name):
        self.col.append(col_Name)
        # Defines the ability to add columns to the object

    def add_Row(self, row_Name):
        self.row.append(row_Name)
        # Defines the ability to add rows to the object


def dataDefiner(scrapHeap):
    # Converts given input into a database friendly format.
    mosaic = PfData()
    # Creates instance of pfData as a 'mosaic'

    for morsel in range(len(scrapHeap[0])):
        # Measures length of position 0 in the list.
        mosaic.add_Col(scrapHeap[0][morsel])
        # Adds all items from this position into the column.

    scrapHeap.pop(0)
    # Removes the position containing column data.

    for morsel in range(len(scrapHeap)):
        # Measures and iterates off of the length of a list.
        mosaic.add_Row(scrapHeap[morsel])
        # Adds list items to a row.
    return mosaic
# Could probably be included in the class, I'm a dunce tho

