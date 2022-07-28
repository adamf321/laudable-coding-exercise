import { TranscriptProcessor } from "../../src/domain/transcript.processor";

const VIDEO_URL = "https://www.youtube.com/watch?v=mQQh115qAME";

describe("get full conversation", () => {
  test("for empty transcript", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [],
      fullText: "",
      words: [],
    });

    expect(tp.getClips()).toEqual([]);
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

    expect(tp.getClips()).toEqual([{
      startTime: 0,
      endTime: 1,
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

    expect(tp.getClips()).toEqual([{
      startTime: 0,
      endTime: 1,
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

    expect(tp.getClips()).toEqual([{
      startTime: 0,
      endTime: 2,
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

    expect(tp.getClips()).toEqual([
      {
        startTime: 0,
        endTime: 1,
        speakerId: 0,
        speakerName: "Flavius",
        quote: "Hello",
      },
      {
        startTime: 1,
        endTime: 2,
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

    expect(tp.getClips()).toEqual([
      {
        startTime: 0,
        endTime: 1,
        speakerId: 0,
        speakerName: "Flavius",
        quote: "Hello,",
      },
      {
        startTime: 1,
        endTime: 2,
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

    expect(tp.getClips()).toEqual([
      {
        startTime: 0,
        endTime: 1,
        speakerId: 0,
        speakerName: "Flavius",
        quote: "Hello,",
      },
      {
        startTime: 1,
        endTime: 2,
        speakerId: 1,
        speakerName: "Caecilius",
        quote: "world!",
      },
    ]);
  });

  test("for non-integer times", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0.568,
          endTime: 1.67
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1.67,
          endTime: 2.4678
        },
      ],
    });

    expect(tp.getClips()).toEqual([{
      startTime: 0.568,
      endTime: 2.4678,
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello world",
    }]);
  });
});

describe("get partial conversation", () => {
  test("when truncating the end", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0.568,
          endTime: 1.67
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1.67,
          endTime: 2.4678
        },
      ],
    });

    expect(tp.getClips(0, 1.5)).toEqual([{
      startTime: 0.568,
      endTime: 1.67,
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello",
    }]);
  });

  test("when truncating the beginning", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0.568,
          endTime: 1.67
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1.8,
          endTime: 2.4678
        },
      ],
    });

    expect(tp.getClips(1.7)).toEqual([{
      startTime: 1.8,
      endTime: 2.4678,
      speakerId: 0,
      speakerName: "Flavius",
      quote: "world",
    }]);
  });

  test("when starting from the middle of a word", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0.5,
          endTime: 1.67
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1.8,
          endTime: 2.4678
        },
      ],
    });

    expect(tp.getClips(1)).toEqual([{
      startTime: 0.5,
      endTime: 2.4678,
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello world",
    }]);
  });

  test("when ending in the middle of a word", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0.5,
          endTime: 1.67
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1.8,
          endTime: 2.4678
        },
      ],
    });

    expect(tp.getClips(0, 2.4)).toEqual([{
      startTime: 0.5,
      endTime: 2.4678,
      speakerId: 0,
      speakerName: "Flavius",
      quote: "Hello world",
    }]);
  });

  test("when start and end are out of bounds", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello world",
      words: [
        {
          value: "Hello",
          speaker: 0,
          startTime: 0.5,
          endTime: 1.67
        },
        {
          value: "world",
          speaker: 0,
          startTime: 1.8,
          endTime: 2.4678
        },
      ],
    });

    expect(tp.getClips(3, 5)).toEqual([]);
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

    expect(() => tp.getClips()).toThrow();
  });

  test("when start time is after end time", () => {
    const tp = new TranscriptProcessor({
      videoUrl: VIDEO_URL,
      speakers: [{ id: 0, name: "Flavius" }],
      fullText: "Hello!",
      words: [{
        value: "Hello",
        speaker: 0,
        startTime: 1,
        endTime: 0
      }],
    });

    expect(() => tp.getClips()).toThrow();
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

    expect(() => tp.getClips()).toThrow();
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

    expect(() => tp.getClips()).toThrow();
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

    expect(() => tp.getClips()).toThrow();
  });
});
