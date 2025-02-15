📱 Mobile App Development Team Challenge
🚀 Project Overview
Welcome to the Mobile App Development Team Challenge! In this project, you will work as a team of three developers to build a simple Contact Management App that performs CRUD operations (Create, Read, Update, Delete) on contacts using a custom API built with Retool API Generator.

🏆 Learning Goals
Collaborate using Git & GitHub in a single shared repository.
Learn merge conflict resolution through hands-on experience.
Develop a mobile application with UI, navigation, and API integration.
Build and connect to a custom API using Retool API Generator.

🛠️ Tech Stack
Frontend: React Native (Expo) or an equivalent mobile framework.
Backend API: Custom API built using Retool API Generator.
Version Control: Git & GitHub (all working in a single shared repository).

🔧 Step 1: Set Up Your Repository
1️⃣ Repository Creation
One team member ("Merge Manager") creates a GitHub repository.
Invite all team members as collaborators.
Everyone clones the repository to their local machine using:
git clone <repository-url>
2️⃣ Git Collaboration Workflow (No Branches!)
Pull before you code:
git pull 
Stage & Commit regularly:
git add relevant files
git commit with relevant "Your commit message"
Push after committing:
git push 
If a merge conflict occurs: Follow instructions in the terminal, resolve the conflict manually in your code editor, then:
resolve it (manual check on the changes)

🌍 Step 2: Design & Deploy Your API
1️⃣ Set Up Retool API Generator
Go to Retool API Generator and create a new API.
Define the following endpoints:
GET /contacts → Retrieve all contacts
POST /contacts → Add a new contact
PUT /contacts/:id → Update a contact
DELETE /contacts/:id → Delete a contact
Deploy the API and get the Base URL.
Share the Base URL with the team and store it in a .env file (e.g., API_BASE_URL=<your-retool-api-url>).

📱 Step 3: Develop the Mobile App (Parallel Work)
1️⃣ UI/Navigation Developer
Create the Home Screen to display contacts.
Build the Add Contact and Edit Contact screens.
Implement navigation between screens.
2️⃣ API Integrator
Fetch and display contact data using GET /contacts.
Implement POST /contacts to add a new contact.
Implement PUT /contacts/:id to update contacts.
Implement DELETE /contacts/:id to remove contacts.
3️⃣ Merge Manager
Ensure smooth Git collaboration (pull before push, help resolve conflicts).
Test API responses using Postman or a browser.
Merge and finalize team code.

🕒 Development Timeline
Step 1: Setup & Initial Code
✅ Clone repository & set up Retool API
✅ UI developer starts designing screens
✅ API integrator connects to Retool API
✅ First push & pull cycle (introducing Git collaboration)

Step 2: CRUD Features & Git Conflict Resolution
✅ Implement "Add Contact" feature
✅ Implement "Edit Contact" feature
✅ Merge conflicts (handled manually)

Step 3: Finalizing App & Presentation
✅ Implement "Delete Contact" feature
✅ Final testing & debugging
✅ Team demo & presentation

📢 Final Steps: Demo & Submission
Ensure the app is functional and connected to the API.
Each team member presents their role in development.
🎯 Tips for Success
🔹 Communicate regularly to avoid unnecessary merge conflicts.
🔹 Pull changes before pushing to prevent overwriting teammates’ code.
🔹 Test your API with Postman before implementing it in your app.
🔹 Keep commits small and meaningful (e.g., Added Home Screen UI).
🔹 Ask for help if you're stuck—this is a learning experience! 🚀

Good luck and happy coding! 🚀
