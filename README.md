# Laudable Coding Exercise

Thanks for taking the time to interview with Laudable - we appreciate the time you're putting into working on this
exercise!

This exercise is intended to reflect some real problems we have solved and is intended to take only an hour
or two to complete.

## Instructions

Fork this repo, and implement the service requirements articulated below in `service.ts`. You are welcome to add
additional file(s) if helpful and you can use either Typescript or vanilla Javascript.

Jest has been set up for you if you would like to make use of it.

Once done, you can push your work to Gitlab or Github and provide a link to your Laudable contact(s).

Feel free to reach out if there are any questions!

## Requirements

In the Laudable product, we have videos or calls with **transcripts**. We then take those and create **clips** -
essentially small portions of those videos focused on a single speakerp.

We've provided a mock database with a single call transcript in it, and a repository to access that data (see
`models.ts` for documentation on the data provided). Given this, we would like you to design a simplified backend
for an application that supports the following use cases:

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
