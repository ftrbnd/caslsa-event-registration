# CSLSA Event Registration System
## Product Overview
 This product was created for the California Surf Lifesaving Association (CSLSA), as a semester project for CECS 443 - Software Project Management and Testing. With this system, members of the Association will be able to log in and view their membership information, and register for upcoming events.
 ## Installation
 ### Local
 1. Clone the repository onto your computer using the terminal: 
 `git clone https://github.com/ftrbnd/caslsa-event-registration.git`
 2. Install [Node.js](https://nodejs.org/en/download/)
 3. Install [Visual Studio Code](https://code.visualstudio.com/download)
 4. Open VS Code, and open the **caslsa-event-registration** folder.
 5. Inside the **backend/caslsa_backend** folder, run `npm i` to install all dependencies.
 6. Create a new `.env` file
 7. Inside the file, enter the database username, password, and jwt secret that were supplied to you.
 
 `DB_USERNAME=username`
 
 `DB_PASSWORD=password`
 
 `JWT_SECRET=secret`
 
 8. While you are still in the **backend/caslsa_backend** folder, run `npm run start` in your terminal.
 9. Open another terminal window, and navigave to the **frontend/caslsa_client** folder.
 10. Run `npm i` again to install the frontend dependencies.
 11. Once all dependencies have been installed, run `npm start`. You will be asked to run the app on another port, since the backend is currently running on port 3000. Enter **Y**.
 12. Success! A new tab should have opened in your browser, and you can now access the registration system.

### Remote
- A remotely hosted website has not yet been implemented.

## Database Access
1. Sign in to [MongoDB](https://account.mongodb.com/account/login) using the credentials that were supplied to you.
2. Click on the **Browse Collections** tab.
3. From there, you have direct access to the **events** and **users** collections, and can make changes as you please.
