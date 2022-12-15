import { EventEmitter } from "./EventEmitter";

describe("EventEmitter", () => {
  it("should run subscriber", () => {
    const emitter = new EventEmitter();

    let isRunned = false;
    emitter.subscribe("test", () => {
      isRunned = true;
    });
    emitter.emit("test");

    expect(isRunned).toEqual(true);
  });

  it("should run subscriber few times", () => {
    const emitter = new EventEmitter();

    let counter = 0;
    emitter.subscribe("test", () => {
      counter += 1;
    });

    emitter.emit("test");
    emitter.emit("test");

    expect(counter).toEqual(2);
  });

  it("should pass args to subscriber", () => {
    const emitter = new EventEmitter();

    let result = "";
    emitter.subscribe("test", (...args: any) => {
      result = args.join("");
    });
    emitter.emit("test", "t", "e", "s", "t");

    expect(result).toEqual("test");
  });

  it("should run few subscribers", () => {
    const emitter = new EventEmitter();

    let isRunned1 = false;
    emitter.subscribe("test", () => {
      isRunned1 = true;
    });

    let isRunned2 = false;
    emitter.subscribe("test", () => {
      isRunned2 = true;
    });

    emitter.emit("test");

    expect(isRunned1).toEqual(true);
    expect(isRunned2).toEqual(true);
  });

  it("should release subscriber", () => {
    const emitter = new EventEmitter();

    let counter = 0;
    const subscriber = emitter.subscribe("test", () => {
      counter += 1;
    });

    emitter.emit("test");
    expect(counter).toEqual(1);

    subscriber.release();
    emitter.emit("test");
    expect(counter).toEqual(1);
  });

  it("should execute complex example", () => {
    const emitter = new EventEmitter();

    const result: any = [];
    const subscriber1 = emitter.subscribe("event_name", (param: string) =>
      result.push(param)
    );
    const subscriber2 = emitter.subscribe(
      "event_name",
      (param1: string, param2: string) => result.push(`${param1} - ${param2}`)
    );

    emitter.emit("event_name", "foo", "bar");
    subscriber2.release();

    emitter.emit("event_name");
    subscriber1.release();
    emitter.emit("event_name", "foo");

    expect(result).toEqual(["foo", "foo - bar", undefined]);
  });
});
