# Simon 22.11.2020 23:20
- Made a new axiosService without the interceptor to work directly with local app-middleware.

- Set up for polling the request from assignmentService (I just started working in one service that seemed reasonable for what I'm about to do) That being fetching submissions for an examinationCode (==moduleCode) from app-middlewares submissions endpoint.

Stopped by:
I have to figure out how to get the prop for moduleId into the moduleDetails component.



# Kai 2020-11-23
- Decision: views are vue class components, all other components non-class-based.
- Decision: reverse proxy used to access middlware API
    - production via `/.nginx/nginx.conf`; and 
    - development WDS (webpack development server) reverse proxy, configured in `/vue.config.js`.

Access to both middleware and mock api is done by in httpAxios or myAxios service files prepending a path to URL. `/api` for mock-apis and `/appmw` for requests to app middleware. This is matched in the `/vue.config.js` file the WDS reverse proxy. For `/api` paths we remove the identifier (`/api`). However in the second case we change the identifier from `/appmw` to `/app/v1` as that seems to be hard coded in the backend.
