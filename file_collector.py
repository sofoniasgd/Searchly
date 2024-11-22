import os
from app import db, Document

def populate_db(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.pdf'):
                tin_number = file[:10]  # Assuming the first 10 characters of the filename are the TIN
                file_path = os.path.join(root, file)
                parent_dir = os.path.basename(root)

                # Add the data to the database
                new_doc = Document(
                    tin_number=tin_number,
                    name="Unknown",  # You can modify to fetch name if available
                    location="Unknown",  # Modify to include location if applicable
                    parent_dir=parent_dir,
                    file_path=file_path
                )
                db.session.add(new_doc)

    db.session.commit()
    print("Database populated!")

if __name__ == '__main__':
    # Set the directory where PDFs are stored
    directory = '/path/to/your/pdf/directory'
    populate_db(directory)
