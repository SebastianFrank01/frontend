# TransitApp Frontend

Link to github (frontend)
https://github.com/SebastianFrank01/frontend
(backend)
https://github.com/SebastianFrank01/TransitApp 

Please run using google chrome, firefox doesn't seem to like html timefields.

For optimal results, test while busses are operating, otherwise the server might not send
any results.

Some demo bus routes/numbers you can use:
Bus Lookups:
6624 - 10
6610 - 2, 111
3009 - 97

Route Planning:
6879 - 3009 (bronson/gladstone - rideau centre)
6610 - 6624 (Carleton University - bronson/gladstone)

Setup instructions:

- Launch backend server (see the backend repo for instructions)
- Run backend server at 127.0.0.1:8000

- Download or clone project locally
- In the terminal, navigate to \frontend-main\frontend-main\, run npm install
- In the terminal, run npm start
- Launch site at 127.0.0.1

Misc Usability Features:

The route lookup page makes use of loading icons while waiting for the server
to provide bus times / route plans

The review submit page uses session storage to keep track of data so it persists through a page refresh

