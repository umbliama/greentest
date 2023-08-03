# Asynchronous Task Processing with Node.js and RabbitMQ

This project demonstrates an example of asynchronous task processing using Node.js and RabbitMQ. It consists of two microservices, M1 and M2, that communicate via RabbitMQ for task processing.

## Overview

The project implements a simple task processing system with two microservices:

- M1: Handles incoming HTTP requests and publishes tasks to RabbitMQ.
- M2: Listens for tasks in RabbitMQ, processes them, and sends back the results.

## Installation

To install and set up the project, follow these steps:

git clone https://github.com/umbliama/greentest
cd greentest
npm install
brew update
brew install rabbitmq
brew services start/restart/stop rabbitmq
npm run start
npm run test
