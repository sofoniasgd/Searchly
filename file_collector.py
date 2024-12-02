import os
from app.app import app, db
from app.app import Documents  # Import your models

# Create an app context for the database
app = create_app()

parent_dir = '/mnt/c/Users/metasebia/Documents/projects/Searchly/test_directory'
woreda_list = os.scandir(parent_dir)
# dict to store the woreda number and the pdfs
master_dict = {}
file_list = []
for woreda in woreda_list:
    woreda_name = woreda.name
    root_path = woreda.path
    # use os.walk to get all the files in the directory
    for root, dirs, files in os.walk(woreda.path):
        file_list = files
    # add paths to the files
    for doc in file_list:
        file_path = os.path.join(root_path, doc)
        if woreda_name in master_dict:
            master_dict[woreda_name].append(file_path)
        else:
            master_dict[woreda_name] = [file_path]

#for woreda in master_dict:
#    print(woreda)
#    print(master_dict[woreda])
#``    print('-----------------------')

# store the data for each woreda
for woreda in master_dict:
    print(f"Adding {woreda} to the database")
    for file_path in master_dict[woreda]:
        file_name = os.path.basename(file_path)
        # create a new document object
        new_document = Documents(tin_number=file_path[:10], name=file_name, location=woreda, parent_dir=parent_dir,
                                 file_path=file_path)
        db.session.add(new_document)
        db.session.commit()
        print(f"Added {file_name} to the database")





