import { TranscriptProcessor } from "../../src/domain/transcript.processor";

const VIDEO_URL = "https://www.youtube.com/watch?v=mQQh115qAME";

describe("get conversation", () => {
  test("for empty transcript", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [],
      fullText: "",
      words: [],
    });

    expect(tp.getConversation()).toEqual([]);
  });

  test("for one word transcript", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello",
      words: [{
        value: "Hello",
        speaker: 0,
        startTime: 0,
        endTime: 1
      }],
    });

    expect(tp.getConversation()).toEqual([{
      timestamp: "0:00",
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello",
    }]);
  });

  test("for one word with punctuation", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello!",
      words: [{
        value: "Hello",
        speaker: 0,
        startTime: 0,
        endTime: 1
      }],
    });

    expect(tp.getConversation()).toEqual([{
      timestamp: "0:00",
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello!",
    }]);
  });

  test("for multiples words and one speaker", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0,
          endTime: 1
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1,
          endTime: 2
        },
      ],
    });

    expect(tp.getConversation()).toEqual([{
      timestamp: "0:00",
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello world",
    }]);
  });

  test("for two speakers", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [
        { id: 0, name: "Flavius" },
        { id: 1, name: "Caecilius" }
      ],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0,
          endTime: 1
        },
        {
          value: "world",
          speaker: 1,
          startTime: 1,
          endTime: 2
        },
      ],
    });

    expect(tp.getConversation()).toEqual([
      {
        timestamp: "0:00",
        speakerId: 0,
        speakerName: "Flavius",
        quote: "Hello",
      },
      {
        timestamp: "0:01",
        speakerId: 1,
        speakerName: "Caecilius",
        quote: "world",
      },
    ]);
  });

  test("for two speakers with punctuation", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [
        { id: 0, name: "Flavius" },
        { id: 1, name: "Caecilius" }
      ],
      fullText: "Hello, world!",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0,
          endTime: 1
        },
        {
          value: "world",
          speaker: 1,
          startTime: 1,
          endTime: 2
        },
      ],
    });

    expect(tp.getConversation()).toEqual([
      {
        timestamp: "0:00",
        speakerId: 0,
        speakerName: "Flavius",
        quote: "Hello,",
      },
      {
        timestamp: "0:01",
        speakerId: 1,
        speakerName: "Caecilius",
        quote: "world!",
      },
    ]);
  });

  test("for two speakers out of order", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [
        { id: 0, name: "Flavius" },
        { id: 1, name: "Caecilius" }
      ],
      fullText: "Hello, world!",
      words: [
        {
          value: "world",
          speaker: 1,
          startTime: 1,
          endTime: 2
        },
        {
          value: "Hello",
          speaker: 0,
          startTime: 0,
          endTime: 1
        },
      ],
    });

    expect(tp.getConversation()).toEqual([
      {
        timestamp: "0:00",
        speakerId: 0,
        speakerName: "Flavius",
        quote: "Hello,",
      },
      {
        timestamp: "0:01",
        speakerId: 1,
        speakerName: "Caecilius",
        quote: "world!",
      },
    ]);
  });
});

describe("fails to get conversation", () => {
  test("when start time is negative", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello!",
      words: [{
        value: "Hello",
        speaker: 0,
        startTime: -1,
        endTime: 1
      }],
    });

    expect(() => tp.getConversation()).toThrow();
  });

  test("when start time is not an integer", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello!",
      words: [{
        value: "Hello",
        speaker: 0,
        startTime: 0.5,
        endTime: 1
      }],
    });

    expect(() => tp.getConversation()).toThrow();
  });

  test("when speaker id not found", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello!",
      words: [{
        value: "Hello",
        speaker: 1,
        startTime: 0,
        endTime: 1
      }],
    });

    expect(() => tp.getConversation()).toThrow();
  });

  test("when full text does not match word array", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0,
          endTime: 1
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1,
          endTime: 2
        }
      ],
    });

    expect(() => tp.getConversation()).toThrow();
  });

  test("when there are 2 spaces in the full text", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello  world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0,
          endTime: 1
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1,
          endTime: 2
        }
      ],
    });

    expect(() => tp.getConversation()).toThrow();
  });
});
