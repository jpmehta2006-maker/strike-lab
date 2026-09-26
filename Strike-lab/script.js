/* =========================================================
   STRIKE LAB - script.js
   Sections:
   1. Data (articles, categories, balls, equipment)
   2. Saved likes/bookmarks (localStorage)
   3. Show articles (search + filter)
   4. Article reader popup
   5. Ball Finder quiz
   6. Ball comparison
   7. Theme + menu + back-to-top
========================================================= */

/* ---------- 1. DATA ---------- */

const categories = ["Basics", "Technique", "Tips", "Pro", "Mental", "Equipment"];

const articles = [
  { id: 1, title: "How to Bowl a Perfect Strike", category: "Basics",
    text: "A true strike isn't luck - it comes from repeating the same four fundamentals until they become automatic: a consistent stance, a smooth four-step approach, a relaxed arm swing, and a clean release into the pocket between the 1 and 3 pins. Most bowlers focus too much on power and not enough on repeatability, which is really what separates a lucky strike from one you can produce on demand. Start by finding a target arrow roughly seven feet down the lane instead of staring at the pins themselves - bowlers who aim at the pins tend to steer the ball late in the swing, which throws off both direction and timing. Keep your shoulders square through the release and let your hand naturally rotate through the ball rather than forcing a hook with your arm. Over time, small, consistent adjustments to your target line will do more for your strike percentage than any single power-focused change." },
  { id: 2, title: "How to Improve Bowling Accuracy", category: "Technique",
    text: "Accuracy is mostly a targeting problem, not a strength problem, and most bowlers overestimate how much their release is to blame. Using the arrows about seven feet down the lane as your target line gives you a much closer, more reliable reference point than trying to aim at pins forty feet away. A simple way to diagnose accuracy issues is to film your approach from the side - in most cases, the real problem traces back to footwork drifting left or right during the walk, not the release itself. Once your footwork is consistent, practice with a single target arrow for an entire session before changing anything else. Isolating one variable at a time - your feet, then your target, then your release - makes it far easier to identify exactly what is causing a shot to miss, instead of guessing and changing everything at once." },
  { id: 3, title: "How to Throw a Hook", category: "Technique",
    text: "A hook shot comes from rotating your hand around the side of the ball at the moment of release, not from muscling a turn with your entire arm. A useful mental cue is to imagine shaking hands and turning a doorknob at the bottom of your swing, rather than actively 'throwing' the ball sideways. It's also worth remembering that ball surface and drilling layout matter just as much as your release: a strongly-drilled hooking ball will still hook even with a fairly neutral hand position, while a straighter ball will resist hooking even if you rotate your hand aggressively. Because of this, it's best to start small - add a slight hand turn to your normal release and track how many boards the ball moves before committing to a bigger, more dramatic swing that's much harder to repeat shot after shot." },
  { id: 4, title: "How to Pick Up Difficult Spares", category: "Technique",
    text: "Most missed spares don't come from bad execution - they come from bowlers using their usual strike-line angle on a leave that actually needs a completely different approach. The 7 and 10 pins, sitting at opposite edges of the lane, are a good example: picking them up consistently usually means moving both your feet and your target line, not just aiming differently from the exact same spot you use for a strike ball. For a single pin sitting near the edge of the lane, it often helps to stand roughly across from that pin and use a straighter ball path, since a straight shot has a smaller margin for error than a hooking one. For a split, the goal isn't to hit both pins directly - it's to hit the pin that will deflect naturally into the other, which is a matter of understanding angles rather than adding more power to the shot." },
  { id: 5, title: "Understanding Lane Conditions", category: "Pro",
    text: "Every bowling lane is conditioned with a specific oil pattern, and that pattern is the single biggest factor in how much a ball is able to hook. A 'heavy' or longer oil pattern keeps the ball travelling straighter for a longer distance down the lane, while a 'dry' pattern lets the ball's coverstock grip the lane earlier, producing an earlier and often sharper hook. As a game goes on, the oil on the lane gradually breaks down and moves around from repeated shots, which is why your ball may start hooking noticeably more in the later frames than it did at the start. Rather than switching to a completely different ball mid-game, many experienced bowlers make small, gradual adjustments to where they stand and where they aim. In fact, simply watching how your ball reacts during the first two or three frames usually tells you more about the real lane condition than any posted oil-pattern chart ever could." },
  { id: 6, title: "Common Beginner Mistakes", category: "Tips",
    text: "Gripping the ball too tightly is one of the most common mistakes new bowlers make, and it causes a chain reaction: a tense grip tenses the wrist, the wrist tenses the arm, and the whole natural swing that generates both power and accuracy gets disrupted. Rushing the approach is another frequent issue - walking too quickly toward the foul line almost always leads to a rushed, inconsistent release at the exact moment that matters most for direction and timing. Many beginners also make the mistake of changing their equipment - switching balls, adjusting weight, trying a different grip - before they've actually fixed problems in their basic form. Doing this just adds a new variable on top of an already inconsistent shot, making it harder to tell what's actually causing low scores. Slowing down the approach and loosening the grip are usually the two highest-impact, lowest-effort changes a new bowler can make." },
  { id: 7, title: "Bowling Ball Weight Guide", category: "Equipment",
    text: "A commonly used starting point for ball weight is roughly ten percent of your body weight, capped at sixteen pounds, since that's the maximum weight allowed in ten-pin bowling. That said, this is only a starting guideline - comfort and control while actually swinging the ball matter far more than hitting an exact formula. A ball that's too heavy for you tends to cause a shortened, rushed swing as your body instinctively compensates for the extra weight, which hurts both accuracy and consistency over a full game. On the other hand, a ball that's noticeably too light can be swung smoothly and accurately, but may not carry through the pins as effectively, especially on medium or heavier oil conditions where more mass helps drive through the pins. The best approach is usually to test a couple of weights at your local bowling center before buying, since how a ball actually feels through your swing tells you more than any weight chart." },
  { id: 8, title: "How Bowling Scoring Works", category: "Basics",
    text: "A strike scores ten pins immediately, plus whatever you knock down on your next two rolls - which is exactly why a strike's true point value isn't actually known until a couple of frames later. A spare, by comparison, scores ten pins plus only your very next single roll, giving a smaller but still meaningful bonus for a consistent follow-up shot. This bonus system is what makes bowling scoring feel a bit confusing at first, since your score for an earlier frame keeps changing based on later rolls. The tenth and final frame works differently on purpose: it allows extra rolls specifically so that a strike or spare bowled there can still receive its normal bonus, without needing an eleventh frame that doesn't exist in the game. Once you understand that bonuses are just borrowed from the next one or two rolls, the entire scoring system becomes much easier to follow, even mid-game." },
  { id: 9, title: "Staying Mentally Consistent", category: "Mental",
    text: "A short, repeatable pre-shot routine - the same breath, the same brief pause, the same mental image of your shot - gives your mind a fixed anchor point between frames instead of drifting back to whatever happened on the last one. Bowlers who dwell on a missed spare or a poor strike attempt often carry that frustration and tension directly into their next approach, unintentionally tightening the exact muscles that need to stay loose for a smooth swing. Treating every single frame as its own separate, self-contained event - rather than part of a running story about how the game is going - tends to produce far more consistent results over a full game. It sounds simple, but a strong pre-shot routine is one of the most reliable ways competitive bowlers manage nerves during close matches. The scoreboard will still add everything up correctly at the end, regardless of how you're currently feeling about your last shot." },
  { id: 10, title: "Inside a Pro's Practice Session", category: "Pro",
    text: "Professional bowlers rarely practice by simply playing full games on repeat the way many recreational bowlers do. Instead, their sessions are usually built around a single variable at a time - footwork, release timing, or targeting - so that any change in ball reaction can be traced back to one clear cause rather than several changes happening at once. Many professionals also keep detailed notes on how their ball reacts across different lane conditions, which lets them make faster, more confident equipment decisions once they're actually in competition and don't have time to experiment. The common thread across almost all professional practice is intention: every single shot is meant to answer a specific question about form, equipment, or lane reaction, rather than just adding another shot to a running score. Recreational bowlers who adopt even a simplified version of this approach - practicing with a clear goal for each session - tend to improve noticeably faster than those who just bowl casually." }
];

