# Food Delivery Service Management Software

A webapp created using ReactJS for the frontend and Flask for the backend.

## Installation

### Prerequisites
- Python 3.8
- virtualenv (a tool to create Python Virtual Environment)
    ```Shell
    pip install virtualenv
    ```

### Clone this repository
Move to your workspace directory and clone this repository
```Shell
git clone https://github.com/iamakthecoder/Food_delivery_management.git
```

### Create the virtual environment and activate it
```Shell
virtualenv -p python3.8 env
source env/bin/activate
pip install -e git+https://github.com/ekalinin/nodeenv.git#egg=nodeenv
nodeenv myenv
. myenv/bin/activate
```

### Install dependencies
Move to the cloned repository directory `Food_delivery_management`, and run
```Shell
pip install -r requirements.txt
```

## Getting Started
Activate the virtual environment (as described above), with the dependencies installed, in two terminals.

Move to the cloned repository directory `Food_delivery_management` in both the terminals.

Then, in the first terminal, run
```Shell
npm run start-flask-api
```
And in the second terminal, run
```Shell
npm install
npm start
```

This will open up the webapp in the browser.
  
<br>
<br>

## Team Members
- [Apoorv Kumar](https://www.github.com/iamakthecoder)
- [Ronit Nanwani](https://www.github.com/ronitnanwani)
- [Om Sadhwani](https://www.github.com/OmSadhwani)