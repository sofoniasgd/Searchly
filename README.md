# Searchly
![Searchly Logo](app/static/images/searchly_logo.png)

### Searchly
Searchly is a lightweight, LAN-accessible document search and PDF viewing tool designed for local environments. It enables users to search for PDF documents by a unique identifier, view files directly in their browser, and simplify access to shared resources on a local network.  

### Features
- Search by Identifier: Quickly find PDF documents by entering a unique identifier (TIN number or similar).  
- Integrated PDF Viewer: View PDF files directly in your browser using PDF.js.  
Static Welcome Document: Displays a default PDF with usage instructions when the app is launched.  
- LAN Accessibility: Designed for local networks, enabling multiple users to access the tool simultaneously.  
- Minimalistic UI: A clean, responsive interface built with Flask, Jinja2, and Bootstrap.

### Technologies Used
#### Backend:

Flask: A lightweight Python web framework.
Python Standard Libraries: For file handling and server-side logic.
#### Frontend:

HTML/CSS and Bootstrap: For responsive design.
JavaScript: For dynamic interactions.

#### Database:

MySQL:  To store metadata for pre-indexed documents.
### Setup and Installation
Clone the Repository:

`git clone https://github.com/sofonoiasgd/searchly.git`
`cd searchly`
Set Up the Environment: Install Python dependencies.

`python -m venv venv`
`source venv/bin/activat`e  # On Windows: `venv\Scripts\activate`
`pip install -r requirements.txt`
Configure Your Environment:

Place your PDF files in a directory (e.g., static/pdfs/).
Run the Application:

`flask run`
Access the app at http://127.0.0.1:5000/.
### Usage
Search for Files:

Enter a unique identifier in the search bar.
Click the search button to locate the corresponding document.
View PDFs:

Click on search results to open the document in the integrated PDF viewer.
Static Welcome Document:

The app loads a default PDF with usage instructions when no search is performed.

### Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