const balls = [
  { name: "Aurora Pearl", coverstock: "Pearl reactive", core: "Symmetric", hook: "Medium", lane: "Medium", level: "Beginner-Intermediate" },
  { name: "Vortex Solid", coverstock: "Solid reactive", core: "Asymmetric", hook: "High", lane: "Heavy oil", level: "Intermediate-Advanced" },
  { name: "Glide Hybrid", coverstock: "Hybrid reactive", core: "Symmetric", hook: "Medium-High", lane: "Medium-Heavy", level: "All levels" },
  { name: "Straightline Plastic", coverstock: "Plastic", core: "Symmetric", hook: "Minimal", lane: "Any", level: "Beginner" },
  { name: "Apex Asymmetric", coverstock: "Solid reactive", core: "Asymmetric", hook: "Very high", lane: "Dry", level: "Advanced" }
];

const equipment = [
  { title: "Bowling Balls", text: "Weight, coverstock, and core shape decide how much a ball hooks." },
  { title: "Bowling Shoes", text: "One shoe slides, one grips, matched to your stance." },
  { title: "Bowling Bags", text: "Single, double, or triple-ball bags trade portability for capacity." },
  { title: "Accessories", text: "Wrist supports and grips help make your release repeatable." },
  { title: "Ball Weight", text: "Heavier isn't always better - pick a weight you can swing freely." },
  { title: "Coverstocks", text: "Plastic, pearl, solid, and hybrid coverstocks grip the lane differently." }
];

