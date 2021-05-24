# 3SC Web Developer Test

## Task

Build a React.js web UI that interfaces with the [Pokemon API](https://pokeapi.co).

This task is designed to assess how you will go about building a web application, at the very least you must demonstrate your ability to write:

- Readable and well laid out code
- A well laid out project structure
- JS or TypeScript / HTML and CSS
- Component / Unit and Snapshot Tests (Where Appropriate)
- Clear Documentation about the project

## User Stories

- "As a user I want to view and easily find pokemon so that I can easily explore the many pokemon that exist"
- "As a user I want to filter pokemon by their [generation](https://pokeapi.co/docs/v2#generations) so that I can find pokemon I am interested in"
- "As a user I want to preview in detail a pokemon so that I can find out all the information around that particular pokemon"
- "As a user I want to compare pokemon so that I can decide if one is better over the other"
- "As a user I want to save my favourite pokemon so that I can easily find them next time I visit the application"

## Getting Started

- The following endpoint provides a list of Pokemon: https://pokeapi.co/api/v2/pokemon/
- You may use any other endpoints and resources provided by the Pokeapi to achieve the user stories.
- Your solution should demonstrate use of version control (git).
- You may use any additional JavaScript or CSS libraries to achieve your solution.

## Submission

- The Submission must have version control history (.git directory) - this is essential so we can see how you went about implementing your solution.
- Can be zipped up and sent to us via email or hosted on GitHub.
- Please ensure that with your solution you include the following documentation (this can be included as part of a `README.md` or separate document)
  - A brief "Getting Started guide" on how to open the project locally
  - If you used any particular libraries why did you choose them?
  - Did you have any challenges and if so, how did you overcome them?
  - Did you add any extra features?
  - If you had more time, what else would you implement?

# Planning/brainstorming

## Initial project architecture/research

- Next.js - speedy deployment with Vercel, no config Typescript set up, OOTB api endpoints (to wrap a server side [cache](https://github.com/PokeAPI/pokedex-promise-v2)), OOTB dynamic routing, useful optimised components like <Head /> and <Image /> to speed up layout
- A mid-tier api between client and PokeAPI means less changes to components if PokeAPI changes (ie the client code should not care what the PokeAPI looks like, dependency inversion etc). Hypothetically, if this solution was scaled out to n customers, all clients would communicate with the mid-tier api, allowing for maximum request caching. [Browser caching](https://github.com/PokeAPI/pokeapi-js-wrapper) would make n more requests to the PokeAPI.
- Next.js api could provide an interface for further features without having to build a separate node service (e.g. authentication, data persistence)
- Containing all mid-tier api code in the same project allows for easier testing
- Next.js has OOTB static file hosting capabilities - pokedex images
- Using Next.js keeps both client and server on the same domain, eliminating the need for cors middleware
- Next.js is production ready from the start..!
- Material-UI for faster UI development

Todo:

1. Create api layer and a set of route data types to inform UI development
2. Create UI layout and page structure
3. Create static UI components with hard data
4. Upgrade to dynamic UI components with live data
5. Build api unit tests
6. Build component unit tests
7. Implement snapshot tests

NOPE. Start again (api is just not necessary for this test, as no one mentioned anything about scaling dude... and the styling is more dependent on the data than the other way around; get the data first)

1. Get list of pokemon on the index page
2. Create singular pokemon view page that fetches pokemon data by id
3. Add the pokeapi caching wrapper (browser side, to eliminate unnecessary demand on the poor PokeAPI during development...)
4. Add basic styling with Tailwind for rapid development
5. Add a search feature to the index page
6. Create a comparison page, that can compare by two searches
7. On pokemon index cards, or detail cards, add a save feature that updates a localstorage list of favourite pokemon.
8. Create favourite pokemon page that retrieves favourites from localstorage, than runs a chain of fetches to the api by id/name
9. Add generation filter to index page

# Implementation

## Getting started guide

## Additional libraries

- [pokedex-promise-v2](https://github.com/PokeAPI/pokedex-promise-v2)

## Challenges and solutions

1. PokeAPI browser wrapper not accessible in compiled code (window/navigator undefined), so had to revert back to making a custom API.
2. When implementing the search feature, I ran into a bunch of interconnected problems that initially looking like a React hook memory leak or performance issue, due to the number of fetch requests. After a long time debugging in the console - just process of elimination - I eventually realised that the React 'key' prop was storing elements in the shadow DOM based on the map index; concating this property into { name + index } created a unique key allowing for more shadow DOM elements.
3. The http load on the Index page is very high; I attempted to solve this with a combination of caching responses on the backend, and loading sprite png into the Next.js public file directory. [Browser caching](https://github.com/PokeAPI/pokeapi-js-wrapper) looked to be a good solution initially, but there was many problems getting Typescript to accept window/navigator interfaces. Eventually I had to leave this approach as it was taking up too much time.
4. Despite the Next.js docs showing that the useRouter() hook can be used within event handlers, this causes a React inappropriate use of hooks error. I worked around this, for the time being, by simply using the browser API. Which feels distinctly non-SPA like, but there ya go...

5. Index.tsx BUG (on refresh/hot-reload, intermittently)

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

6. Index.tsx long page load times unless purely coming from cache. Ideally, I would like the time to implement pagination, but for now I provided a render limit input on the UI which defaults to a low enough number so as to give a good initial page loading time. It is debatable whether a user really needs a page with all the pokemon on at once anyway. This may be taking 'gotta catch them all' a little too seriously...

7. Next.js maps one handler per api route; to get this to respond to different methods, it requires a req.method check in that handler. I would prefer a more restful approach, but for an app of this size it isn't so important.

## Extra features

- Pokemon images
- Application stats (times visited, searches, comparisons) - json-server or sqlite
- User [authentication](https://next-with-iron-session.vercel.app/), possibly with [NextAuth.js](https://github.com/nextauthjs/next-auth-example), register/login

## Feature wish-list
