### [Stempiretutoring.com](https://stempiretutoring.com)

## About 
# Technologies 
* [nextjs](https://nextjs.org)
* [nextui](https://nextui.org)
* [mongoDB](https://mongodb.com)
* [cloudflare](https://cloudflare.com)
* [typescript](https://typescriptlang.org)
* [auth0](https://auth0.com)
* [stripe](https://stripe.com)
* [mailjet](https://mailjet.com)

## Getting Started
To host a local version follow the following instructions

# Prerequesites
* nodejs
* bun/npm/yarn/etc
* typescript
* git

> [!NOTE]
> Because of the fact that these are prerequesites, I will assume that they are already installed and operational on your system. If that is not the case, look online for instructions on how to get them installed and set up

> [!IMPORTANT]
> This guide will be written with bun in mind

# Installation
1. Clone the git repo
    ```sh 
    git clone https://github.com/stempiretutoring/tutoring
    ```
2. Move into the directory and install the necessary packages
    ```sh 
    cd tutoring && bun i
    ```
3. Create a copy of `.env.example` and fill in the necessary information
    ```sh 
    cp .env.example .env
    ```
    * `MONGO_URI`: This is the data endpoint used for most fetch requests to mongodb. It can be found by clicking 'Data API' under 'Services' while under the 'Data Services' tab in your mongodb project
    * `MONGO_API_KEY`: This is the api key used for authenticating your requests. Create one by clicking 'Users' while in the 'Data API' tab
    * `MONGO_DISTINCT` and `MONGO_ARRAY`: These are two specific URL's used for calling written functions in mongodb. The code for these functions can be found in `extras/`
        * `MONGO_DISTINCT`
            1. Navigate to 'App Services' on the top bar and then click the card there
            2. Click 'HTTPS Enpoints' under 'Build' and then click the green 'Add An Endpoint' button in the top right
                1. Under route name it 'distinct'
                2. Copy the URL to the right of 'Operation Type' and paste that into your `.env` file
                3. Set the 'HTTP Method' to 'GET', toggle the 'Respond with Result' box so that it is on, and make sure the 'Return Type' is set to JSON
                4. Click on the dropdown box next to 'Function' and select '+ New function'. Name it 'distinct' and copy in the code from `/extas/distinct`
                5. Set 'Request Authorization' to 'No Additional Authorization' and toggle 'Fetch Custom User Data' to on. Make sure 'Create User Upon Authentication' is off
        * `MONGO_ARRAY`
            1. Follow the same steps as `MONGO_DISTINCT` however, name the endpoint 'schedule' and set the 'HTTP Method' to be 'POST'
            2. Again, create a new function named 'schedule' and copy in the code from `/extras/schedule`
    * `MONGO_COLLECTION`, `MONGO_CLIENT_COLLECTION`, `MONGO_DATABASE`, and `MONGO_DATASOURCE`: The specific names of the different data options in mongodb. `MONGO_DATASOURCE` is the name of your cluster. `MONGO_DATABASE` is the name of your mongo database that contains all your collections. `MONGO_COLLECTION` and `MONGO_CLIENT_COLLECTION` should be the names of your tutors and client collections respectively. 
    * `AUTH0_*`: In auth0 you want to create a 'regular web application' then use the information from that to fill in the blank locations for `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and set `AUTH0_BASE_URL` to be `http://localhost:3000`. You can generate a value for `AUTH0_SECRET` with the command `openssl rand -hex 32`
        * For more help see [this link](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)
    * `NEXT_PUBLIC_BASE_URL`: This should just be `localhost:3000`
    * `NEXT_PUBLIC_IMAGE_URL`: This is the online url from where your images are hosted. In the production version of the site, images are hosted through cloudflare using an R2 bucket
    * `NEXT_PUBLIC_ADMIN_EMAIL`: This is the email of whatever use you want to be able to access the admin panel. Since this is a local instance of the site, it only makes sense to put your own email there.
    * `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: This can be found under the stripe developer dashboard
    * `STRIPE_TEST_SECRET_KEY`: You can also generate a stripe secret key under the developer dashboard
    * `STRIPE_WEBHOOK_SECRET`: When you create your stripe webhook you'll be presented with a secret key that you can paste here
    * `MJ_APIKEY_PUBLIC`: Your public api key from mailjet
    * `MJ_APIKEY_PRIVATE`: Your private api key from mailjet
    * `MJ_SENDER`: The email address you want to be listed as the sender for all emails sent from your site
4. Once you have a filled in version of `.env.example` you can run the command `bun run dev` and visit http://localhost:3000 to view your version of the website

> [!WARNING]
> You will have to manually create the data entries for the tutors inside your mongodb tutor collection. The website will not automatically instantiate them for you. 
> Each document inside the tutoring collection should have the following structure:
> ```json {
>    _id: ObjectID(...),
>    name: string,
>    oppucation: string,
>   subjects: string[],
>    picture: string,
>    bio: string,
>    email: string,
>    active: boolean,
>    booked: string[],
>    schedule: {
>        date: string,
>        times: strig[]
>    }
> } ```
