---
title: 'Backstage: Principles and Approaches'
---

## Description

Backstage is the central tool of the platform, serving as the interface for all components and processes related to development, monitoring, security, and management. Backstage simplifies interaction between developers, managers, and other team members by providing convenient access to project resources, tools, and data.

The goal of using Backstage is to centralize workflows and ensure transparency, convenience, and standardization in project work. Backstage helps unify all aspects of DevOps, GitOps, FinOps, monitoring, and management into a single access point.

**Can there be a platform without Backstage?** — The answer is **yes**. While we are creating a unified project management center, Backstage remains just the “top of the iceberg”—part of the entire ecosystem. Think of Backstage as a bottle that can be filled with either expensive, high-quality wine or sour compote. The value of the platform lies in its content, not the interface. To ensure this content is of high quality, it’s essential to adhere to best practices and standards.

## Key Principles of Using Backstage

**1. Centralization of Information**  
Backstage is a single access point to all resources and tools used in the project. Instead of searching for information in multiple systems, users can manage the project and access all its components through Backstage.

**2. Intuitive Navigation and Accessibility**  
All elements and modules in Backstage are organized so that users can easily find the information they need. The menu structure and component hierarchy help quickly navigate from the general project overview to the details of individual modules.

**3. Transparency and Visualization of Processes**  
Backstage provides visualization of all processes occurring on the platform, including CI/CD, monitoring, security, and budgeting. This allows developers and managers to see the status and progress of the project, simplifying control and management.

**4. Feedback and Improvements**  
Each section of Backstage should include a feedback function that allows users to leave comments and suggest improvements. If users lack something or notice an issue, they can create a task for engineers to improve the platform. It’s important to remember that we strive for our users.

**5. Modularity and Flexibility**  
Backstage is built modularly, allowing for the addition or customization of plugins depending on the specific project’s needs. This makes it easy to scale and adapt the interface to unique client requirements.

**6. One Module — Separate Repository with Documentation**  
Each Backstage module is located in a separate repository and is accompanied by its own documentation. This simplifies management, updating, and reuse of modules.

**7. Implement Practices and Approaches First, Then Integrate with Backstage**  
Before connecting modules to Backstage, it’s important to ensure that all processes and components align with best practices. This way, Backstage becomes a quality interface for already fine-tuned processes.

**8. Automation and Reusability of Modules**  
All modules should be as automated as possible and aimed at reuse. This accelerates development, eases maintenance, and makes the platform more flexible for various projects.

**9. Unified Interface**  
All modules and interfaces in Backstage should be visually unified and intuitively understandable. Maintaining a consistent style and interface structure allows users to quickly navigate and reduces the need for additional training. A unified interface also promotes the perception of the platform as a cohesive product.

### Recommendations and Best Practices for Creating Plugins

**1. Design and Appearance of Modules**  
User experience (UX) is a priority, so each Backstage module should seamlessly integrate into the platform’s interface and be visually familiar to users. The design of modules should reflect the style of the tools they visualize to minimize cognitive load. For example, a module for GitLab should resemble the GitLab interface, and a module for Jira should reflect Jira’s style. This allows users to interact with the system intuitively and experience continuity without spending time adapting to a new interface.

**2. Standardization of the Development Process**  
In Backstage, there are two types of plugins: frontend and backend. Developers should create plugins according to an established template, adding the necessary components. This greatly simplifies further updates and the creation of new plugins.  
	•	Frontend Plugins: Responsible for visualization, processing, receiving, and sending data. They may also include light mathematical computations for real-time data processing.  
	•	Backend Plugins: Perform all requests, computations, and data storage not intended for display. The priority of a backend plugin is working with a database unique to each plugin, which significantly speeds up request processing.  

**3. Module Configuration**  
All configurations should be stored in the `app-config.yaml` file. Module settings should be located in the corresponding section and be universal for several plugins. For example, for plugins interacting with AWS, you can add the region in the parameter `aws.region` to make the configuration convenient and flexible for scaling.  

**4. Documentation**
Documentation should include a description and installation process of plugins. If a plugin has a backend part, the frontend documentation should contain a link to the backend documentation to provide users with complete information on setup and interaction between components.

