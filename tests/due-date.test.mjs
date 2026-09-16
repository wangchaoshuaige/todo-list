import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /<input[^>]+id="dueDate"[^>]+type="date"/, "page includes a deadline date input");

const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
assert.ok(script, "page includes executable app script");

const elements = {
  task: { value: "写测试" },
  dueDate: { value: "2026-09-20" },
  list: {
    innerHTML: "",
    children: [],
    appendChild(child) {
      this.children.push(child);
    }
  },
  count: { innerText: "" }
};

const storage = new Map();
const RealDate = Date;
class FixedDate extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ["2026-09-16T12:00:00"]));
  }

  static now() {
    return new RealDate("2026-09-16T12:00:00").getTime();
  }
}

const sandbox = {
  Date: FixedDate,
  localStorage: {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    }
  },
  document: {
    getElementById(id) {
      return elements[id];
    },
    createElement(tagName) {
      return { tagName, className: "", innerHTML: "" };
    }
  }
};

vm.createContext(sandbox);
vm.runInContext(script, sandbox);
sandbox.addTask();

const savedTasks = JSON.parse(storage.get("tasks"));
assert.equal(savedTasks.length, 1);
assert.deepEqual(savedTasks[0], {
  text: "写测试",
  done: false,
  dueDate: "2026-09-20"
});
assert.equal(elements.dueDate.value, "", "deadline input is cleared after adding a task");

assert.match(
  sandbox.dueDateLabel("2026-09-15"),
  /已过期/,
  "overdue tasks show an overdue warning"
);
assert.match(
  sandbox.dueDateLabel("2026-09-15"),
  /class="due-date overdue"/,
  "overdue tasks use the overdue warning class"
);