/* ---------- 2. SAVED LIKES/BOOKMARKS ---------- */

let liked = JSON.parse(localStorage.getItem("liked") || "[]");
let bookmarked = JSON.parse(localStorage.getItem("bookmarked") || "[]");

function toggleLike(id) {
  if (liked.includes(id)) liked = liked.filter(x => x !== id);
  else liked.push(id);
  localStorage.setItem("liked", JSON.stringify(liked));
}

function toggleBookmark(id) {
  if (bookmarked.includes(id)) bookmarked = bookmarked.filter(x => x !== id);
  else bookmarked.push(id);
  localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
}

/* ---------- 3. SHOW ARTICLES ---------- */

let activeCategory = "All";
let searchText = "";

function drawFilters() {
  let html = `<button class="filter-btn active" data-cat="All">All</button>`;
  for (const cat of categories) {
    html += `<button class="filter-btn" data-cat="${cat}">${cat}</button>`;
  }
  document.getElementById("filters").innerHTML = html;
}

function drawArticles() {
  const list = articles.filter(a =>
    (activeCategory === "All" || a.category === activeCategory) &&
    a.title.toLowerCase().includes(searchText)
  );

  let html = "";
  for (const a of list) {
    const isLiked = liked.includes(a.id) ? "active" : "";
    const isMarked = bookmarked.includes(a.id) ? "active" : "";
    html += `
      <div class="card">
        <span class="tag">${a.category}</span>
        <h3>${a.title}</h3>
        <p>${a.text.slice(0, 80)}...</p>
        <div class="card-actions">
          <button class="read-link" data-read="${a.id}">Read More</button>
          <div>
            <button class="${isLiked}" data-like="${a.id}">♥</button>
            <button class="${isMarked}" data-mark="${a.id}">🔖</button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("articleGrid").innerHTML = html;
  document.getElementById("noResults").hidden = list.length > 0;
}

/* ---------- 4. ARTICLE READER POPUP ---------- */

function openArticle(id) {
  const a = articles.find(x => x.id === id);
  document.getElementById("readerContent").innerHTML =
    `<span class="tag">${a.category}</span><h3>${a.title}</h3><p>${a.text}</p>`;
  document.getElementById("reader").hidden = false;
}

/* ---------- 5. BALL FINDER QUIZ ---------- */

function findBall(answers) {
  // Simple scoring: each answer adds or subtracts from a hook score.
  let score = 5;

  if (answers.style === "hook") score += 2;
  if (answers.style === "straight") score -= 2;
  if (answers.goal === "hook") score += 2;
  if (answers.goal === "control" || answers.goal === "accuracy") score -= 1;
  if (answers.lane === "heavy") score += 1;
  if (answers.lane === "dry") score -= 1;
  if (answers.experience === "advanced") score += 1;
  if (answers.experience === "beginner") score -= 1;

  let coverstock, hookLevel;
  if (score <= 2) { coverstock = "Plastic"; hookLevel = "Minimal"; }
  else if (score <= 5) { coverstock = "Pearl reactive"; hookLevel = "Medium"; }
  else if (score <= 8) { coverstock = "Hybrid reactive"; hookLevel = "Medium-High"; }
  else { coverstock = "Solid reactive"; hookLevel = "High"; }

  return {
    coverstock: coverstock,
    hookLevel: hookLevel,
    weight: answers.weight,
    lane: answers.lane
  };
}

function showBallResult(result) {
  document.getElementById("finderResult").hidden = false;
  document.getElementById("finderResult").innerHTML = `
    <h3>Your Bowling Ball Profile</h3>
    <div class="profile-item"><b>Coverstock:</b> ${result.coverstock}</div>
    <div class="profile-item"><b>Hook Potential:</b> ${result.hookLevel}</div>
    <div class="profile-item"><b>Suggested Weight:</b> ${result.weight} lbs</div>
    <div class="profile-item"><b>Best Lane Condition:</b> ${result.lane}</div>
    <p class="disclaimer">This is general guidance, not a final fitting. Visit a pro shop for a personalized ball fitting.</p>
  `;
}

/* ---------- 6. BALL COMPARISON ---------- */

function fillBallSelects() {
  let options = "";
  for (let i = 0; i < balls.length; i++) {
    options += `<option value="${i}">${balls[i].name}</option>`;
  }
  document.getElementById("ballA").innerHTML = options;
  document.getElementById("ballB").innerHTML = options;
  document.getElementById("ballA").value = 0;
  document.getElementById("ballB").value = 1;
}

function drawCompareTable() {
  const a = balls[document.getElementById("ballA").value];
  const b = balls[document.getElementById("ballB").value];
  const rows = [
    ["Coverstock", a.coverstock, b.coverstock],
    ["Core", a.core, b.core],
    ["Hook Potential", a.hook, b.hook],
    ["Best Lane", a.lane, b.lane],
    ["Skill Level", a.level, b.level]
  ];
  let html = "";
  for (const row of rows) {
    html += `<tr><td>${row[1]}</td><td><b>${row[0]}</b></td><td>${row[2]}</td></tr>`;
  }
  document.getElementById("compareTable").innerHTML = html;
}

/* ---------- 7. THEME + MENU + BACK TO TOP ---------- */

function setupTheme() {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
  document.getElementById("themeBtn").onclick = function () {
    document.body.classList.toggle("light");
    const mode = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", mode);
  };
}

function setupMenu() {
  document.getElementById("menuBtn").onclick = function () {
    document.getElementById("navLinks").classList.toggle("open");
  };
}

function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  window.onscroll = function () {
    btn.hidden = window.scrollY < 400;
  };
  btn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", function () {

  // Build equipment cards
  let equipHtml = "";
  for (const item of equipment) {
    equipHtml += `<div class="card"><h3>${item.title}</h3><p>${item.text}</p></div>`;
  }
  document.getElementById("equipmentGrid").innerHTML = equipHtml;

  drawFilters();
  drawArticles();
  fillBallSelects();
  drawCompareTable();
  setupTheme();
  setupMenu();
  setupBackToTop();

  // Search box
  document.getElementById("searchBox").addEventListener("input", function (e) {
    searchText = e.target.value.toLowerCase();
    drawArticles();
  });

  // Category filter clicks
  document.getElementById("filters").addEventListener("click", function (e) {
    if (!e.target.dataset.cat) return;
    activeCategory = e.target.dataset.cat;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    drawArticles();
  });

  // Like / bookmark / read-more clicks (event delegation, since
  // article cards are redrawn every time the list changes)
  document.getElementById("articleGrid").addEventListener("click", function (e) {
    if (e.target.dataset.like) {
      toggleLike(Number(e.target.dataset.like));
      e.target.classList.toggle("active");
    }
    if (e.target.dataset.mark) {
      toggleBookmark(Number(e.target.dataset.mark));
      e.target.classList.toggle("active");
    }
    if (e.target.dataset.read) {
      openArticle(Number(e.target.dataset.read));
    }
  });

  // Close reader popup
  document.getElementById("closeReader").onclick = function () {
    document.getElementById("reader").hidden = true;
  };

  // Ball weight slider
  document.getElementById("qWeight").addEventListener("input", function (e) {
    document.getElementById("weightLabel").textContent = e.target.value;
  });

  // Ball finder form submit
  document.getElementById("finderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const answers = {
      experience: document.getElementById("qExperience").value,
      style: document.getElementById("qStyle").value,
      lane: document.getElementById("qLane").value,
      weight: document.getElementById("qWeight").value,
      goal: document.getElementById("qGoal").value
    };
    showBallResult(findBall(answers));
  });

  // Ball comparison dropdowns
  document.getElementById("ballA").addEventListener("change", drawCompareTable);
  document.getElementById("ballB").addEventListener("change", drawCompareTable);

});
