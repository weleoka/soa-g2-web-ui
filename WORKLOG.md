# Simon 22.11.2020 23:20
- Made a new axiosService without the interceptor to work directly with local app-middleware.

- Set up for polling the request from assignmentService (I just started working in one service that seemed reasonable for what I'm about to do) That being fetching submissions for an examinationCode (==moduleCode) from app-middlewares submissions endpoint.

Stopped by:
I have to figure out how to get the prop for moduleId into the moduleDetails component.



# Kai 2020-11-23 morgon & tidig eftermiddag
- Decision: views are vue class components, all other components non-class-based.
- Decision: reverse proxy used to access middlware API
    - production via `/.nginx/nginx.conf`; and 
    - development WDS (webpack development server) reverse proxy, configured in `/vue.config.js`.

Note: access to both middleware and mock api is done by in httpAxios or myAxios service files prepending a path to URL. `/api` for mock-apis and `/appmw` for requests to app middleware. This is matched in the `/vue.config.js` file the WDS reverse proxy. For `/api` paths we remove the identifier (`/api`). However in the second case we change the identifier from `/appmw` to `/app/v1` as that seems to be hard coded in the backend.

Fixed: passing prop moduleId from dynamic path param to child components.

LAST: object mapping so incoming submission object from middleware can be used in the frontend domain. This is to be done with interface object in resultsApiService.js

# Kai 2020-11-23 17:18 UTC
Submissions available in UI. Next is to implement the POST endpoint to verify the submission grade, i.e. passing it to Ladok.



# Kai 2020-11-23 19:11 UTC
Implenting grade verification.

Held up by only getting server 500 error. Log output:

``
127.0.0.1 - - [24/Nov/2020:19:09:07 +0000] "POST /app/V1/submission/assignmt01/verify HTTP/1.1" 500 160
127.0.0.1 - - [24/Nov/2020:19:09:31 +0000] "GET /app/V1/examination/module04 HTTP/1.1" 200 1053
2020-11-24 19:11:07.153 ERROR 1148848 --- [nio-8085-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is feign.FeignException$MethodNotAllowed: [405] during [POST] to [http://localhost:8080/examination-service/V1/submission//verify] [ESSubmissionClient#verify(SubmissionVerificationRequest)]: [{"timestamp":"2020-11-24T19:11:07.147+00:00","status":405,"error":"Method Not Allowed","message":"","path":"/examination-service/V1/submission//verify"}]] with root cause
feign.FeignException$MethodNotAllowed: [405] during [POST] to [http://localhost:8080/examination-service/V1/submission//verify] [ESSubmissionClient#verify(SubmissionVerificationRequest)]: [{"timestamp":"2020-11-24T19:11:07.147+00:00","status":405,"error":"Method Not Allowed","message":"","path":"/examination-service/V1/submission//verify"}]
````
