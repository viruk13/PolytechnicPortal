let main;
const apiBase = "https://6982f0249c3efeb892a3c0ce.mockapi.io/PolytechnicPortal";

window.onload = function () {
  main = document.getElementById('main-content');
  loadHome();
};

// ---------------- HOME ----------------
function loadHome(){
  main.innerHTML = `
    <div class="hero">
      <h1>Government Polytechnic Gunnal</h1>
      <p>Empowering students for a better future</p>
      <button onclick="loadCourses()">Explore Courses</button>
    </div>

    <div class="announcements">
      <h2>Latest Announcements</h2>
      <ul>
        <li>New semestefunction loadHome(){
  main.innerHTML = `
    <div class="hero">
      <h1>Government Polytechnic Gunnal</h1>
      <p>Empowering students for a better future</p>
      <button onclick="loadCourses()">Explore Courses</button>
    </div>

    <div class="announcements">
      <h2>Latest Announcements</h2>
      <ul>
        <li>New semester starts from 15th Feb 2026.</li>
        <li>Lab schedules updated for CS department.</li>
        <li>Apply for hostel before 10th Feb 2026.</li>
      </ul>
    </div>

    <div class="stats">
      <div class="stat-card"><h3>500+</h3><p>Students</p></div>
      <div class="stat-card"><h3>10</h3><p>Departments</p></div>
      <div class="stat-card"><h3>50+</h3><p>Faculty</p></div>
    </div>

    <div class="carousel">
      <img src="https://images.unsplash.com/photo-1596496057190-39a2f8d5c991?auto=format&fit=crop&w=1500&q=80" class="active">
      <img src="https://images.unsplash.com/photo-1581090700227-1c7c4e3b06b7?auto=format&fit=crop&w=1500&q=80">
      <img src="https://images.unsplash.com/photo-1564866657313-38c1a1d0b3f1?auto=format&fit=crop&w=1500&q=80">
    </div>

    <!-- Principal Message -->
    <div class="message">
      <h2>Principal’s Message</h2>
      <p>
        Welcome to Government Polytechnic Gunnal. Our mission is to provide
        quality technical education and prepare students for successful careers.
      </p>
    </div>

    <!-- Facilities -->
    <div class="facilities">
      <h2>Our Facilities</h2>
      <div class="facility-grid">
        <div>💻 Computer Labs</div>
        <div>🔧 Mechanical Workshop</div>
        <div>📚 Library</div>
        <div>🏫 Smart Classrooms</div>
        <div>🏀 Sports Ground</div>
        <div>🏠 Hostel</div>
      </div>
    </div>

    <!-- Departments Overview -->
    <div class="departments-overview">
      <h2>Departments</h2>
      <div class="dept-cards">
        <div class="dept-card">Computer Science</div>
        <div class="dept-card">AET</div>
        <div class="dept-card">EEE</div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="gallery">
      <h2>Campus Gallery</h2>
      <div class="gallery-grid">
        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1">
        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b">
        <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a">
      </div>
    </div>

    <!-- Achievements -->
    <div class="achievements">
      <h2>Achievements</h2>
      <p>Many of our students are placed in reputed companies every year.</p>
    </div>

    <!-- Notice Board -->
    <div class="notice-board">
      <marquee>Admissions Open | Scholarship Available | Exam Time Table Released</marquee>
    </div>
  `;

  startCarousel();
}

    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 4000);
}

// ---------------- COURSES ----------------
function loadCourses(){
  main.innerHTML = `
    <h1>Courses Offered</h1>
    <div class="course-buttons">
      <button onclick="showDept('cs')">Computer Science (CS)</button>
      <button onclick="showDept('aet')">AET</button>
      <button onclick="showDept('eee')">EEE</button>
    </div>
    <div id="dept-container"></div>
  `;
}

// ---------------- DEPARTMENTS ----------------
const departments = {
  cs: `<div class="dept-layout cs">
        <div class="card left">
          <h2>Lecturers</h2>
          <ol><li>Ranganath</li><li>Raghvendra</li></ol>
        </div>
        <div class="card right">
          <h2>HOD Information</h2>
          <div class="hod-box">
            <img src="https://randomuser.me/api/portraits/men/32.jpg">
            <div class="info-row"><span>Name</span><strong>Basavaraj</strong></div>
          </div>
        </div>
      </div>`,
  aet: `<div class="dept-layout aet"><div class="card left"><h2>AET Dept</h2></div></div>`,
  eee: `<div class="dept-layout eee"><div class="card left"><h2>EEE Dept</h2></div></div>`
};

function showDept(dept){
  const container = document.getElementById('dept-container');
  container.innerHTML = departments[dept];
  setTimeout(()=> container.querySelector('.dept-layout').classList.add('show'),50);
}

// ---------------- LOGIN ----------------
function loginPage(){
  main.innerHTML = `
    <h1>Login</h1>
    <div class="login-form">
      <div class="error-msg" id="error-msg"></div>
      <input type="text" id="username" placeholder="Username">
      <input type="password" id="password" placeholder="Password">
      <button onclick="submitLogin()">Login</button>
    </div>
  `;
}

async function submitLogin(){
  const u = username.value.trim();
  const p = password.value.trim();

  const res = await fetch(`${apiBase}/users`);
  const users = await res.json();
  const user = users.find(x=>x.username===u && x.password===p);

  if(user){
    alert("Login Success");
  }else{
    document.getElementById('error-msg').style.display="block";
    errorMsg.textContent="Invalid login!";
  }
}
