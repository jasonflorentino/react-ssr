# react-ssr

### Playing around with esbuild and rendering React on the server.

### Run locally
- Download/clone this repo
- Install dependencies: `npm i`
- Build the apps: `npm run build`
- Start the server: `npm start`
- Go to http://localhost:4444

### What's going on?
This runs the simple Express server from the bundled and minified code that `esbuild` made inside `/build`. On the root path, the server will use `ReactDOMServer.renderToString()` to render the `<App />` component from `/client` into the HTML doc before returning it in the response. 

Once the `app.js` script is loaded on the client side, (the bundled code from the `client/src/index.tsx` entry point), it will use `ReactDOM.hydrate()` to apply React-y stuff to the existing document (eg. The `useEffect` in `<App />`). The output of hitting this endpoint from somewhere that doesn't run client-side JavaScript (eg. `curl`) wouldn't have the `useEffect` message! Using `hydrate()` means React will use the existing DOM tree to determine what to update. If we instead had the usual `ReactDOM.render()`, the whole DOM tree would be re-rendered, defeating the point of our server-side rendering, and leading to lots of unecessary rendering in more complex applications.

### Notes
- Changing the `OUT_DIR` in `.env` would necessitate changing references to it `package.json` scripts and vice versa.

Reference:  
https://devtails.xyz/how-to-set-up-server-side-rendering-ssr-with-react-and-esbuild  
https://www.digitalocean.com/community/tutorials/react-server-side-rendering

