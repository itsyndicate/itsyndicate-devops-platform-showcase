# ITSyndicate Developer Platform

The ITSyndicate DevOps Platform is a comprehensive solution designed to streamline and enhance project management, infrastructure provisioning, CI/CD, monitoring, security, and cost optimization processes. Built on industry best practices like DevOps, GitOps, FinOps, SRE, and DevSecOps, our platform is tailored to meet the unique needs of each client while maintaining scalability, security, and efficiency.

## Key Features:

•	Unified Management Interface: A centralized platform to manage resources, tasks, and infrastructure with ease.  
•	CI/CD Integration: Automates deployment pipelines to ensure faster, error-free releases.  
•	Cost Transparency and Optimization: Provides detailed insights into project expenses, along with recommendations for cost-saving measures.  
•	Enhanced Security: Implements DevSecOps principles with automated vulnerability scanning, role-based access control, and compliance checks.  
•	Scalable Infrastructure: Uses Infrastructure as Code (IaC) to manage and provision infrastructure that adapts to project needs.  
•	Monitoring, logging, and Alerts: Real-time observability and alerts to detect and resolve issues proactively.  
•	Task management: It is possible to integrate your task system into the platform.  
•	Documentation: The right approach to maintaining documentation on a project.  

## Demo Platform

Experience our platform firsthand! Visit our demo platform and log in as a guest, or integrate the platform into your project to explore its features, documentation, user interface, and workflows. The demo showcases how ITSyndicate approaches platform building and integrates advanced DevOps practices.

**The easiest way to try our showcase is to follow the link:** https://demoplatform.itsyndicate.org/

## Prerequisites

Before starting, make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22.5 or higher)
- [Docker](https://www.docker.com/get-started) (optional, for containerized services)

## Getting Started

### Step 1: Clone the Repository

Clone the ITSyndicate Developer Platform repository from GitLab:

```sh
$ git clone https://github.com/itsyndicate/itsyndicate-devops-platform-showcase.git
$ cd demo
```

### Step 2: Install Dependencies

Use Yarn to install the required dependencies:

```sh
$ yarn install
```

### Step 3: Set Up Environment Variables

Rename the `.env.sample` file to `.env`:

```sh
$ mv .env.sample .env
```

Update the environment variables in the `.env` file as needed. Then export them:

```sh
$ export $(cat .env | xargs)
```


### Step 4: Start the Development Server

To start the Backstage development server, run the following command:

```sh
$ yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building the Application

To build the application for production, use:

```sh
$ yarn build
```

This command will generate static assets in the `packages/app/dist` directory.

## Running with Docker



### Step 1: Build backstage

Use Yarn to build backstage with the appropriate configuration:

```sh
$ yarn build:backend --config ../../app-config.yaml --config ../../app-config.production.yaml
```

### Step 2: Build the Docker Image

To build the Docker image for backstage, run:

```sh
$ docker image build . -f packages/backend/Dockerfile --tag backstage
```

### Step 3: Run the Docker Container with PostgreSQL

Run the application in a Docker container:

```sh
$ docker run -it -p 7007:7007 --env-file .env backstage
```

Docker is always configured for production use, and requires PostgreSQL as the database. Ensure your `.env.production` file contains the correct PostgreSQL connection settings.

## Contributing

Contributions are welcome! Please follow our [contributing guidelines](CONTRIBUTING.md) for details on our code of conduct, pull request process, and more.

## Documentation

For more information about using and customizing Backstage, check out the official [Backstage documentation](https://backstage.io/docs).

