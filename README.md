# paymove-recrutiment

## About The Project
The app is a simpliied second-hand items auction allowing users to sell and buy their items for sale. Unauthorized users can log-in, register and view all items availalbe for sale. To be able to have access to more features a user has to register and log-in. Then users can add items for sale, buy items, view items they've bought, view items they've offered for sale and finally delete items they've added. In addition, users with a role of ADMIN can view all application users and delete every item available for sale.

The Navbar allows to navigate between available functionalities displaying navitagion options based on the user's authorities. Some date is loaded on the application start.


## To start the application
* Clone the repository
* To run server application
  * Open the server folder in your IDE
  * Update Maven
  * Run the application
* To run client application
  * Open the client folder in your IDE
  * run npm install command to load the dependencies
  * run npm start


## Application screenshots

1. Unauthorized user
![1](https://github.com/asynoradzki/paymove-recrutiment/assets/115543941/350c1fd0-0d81-4019-a375-a8cb8f7846a9)

2. Regiser page
![2](https://github.com/asynoradzki/paymove-recrutiment/assets/115543941/f503e464-200c-4e0b-b6c4-109ac3453003)

3. Login page
![3](https://github.com/asynoradzki/paymove-recrutiment/assets/115543941/e7e39f87-f2d7-45f6-aa14-714ffed109a2)

4. User logged-in as ADMIN
![4](https://github.com/asynoradzki/paymove-recrutiment/assets/115543941/a3a6d518-d32b-4609-b786-dff1e88739b3)

## Technical Summary
Frontend:
- [x] written in Typescript / React
- [x] http requests performed in Axios
- [x] syling Styled Components & MUI
- [x] react-router used for navigation
- [x] signed-in user stored in user context
- [x] react-tostify used for UI messaging

Backend:
- [x] JWT token used to authenticate and authorize users
- [x] JWT token persisted in database
- [x] custom JwtAuthenticationFilter implemented
- [x] global Exception handling used @RestControllerAdvice
- [x] Swagger used for endpoint testing

## Built With

<a  href="https://www.typescriptlang.org/"  title="Typescript"><img  src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg"  alt="Typescript"  width="50px"  height="50px"></a>
<a  href="https://reactjs.org/"  title="React"><img  src="https://github.com/get-icon/geticon/raw/master/icons/react.svg"  alt="React"  width="50px"  height="50px"></a>
<a  href="https://en.wikipedia.org/wiki/HTML5"  title="HTML"><img  src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg"  alt="HTML" height="50px"></a>
<a  href="https://en.wikipedia.org/wiki/CSS"  title="CSS"><img  src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg"  alt="CSS" height="50px"></a>
<a  href="https://material-ui.com/"  title="Material UI"><img  src="https://github.com/get-icon/geticon/raw/master/icons/material-ui.svg"  alt="Material UI"  width="50px"  height="50px"></a>
<a  href="https://code.visualstudio.com/"  title="Visual Studio Code"><img  src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg"  alt="Visual Studio Code"  width="50px"  height="50px"></a>
<a  href="https://www.npmjs.com/"  title="npm"><img  src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg"  alt="npm"  width="50px"  height="50px"></a>

Backend:

<a  href="https://www.java.com/"  title="Java"><img  src="https://github.com/get-icon/geticon/raw/master/icons/java.svg"  alt="Java"  width="50px"  height="50px"></a>
<a  href="https://spring.io/"  title="Spring"><img  src="https://github.com/get-icon/geticon/raw/master/icons/spring.svg"  alt="Spring"  width="50px"  height="50px"></a>
<a  href="https://www.postgresql.org/"  title="PostgreSQL"><img  src="https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg"  alt="PostgreSQL"  width="50px"  height="50px"></a>
<a  href="https://www.jetbrains.com/idea/"  title="IntelliJ"><img  src="https://github.com/get-icon/geticon/raw/master/icons/intellij-idea.svg"  alt="IntelliJ"  width="50px"  height="50px"></a>

Other Technologies:

<a  href="https://git-scm.com/"  title="Git"><img  src="https://github.com/get-icon/geticon/raw/master/icons/git-icon.svg"  alt="Git"  width="50px"  height="50px"></a>
<a  href="https://github.com/"  title="github"><img  src="https://github.com/ptatarczuk/Ideas/blob/main/server/images/github.svg"  alt="github"  width="50px"  height="50px"></a>
<a  href="https://swagger.io/"  title="swagger"><img  src="https://github.com/get-icon/geticon/raw/master/icons/swagger.svg"  alt="swagger"  width="50px"  height="50px"></a>
