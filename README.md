<div align="center">
 
 <picture>
   <img src="client/src/assets/ZeleBober.svg" width="20%" style="border: none; box-shadow: none;" alt="Vimo: Chat with Your Videos"/>
 </picture>
 
 <h1>
   Zelebober
   <br/>
   <sub>Share moments, communicate and stay connected</sub>
 </h1>

 <br/>
 
 <p align="center>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" />
  <img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=%23092E20" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
 </p>
</div>

## Overview
ZeleBober is a lightweight full-stack web application featuring a real-time chat and social networking capabilities. It is built using Django for the backend and React for the frontend, fully containerized with Docker for easy deployment.

## Getting Started
To get a local copy up and running, follow these simple steps. This project is fully containerized, so you only need Docker.

### Prerequisites
* **Docker & Docker Compose** - [Download Docker](https://docs.docker.com/get-docker/)

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/olex2211/ZeleBober.git
    cd ZeleBober
    ```

2.  **Set up environment variables**

    Create `.env` file in the root directory and add the following variables:

    ```env
    SECRET_KEY=django-insecure-x4s2y17zku_d-zxpa+tvll9-!6m-)ml8z#yio&2w*8x@$d-be4
    ALLOWED_HOSTS=localhost,127.0.0.1
    ```
    _Note: see `.env.example`_
4.  **Build and run the application**

    Choose the mode that suits your needs:
    
    * **Development Mode (Standard)**

      Uses **Vite** as a proxy server for development. The database is **SQlite**.

      ```sh
      docker compose up --build
      ```

    * **Development Mode (with PostgreSQL)**

       Runs the app with a local **PostgreSQL** container.
    
       > **❗❗❗ Important:** To use this profile, you **MUST** set `DB_ENGINE=postgres` in your `.env` file. The other credentials should be configured according to your preference:
       > ```env
       > DB_ENGINE=postgres
       > DB_USER=admin
       > DB_PASSWORD=admin
       > DB_NAME=postgres
       > ```
    
       Then run:
       ```sh
       docker compose --profile postgres up --build
       ```

    * **Production Mode**
      
       Uses **Nginx** as a reverse proxy to serve the optimized build and static files. **PostgreSQL only**.
      ```sh
      docker compose -f compose.yaml -f compose.prod.yaml up --build -d
      ```

6.  **Access the application**

    The URL depends on the mode you started:

    | Mode | Frontend (Vite) | Backend (API) | Database (Postgres) | Nginx (Reverse Proxy) |
    | :--- | :--- | :--- | :--- | :--- |
    | **Development** | [http://localhost:5173](http://localhost:5173) | [http://localhost:8000](http://localhost:8000) | [http://localhost:5432](http://localhost:5432) | - |
    | **Production** | _Internal_ | _Internal_ | _Internal_ | [http://localhost:8080](http://localhost:8080) |

    > **Note:** In **Production**, direct access to services is closed for security. All requests are routed through **Nginx** on port `8080`.

## Usage

Here are the main ways to use the application:

1.  **Authentication**: Start by registering a new account or logging in with existing credentials.
2.  **Find Friends**: Use the **Search** page to find other users.
3.  **Real-time Chat**: Click on a user to start a conversation. Messages are delivered instantly via WebSockets.
4.  **Social Feed**: Share your thoughts by creating posts. You can view updates from other users in the main feed.
5.  **Profile Management**: Update your profile information and view your own posts.


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## Contact

Project Link: https://github.com/olex2211/ZeleBober