**5. Security** 
Ensuring the platform’s security is critically important. Key recommendations:  
	•	Authentication and Authorization: Each plugin should adhere to access policies to restrict access to confidential data only to authorized users. Use Backstage’s common authentication system to avoid duplicating authorization logic.  
	•	Configuration Protection: Avoid storing confidential data in plain text in the code. Use environment variables or secret management systems to store credentials and access keys.  
	•	Encryption: Encrypt all transmitted data, especially those passing over the network. Use HTTPS and other encryption protocols to ensure data security.  

**6. Performance Optimization**  
Plugin performance should be a priority, especially if the plugin processes large volumes of data or makes frequent requests to external services.  
	•	Caching: Use caching to store intermediate results and reduce server load, especially when working with data that doesn’t update frequently.  
	•	Request Aggregation: Optimize API requests by combining multiple requests into one when possible.  
	•	Asynchronicity: Use asynchronous operations for backend plugins to avoid blocking processes.  

**7. Monitoring and Logging**  
Ensuring visibility of plugin operation helps timely detect and resolve issues.  
	•	Monitoring: Add support for monitoring plugins using tools like Prometheus or Grafana. This allows tracking load, response time, and other important metrics.  
	•	Logging: Use structured logs with metadata (e.g., timestamp, userID, pluginID) to facilitate problem searching and plugin performance analysis. Logs should be convenient for viewing and analysis both in real-time and for retrospective analysis.  

**8. Dependency Management and Updates**  
	•	Dependency Cleanliness: Limit plugin dependencies to only necessary components for operation. This helps reduce the plugin size and eases its maintenance.  
	•	Automated Updates: Use tools to automate dependency updates, such as Renovate or Dependabot. This will keep the plugin up-to-date and quickly update important dependencies, for example, when new security versions are released.  

**9. Testing and Quality Assurance**  
Ensuring code quality helps avoid bugs and improve user experience.  
	•	Unit Tests: Each plugin should have a basic set of unit tests covering key functions.  
	•	Integration Tests: Integration testing allows checking how plugins work together, especially in cases where frontend and backend parts are tightly integrated.  
	•	Code Review: Conduct code reviews for each new feature or significant changes. This helps improve code quality and ensure compliance with platform standards.  
	•	Microservice Architecture: Using a microservice architecture for plugins ensures their independence from each other and simplifies scaling individual components.  

**10. Inter-Plugin Integration**  
When creating a new plugin, it’s important to anticipate its interaction with other plugins.  
	•	API Interaction: Plugins should interact through APIs to ensure modularity and extensibility. APIs for each plugin should be documented.  
	•	Compatibility: Ensure compatibility between plugins that are often used together. For example, plugins for user management should integrate with plugins for access management or task tracking.  

## Instructions and Assets

**How to Set Up Backstage on a Project**  
•	[Getting Started: Backstage Getting Started Guide](https://backstage.io/docs/getting-started/)  
•	[Key Concepts: Backstage Key Concepts](https://backstage.io/docs/getting-started/concepts)  
•	[ITSyndicate - How to Install Backstage](https://youtu.be/7wff_5D0yBw)


**Adding New Components**  
•	[Existing Component Registration: Component Registration](https://backstage.io/docs/getting-started/register-a-component)  
•	[Create a Component: Creating a New Component](https://backstage.io/docs/getting-started/create-a-component)  

**Adding New Plugins**  
•	[ChatGPT Backstage.io Plugin: Installation, Configuration & Usage: ChatGPT Plugin Guide](https://www.youtube.com/watch?v=6xTDl7BUOdU)  

**Updating Documentation in Backstage**  
Recommendations on storing and updating documentation in App Development and other sections.  
•	[TechDocs Documentation: Backstage TechDocs](https://backstage.io/docs/features/techdocs/)  

**Authentication and Integrations**  
•	[Authentication in Backstage: Authentication Guide](https://backstage.io/docs/auth/)  
•	[Organizations and Locations: Managing Organizations and Locations](https://backstage.io/docs/integrations/)  