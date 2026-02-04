const main = document.getElementById('main-content');
const apiBase = "https://6982f0249c3efeb892a3c0ce.mockapi.io/PolytechnicPortal";


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
        <li>New semester starts from 15th Feb 2026.</li>
        <li>Lab schedules updated for CS department.</li>
        <li>Apply for hostel before 10th Feb 2026.</li>
      </ul>
    </div>

    <div class="carousel">
      <img src="https://images.unsplash.com/photo-1596496057190-39a2f8d5c991?auto=format&fit=crop&w=1500&q=80" class="active">
      <img src="https://images.unsplash.com/photo-1581090700227-1c7c4e3b06b7?auto=format&fit=crop&w=1500&q=80">
      <img src="https://images.unsplash.com/photo-1564866657313-38c1a1d0b3f1?auto=format&fit=crop&w=1500&q=80">
    </div>
  `;
  startCarousel();
}


// ---------------- CAROUSEL ----------------
function startCarousel(){
  const slides = document.querySelectorAll('.carousel img');
  let index = 0;
  setInterval(()=>{
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 4000);
}


// ---------------- COURSES & DEPARTMENTS ----------------
const departments = {
  cs: `<h2>Computer Science Department</h2><p>Lecturers and HOD info here...</p>`,
  aet:`<h2>AET Department</h2><p>Lecturers and HOD info here...</p>`,
  eee:`<h2>EEE Department</h2><p>Lecturers and HOD info here...</p>`
};

function loadCourses(){
  main.innerHTML = `
    <h1>Courses Offered</h1>
    <button onclick="showDept('cs')">CS</button>
    <button onclick="showDept('aet')">AET</button>
    <button onclick="showDept('eee')">EEE</button>
    <div id="dept-container"></div>
  `;
}

function showDept(dept){
  document.getElementById('dept-container').innerHTML = departments[dept];
}


// ---------------- LOGIN PAGE ----------------
function loginPage(){
  main.innerHTML = `
    <h1>Login</h1>
    <div id="error-msg" style="color:red;"></div>
    <input type="text" id="username" placeholder="Username"><br><br>
    <input type="password" id="password" placeholder="Password"><br><br>
    <button onclick="submitLogin()">Login</button>
  `;
}


// ---------------- MOCKAPI LOGIN ----------------
async function submitLogin(){
  const username = username.value.trim();
  const password = password.value.trim();

  const res = await fetch(`${apiBase}/users`);
  const users = await res.json();

  const user = users.find(u=>u.username===username && u.password===password);

  if(user){
    if(user.role==="admin") loadAdminDashboard();
    else loadStudentDashboard(user.id);
  }else{
    document.getElementById('error-msg').textContent="Invalid login!";
  }
}


// ---------------- ADMIN DASHBOARD ----------------
function loadAdminDashboard(){
  main.innerHTML = `<h2>Admin Dashboard</h2><p>Manage students here...</p>
  <button onclick="loadHome()">Home</button>`;
}


// ---------------- STUDENT DASHBOARD ----------------
async function loadStudentDashboard(id){
  const res = await fetch(`${apiBase}/users/${id}`);
  const student = await res.json();

  main.innerHTML = `
    <h2>Welcome ${student.name}</h2>
    <p>Roll: ${student.roll}</p>
    <button onclick="loadHome()">Home</button>
  `;
}


// ---------------- INITIAL LOAD ----------------
window.onload = loadHome;
