const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common.js");

// const getAddons = (addonsArgs) => {
//   //   "scripts": {
//   //   "build:analyze": "npm run build -- --env addon=bundleanalyze"
//   // },
//   const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

//   return addons.filter(Boolean).map((name) => require(`./addons/webpack.${name}.js`)) || [];
// };

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonConfig, envConfig);
  // return merge(commonConfig, envConfig, ...getAddons(addon || []));
};

// Server-side vs Client-side
// The first big thing to understand about this is that there are now 2 places where the URL is interpreted, whereas there used to be only 1 in 'the old days'. In the past, when life was simple, some user sent a request for http://example.com/about to the server, which inspected the path part of the URL, determined the user was requesting the about page, and then sent back that page.

// With client-side routing, which is what React Router provides, things are less simple. At first, the client does not have any JavaScript code loaded yet. So the very first request will always be to the server. That will then return a page that contains the needed script tags to load React and React Router, etc. Only when those scripts have loaded does phase 2 start. In phase 2, when the user clicks on the 'About us' navigation link, for example, the URL is changed locally only to http://example.com/about (made possible by the History API), but no request to the server is made. Instead, React Router does its thing on the client-side, determines which React view to render, and renders it. Assuming your about page does not need to make any REST calls, it's done already. You have transitioned from Home to About Us without any server request having fired.

// So basically when you click a link, some JavaScript runs that manipulates the URL in the address bar, without causing a page refresh, which in turn causes React Router to perform a page transition on the client-side.

// But now consider what happens if you copy-paste the URL in the address bar and e-mail it to a friend. Your friend has not loaded your website yet. In other words, she is still in phase 1. No React Router is running on her machine yet. So her browser will make a server request to http://example.com/about.

// And this is where your trouble starts. Until now, you could get away with just placing a static HTML at the webroot of your server. But that would give 404 errors for all other URLs when requested from the server. Those same URLs work fine on the client-side, because there React Router is doing the routing for you, but they fail on the server-side unless you make your server understand them.

// Combining server- and client-side routing
// If you want the http://example.com/about URL to work on both the server- and the client-side, you need to set up routes for it on both the server- and the client-side. It makes sense, right?

// And this is where your choices begin. Solutions range from bypassing the problem altogether, via a catch-all route that returns the bootstrap HTML, to the full-on isomorphic approach where both the server and the client run the same JavaScript code.

// Bypassing the problem altogether: Hash History
// With Hash History, instead of Browser History, your URL for the about page would look something like this: http://example.com/#/about

// The part after the hash (#) symbol is not sent to the server. So the server only sees http://example.com/ and sends the index page as expected. React Router will pick up the #/about part and show the correct page.

// Downsides:

// 'ugly' URLs
// Server-side rendering is not possible with this approach. As far as search engine optimization (SEO) is concerned, your website consists of a single page with hardly any content on it.
// Catch-all
// With this approach, you do use the Browser History, but just set up a catch-all on the server that sends /* to index.html, effectively giving you much the same situation as with Hash History. You do have clean URLs however and you could improve upon this scheme later without having to invalidate all your user's favorites.

// Downsides:

// More complex to set up
// Still no good SEO
// Hybrid
// In the hybrid approach, you expand upon the catch-all scenario by adding specific scripts for specific routes. You could make some simple PHP scripts to return the most important pages of your site with content included, so Googlebot can at least see what's on your page.

// Downsides:

// Even more complex to set up
// Only good SEO for those routes you give the special treatment
// Duplicating code for rendering content on server and client
// Isomorphic
// What if we use Node.js as our server so we can run the same JavaScript code on both ends? Now, we have all our routes defined in a single react-router configuration and we don't need to duplicate our rendering code. This is 'the holy grail' so to speak. The server sends the exact same markup as we would end up with if the page transition had happened on the client. This solution is optimal in terms of SEO.

// Downsides:

// Server must (be able to) run JavaScript. I've experimented with Java in conjunction with Nashorn, but it's not working for me. In practice, it mostly means you must use a Node.js based server.
// Many tricky environmental issues (using window on server-side, etc.)
// Steep learning curve
// Which should I use?
// Choose the one that you can get away with. Personally, I think the catch-all is simple enough to set up, so that would be my minimum. This setup allows you to improve on things over time. If you are already using Node.js as your server platform, I'd definitely investigate doing an isomorphic app. Yes, it's tough at first, but once you get the hang of it it's actually a very elegant solution to the problem.

// So basically, for me, that would be the deciding factor. If my server runs on Node.js, I'd go isomorphic; otherwise, I would go for the Catch-all solution and just expand on it (Hybrid solution) as time progresses and SEO requirements demand it.

// If you'd like to learn more about isomorphic (also called 'universal') rendering with React, there are some good tutorials on the subject:

// React to the future with isomorphic apps
// The Pain and the Joy of creating isomorphic apps in ReactJS
// How to Implement Node + React Isomorphic JavaScript & Why it Matters
// Also, to get you started, I recommend looking at some starter kits. Pick one that matches your choices for the technology stack (remember, React is just the V in MVC, you need more stuff to build a full app). Start with looking at the one published by Facebook itself:

// Create React App
// Or pick one of the many by the community. There is a nice site now that tries to index all of them:

// Pick your perfect React starter project
// I started with these:

// React Isomorphic Starterkit
// React Redux Universal Hot Example
// Currently, I am using a homebrewed version of universal rendering that was inspired by the two starter kits above, but they are out of date now.

// Good luck with your quest!
