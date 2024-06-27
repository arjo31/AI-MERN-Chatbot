AI Chatbot using MERN (MongoDB, ExpressJS, ReactJS and NodeJS) Stack. Uses Ollama's Microsoft Phi3:mini model as the llm to answer your chats. Only runs locally for now. The server runs on NodeJS and the chats are stored in a MongoDB Database. The frontend is made using ReactJS. I have used JWT Tokens to store the session cookies for a particular user. 

## Run this application : 
1. Navigate to frontend folder
   ```bash
   cd frontend
   ```
2. Install all dependencies :
   ```bash
   npm i
   ```
3. Run the frontend application :
   ```bash
   npm run dev
   ```
4. Navigate back to the backend folder to activate the server
   ```bash
   cd ..
   cd backend
   ```
5. Install all necessary dependencies in the backend folder :
   ```bash
   npm i
   ```
6. Run the server :
   ```bash
   npm run dev
   ```
7. To install the Ollama Models :
   For Windows : Download Ollama from this [link](https://ollama.com/).
   
   For Linux : Run this command in the terminal :
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```
8. Run this command to download the Microsoft Phi3:mini model
   ```bash
   ollama run phi3:mini
   ```
   You can try out other models supported by Ollama from this [link](https://ollama.com/library).
9. Now the web app will run perfectly fine.
