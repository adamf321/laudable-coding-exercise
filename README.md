# Laudable Coding Exercise
This repo contains an app which creates REST endpoints for media (audio or video) transcripts.

## Overview
The app is written in TypeScript using the ExpressJS framework. When running it exposes the following endpoints at `http://localhost:3001/`:

- `/`: Output test text to validate the server is running.
- `/conversation?media_url=https://www.youtube.com/watch?v=mQQh115qAME`: Outputs a conversation for the hardcoded transcript stored in the app.
- `/clips?media_url=https://www.youtube.com/watch?v=mQQh115qAME&start_time=20&end_time=75`: Outputs a clip of a conversation for the transcript.

### Design
The app's business domain logic is in the `/src/domain` folder, which represents pure business logic. It is exposed to consumers via `service.ts`.

`/src/utils` contains utilities which are not core business logic, e.g. time manipulation functions and the mock database.

The `index.ts` file creates the endpoints and includes some logic which is specific to the API's representation of the data.

**Conversation Endpoint**

This endpoint exposes the full transcript in conversation format. Each time the speaker changes a new clip is included in the conversation.

**Clips Endpoint**

The `/clips` endpoint returns a set of clips that fall within the given time range. It includes full words which are partially included in the given start and end time. E.g. if the clip starts at 20.3s and there is word starting at 20.0 and ending at 21.0, then we include the full word. Likewise for  words partially cut off at the end of the clip.

It was decided to implement the endpoint in this way because:

- This provides what is probably the most useful output (without knowing the business use case it is hard to say though!) as it provides all the clips within the range for the consumer to pick from.
- Has a consistent format with the `/conversation` endpoint.


## Local Development
Prerequesites:

1. Node v14.

To set-up the app locally:

1. Clone this repo.
2. Run `npm i` to install dependencies.
3. Run `npm run dev` to start the app. It will automatically reload as you make changes.
4. Go to `http://localhost:3001` and verify you can see the test message.
5. Run `npm t` to run the test suite.


## Additional Notes
The following assumptions where made when building this app:

- Transcripts do not have overlapping words (e.g. 2 people speaking at once). This could be a case to consider in a future iteration.

Given more time the app could be improved by:

- Higher level tests, e.g. contract or full e2e.
- Allow for processing of large transcripts, e.g. by using a more efficient search algorithm for finding the words in a clip.
- Swagger documentation for the endpoints (could be auto-generated from the TypeScript definitions).
- Improved dev tooling, e.g. linting
- Improved error handling for the API response (e.g. show appropriate messages depending on whether there is a user or server error)

## Requirements

In the Laudable product, we have videos or calls with **transcripts**. We then take those and create **clips** -
essentially small portions of those videos focused on a single speaker.

We've provided a mock database with a single call transcript in it, and a repository to access that data (see
`models.ts` for documentation on the data provided). Given this, we would like you to design a simplified backend
for an application that supports the following use cases. You are welcome to create either a REST backend or simply
just implement the relevant service methods - it is up to you.

### 1. Conversation Data 
We eventually want to display this transcript data in a frontend as a human-readable "conversation", similar to:

```text
0:00 Flavius
Hence! Home, you idle creatures, get you home! Is this a holiday? What, know you not, being mechanical, you
ought not walk upon a laboring day without the sign of your profession? Speak, what trade art thou?

0:37 Carpenter
Why, sir, a carpenter.

...
```

We don't expect you to build this actual frontend - just a JSON structure that can be consumed to build a frontend
that looks like the above.

* Input: Transcript (see db)
* Output:
  * List of:
    * Timestamp (in m:ss)
    * Speaker Name
    * Quote

### 2. Cut Clip endpoint

We would like you to build an endpoint to create a clip. Obviously, you don't need to do any video processing - simply
create an endpoint that takes a URL and Start and End timestamps, and then parses out the speaker, quote, and
human-readable time range.

* Input
  * Video URL
  * Start time (second offset)
  * End time (second offset)
* Output
  * Speaker
  * Quote
  * Human-readable time range ("m:ss-m-ss")
