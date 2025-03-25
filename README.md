🍔 Burger Restaurant Page


**Description**

A full-stack application built using React, Node.js with Express, and a MongoDB database.
All data is stored in MongoDB.
<br><br>


It allows users to:

✅ Register and log in

✅ Browse products

✅ Manage their cart

✅ Add personalized products to their cart

✅ Finalize the order
<br><br>


The administrator has the ability to:

🔧 Edit and add products

🔧 Manage product add-ons

⚠️ Note: The application is under continuous development, with new functionalities being added soon.
<br><br>


🚀 How to Run This App


1️⃣ Clone the repository

  - git clone https://github.com/TomekBekus02/BurgerApp.git
  - cd BurgerApp


2️⃣ Backend setup

  - cd backend            # Navigate to the backend folder
  
  - cp .env.example .env  # create new file .env and copy env.exmaple file into it

Edit .env file (set your session key, jwt key and uri dataBase)

  - npm install           # Install dependencies  

  - npm start             # Start the backend  

After running npm start, you should see "Database Connected" in your terminal.


3️⃣ Frontend setup (in a new terminal)

  - cd frontend      # Navigate to the frontend folder  

  - npm install      # Install dependencies  

  - npm run dev      # Start the frontend  
<br><br>

🔐 Access to Admin panel <br>
1️⃣ By default after signing in your role is set to 'user' <br>
2️⃣ To access to Admin panel, you have to change the user's role to "admin" in 'users' collection in MongoDB <br>




