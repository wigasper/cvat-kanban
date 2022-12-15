# User interface organization

src
├── components
│   ├── app.css
│   ├── app.js
│   ├── header.js
│   ├── kanban-page
│   │   ├── add-card-modal.js
│   │   ├── kanban-card.css
│   │   ├── kanban-card.js
│   │   ├── kanban-column.css
│   │   ├── kanban-column.js
│   │   └── kanban-page.js
│   └── login
│       └── login-page.js
├── constants.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
├── services
│   ├── board.js
│   ├── card.js
│   ├── column.js
│   ├── login.js
│   └── logout.js
└── setupTests.js

Hopefully, organization is self-explanatory. `components` contains the main `app.js` and 
`header.js` components in the base dir, with Kanban board components in `kanban-page`
and the login component in `login`. `services` contains logic for API calls for relevant
endpoints.

### Relevant "Create React App"-generated content

I did not write this

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
