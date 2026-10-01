// ---------- LESSON DATA ----------
// Add new lessons here. The sidebar in index.html points at these by index.
const lessons = [
  {
    title: "Hello, World",
    body: "HTML is made of <strong>tags</strong>. A tag looks like this: <code>&lt;h1&gt;</code>. The <code>h1</code> tag makes a big heading.",
    task: "Your task: add an <code>&lt;h1&gt;</code> tag that says <em>Hello, World</em>.",
    starter: "<h1>Hello, World</h1>"
  },
  {
    title: "Styling Text",
    body: "You can make text <strong>bold</strong> with <code>&lt;strong&gt;</code> and <em>italic</em> with <code>&lt;em&gt;</code>.",
    task: "Your task: make the word <em>kiwi</em> bold inside a paragraph.",
    starter: "<p>A <strong>kiwi</strong> is a fruit.</p>"
  },
  {
    title: "Colors & Boxes",
    body: "CSS lets you style HTML. You can change colors with the <code>style</code> attribute.",
    task: "Your task: make the heading green using <code>style=\"color: green;\"</code>.",
    starter: "<h1 style=\"color: green;\">Kiwi</h1>"
  }
];

// ---------- GRAB ELEMENTS ----------
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const lessonTitle = document.getElementById("lesson-title");
const lessonBody = document.getElementById("lesson-body");
const lessonTask = document.getElementById("lesson-task");
const lessonItems = document.querySelectorAll(".lesson-item");
const themeToggle = document.getElementById("theme-toggle");

// ---------- LIVE PREVIEW ----------
// Every time the user types, write their code into the iframe.
function updatePreview() {
  const doc = preview.contentDocument;
  doc.open();
  doc.write(editor.value);
  doc.close();
}

editor.addEventListener("input", updatePreview);

// ---------- LOAD A LESSON ----------
function loadLesson(index) {
  const lesson = lessons[index];
  lessonTitle.textContent = lesson.title;
  lessonBody.innerHTML = lesson.body;
  lessonTask.innerHTML = lesson.task;
  editor.value = lesson.starter;
  updatePreview();

  // Highlight the active lesson in the sidebar
  lessonItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

// ---------- SIDEBAR CLICKS ----------
lessonItems.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (item.classList.contains("locked")) return;
    loadLesson(i);
  });
});

// ---------- THEME TOGGLE ----------
// Remember the user's choice between visits.
const savedTheme = localStorage.getItem("kiwi-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("kiwi-theme", isDark ? "dark" : "light");
});

// ---------- START ----------
loadLesson(0);