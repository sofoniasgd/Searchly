document.getElementById('search_button').addEventListener('click', () => {
    const tinNumber = document.getElementById('searchinput').value.trim();
    const resultContainer = document.getElementById('result-container');
    const alertBox = document.getElementById('alert-box');


    console.log('Searching for TIN:', tinNumber);

    if (!/^\d{10}$/.test(tinNumber)) {
        // wrong TIN format alert
        createAutoCloseAlert('warning', 'please enter a valid <strong>TIN</strong> number');
    } else {
        // clear the result container
        if (resultContainer != null && resultContainer.innerHTML !== '') {
            resultContainer.innerHTML = '';
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
        // make the api call
        fetch(`/api/search/${tinNumber}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // show error alert
                    createAutoCloseAlert('danger', data.error);
                } else {
                    // show the result
                    resultContainer.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title
                                ">TIN Details</h5>
                                <p class="card-text">TIN: ${data.tin}</p>
                                <p class="card-text">Name: ${data.name}</p>
                                <p class="card-text">Address: ${data.address}</p>
                                <p class="card-text">Phone: ${data.phone}</p>
                                <p class="card-text">Email: ${data.email}</p>
                            </div>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                createAutoCloseAlert('danger', 'An error occurred while fetching the TIN details');
                resultContainer.innerHTML = '';
            });
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
