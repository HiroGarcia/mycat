### Step 1: Create the Project Directory

1. Open your terminal or command prompt.
2. Run the following commands to create a new directory and navigate into it:

   ```bash
   mkdir my-node-ts-app
   cd my-node-ts-app
   ```

### Step 2: Initialize a New Node.js Project

3. Initialize a new Node.js project by running:

   ```bash
   npm init -y
   ```

### Step 3: Install Necessary Packages

4. Install the required packages for your project:

   ```bash
   npm install express sqlite3 body-parser cors
   npm install --save-dev typescript ts-node @types/node @types/express @types/cors @types/body-parser
   ```

### Step 4: Initialize TypeScript

5. Initialize TypeScript in your project:

   ```bash
   npx tsc --init
   ```

### Step 5: Update `tsconfig.json`

6. Open the `tsconfig.json` file and update it to include the following settings:

   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```

### Step 6: Create the Project Structure

7. Create the necessary directory structure:

   ```bash
   mkdir -p src/controllers src/models src/routes src/services src/database dist
   ```

### Step 7: Create the Database Connection

8. Create a file named `db.ts` in the `src/database/` directory and add the following code:

   ```typescript
   import sqlite3 from 'sqlite3';
   import { open } from 'sqlite';

   const dbPromise = open({
       filename: './database.sqlite',
       driver: sqlite3.Database
   });

   export const initDb = async () => {
       const db = await dbPromise;
       await db.exec(`
           CREATE TABLE IF NOT EXISTS users (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               username TEXT NOT NULL UNIQUE,
               password TEXT NOT NULL
           );
       `);
   };

   export const getDb = () => dbPromise;
   ```

### Step 8: Create the User Model

9. Create a file named `userModel.ts` in the `src/models/` directory and add the following code:

   ```typescript
   import { getDb } from '../database/db';

   export interface User {
       id?: number;
       username: string;
       password: string;
   }

   export const createUser = async (user: User) => {
       const db = await getDb();
       await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, user.password]);
   };

   export const getUserByUsername = async (username: string) => {
       const db = await getDb();
       return await db.get('SELECT * FROM users WHERE username = ?', [username]);
   };

   export const getAllUsers = async () => {
       const db = await getDb();
       return await db.all('SELECT * FROM users');
   };
   ```

### Step 9: Create the User Controller

10. Create a file named `userController.ts` in the `src/controllers/` directory and add the following code:

    ```typescript
    import { Request, Response } from 'express';
    import { createUser, getUserByUsername, getAllUsers } from '../models/userModel';

    export const registerUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            await createUser({ username, password });
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error registering user', error });
        }
    };

    export const loginUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (user && user.password === password) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    };

    export const listUsers = async (req: Request, res: Response) => {
        const users = await getAllUsers();
        res.status(200).json(users);
    };
    ```

### Step 10: Create the User Routes

11. Create a file named `userRoutes.ts` in the `src/routes/` directory and add the following code:

    ```typescript
    import { Router } from 'express';
    import { registerUser, loginUser, listUsers } from '../controllers/userController';

    const router = Router();

    router.post('/register', registerUser);
    router.post('/login', loginUser);
    router.get('/users', listUsers);

    export default router;
    ```

### Step 11: Set Up the Express Application

12. Create a file named `app.ts` in the `src/` directory and add the following code:

    ```typescript
    import express from 'express';
    import bodyParser from 'body-parser';
    import cors from 'cors';
    import userRoutes from './routes/userRoutes';
    import { initDb } from './database/db';

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', userRoutes);

    app.listen(PORT, async () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        await initDb();
        console.log('Database initialized');
    });
    ```

### Step 12: Run the Application

13. Compile TypeScript and run the application:

    ```bash
    npx ts-node src/app.ts
    ```

### Step 13: Test the API

You can now test the API using a tool like Postman or curl:

- **Register a user**:
  - POST to `http://localhost:3000/api/register` with JSON body:
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```

- **Login a user**:
  - POST to `http://localhost:3000/api/login` with JSON body:
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```

- **List all users**:
  - GET to `http://localhost:3000/api/users`.

### Conclusion

You have successfully created a basic Node.js application with a complete MVC structure using TypeScript and SQLite. You can expand this application by adding more features as needed.