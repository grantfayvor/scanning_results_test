# Scanning Results

## INSTALLATION & SETUP
* [Local](#local-setup)
* [Docker](#docker-setup)

### Local Setup
The application can be setup locally by following the steps below -   
* Clone the online repository by running ```git clone https://github.com/grantfayvor/scanning_results_test.git```
* Open the project in a terminal and change directory into the api project ```cd api```
* Run ```npm install``` in the terminal
* Run ``` npm start``` in the terminal
* Open the project in a new terminal and change directory into the dashboard project ```cd dashboard```
* Run ```npm install``` in the terminal
* Run ```npm start``` in the terminal

### Docker Setup
To run the docker containers (assuming docker is already setup on your machine), follow the steps below -   
* Clone the online repository by running ```git clone https://github.com/grantfayvor/scanning_results_test.git```
* Open the project in a terminal
* Run the docker command to build the api image ```docker build -t guardrails_api ./api```
* Run the docker command to build the dashboard image ```docker build -t guardrails_dashboard ./dashboard```
* Run the docker compose service ```docker-compose up```
A script is made available to aggregate the commands and you can simply run the bash scripts
```bash ./build-images.sh``` and then run ```bash ./start-app.sh```

The project will be available at [localhost:3000](localhost:3000) while the api will be running on [localhost:9000](localhost:9000)