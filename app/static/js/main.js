document.addEventListener('DOMContentLoaded', () => {
    // Load the default PDF on page load
    const defaultPdfUrl = '/static/default.pdf';
    const resultContainer = document.getElementById('result-container');
    displayPdf(defaultPdfUrl, resultContainer);
});

document.getElementById('search_button').addEventListener('click', () => {
    const tinNumber = document.getElementById('searchinput').value.trim();
    const resultContainer = document.getElementById('result-container');
    const alertBox = document.getElementById('alert-box');


    console.log('Searching for TIN:', tinNumber);

    if (!/^\d{10}$/.test(tinNumber)) {
        // wrong TIN format alert
        createAutoCloseAlert('warning', 'please enter a valid <strong>TIN</strong> number');
    } else {
        // clear the canvas if it has a pdf
        if (resultContainer != null && resultContainer.innerHTML !== '') {
            resultContainer.innerHTML = '<canvas id="pdf-canvas"></canvas>';
        }
        // clear the alert box
        if (alertBox != null && alertBox.innerHTML !== '') {
            alertBox.innerHTML = '';
        }
        // show the loader
        resultContainer.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
        // do a health check on the TIN
        // like checking if the TIN is in the database and if the pdf exists
        fetch(`/api/check/${tinNumber}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    createAutoCloseAlert('danger', 'An error occurred while checking the TIN');
                }
            })
            .then(data => {
                // show warning depending on the response
                if (data.error) {
                    // document not found or record not found
                    if (data.error === 'Tin not on record') {
                        createAutoCloseAlert('warning', 'TIN not found', 10000);
                    } else if (data.error === 'Document not found') {
                    createAutoCloseAlert('warning', 'Document not found');
                    }
                } else if (data.success) {
                    // do another fetch to get the pdf
                    fetch(`/api/search/${tinNumber}`)
                    .then(response => {
                        if (response.ok) {
                            return response.blob();
                        } else {
                            throw new Error('Document not found');
                        }
                    })
                    .then(blob => {
                        // Display the PDF using PDF.js
                        const pdfUrl = URL.createObjectURL(blob);
                        displayPdf(pdfUrl, resultContainer);
                    })
                }
            }
            )
            .catch(error => {
                console.error('Error:', error);
                createAutoCloseAlert('danger', 'An error occurred while checking the TIN');
                resultContainer.innerHTML = '';
            }
            );
    }
}
);

// creates alerts
function createAutoCloseAlert(type, message, timeout = 5000) {
  const alertContainer = document.getElementById('alert-box');
  existingAlert = document.getElementById('alertid');
  // remove existing alert if user is button happy
  if (existingAlert) {
    existingAlert.remove();
  }
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.id = 'alertid';
  alertDiv.innerHTML = `
    <img src = "static/images/exclamation-circle.svg"/>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  console.log('added alert to the alert box');
  alertContainer.appendChild(alertDiv);
  // Automatically close the alert after timeout
  setTimeout(() => {
    console.log('closing alert in ${timeout}ms');
    alertDiv.remove();
  }, timeout);
  }


// pdf display function
function displayPdf(pdfUrl, container) {
    const canvas = document.getElementById('pdf-canvas');
    const loadingTask = pdfjsLib.getDocument(pdfUrl);

    loadingTask.promise.then(pdf => {
        // Load the first page
        pdf.getPage(1).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext('2d');
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }).catch(error => {
        container.innerHTML = `<p class="text-danger">Error loading PDF: ${error.message}</p>`;
    });
}