const main=document.getElementById('main-content');
const apiBase="https://6982f0249c3efeb892a3c0ce.mockapi.io/PolytechnicPortal";

// ------------- HOME ----------------
function loadHome(){
  main.innerHTML = `<h1>Welcome to Government Polytechnic Gunnal</h1>
  <p style="text-align:center;">Click “Courses” above to see department details!</p>`;
}

// ------------- DEPARTMENTS ----------
const departments = {
  cs:`<div class="dept-layout cs">
    <div class="card left">
      <h2>Lecturers</h2>
      <ol>
        <li>Ranganath - B.E</li>
        <li>Raghvendra - M.Tech</li>
        <li>Tejashwini - M.C.A</li>
        <li>Laxmi - M.Tech</li>
        <li>Vijay Laxmi - B.E</li>
      </ol>
    </div>
    <div class="card right">
      <h2>HOD Information</h2>
      <div class="hod-box">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="HOD Photo">
        <div class="info-row"><span>Name</span><strong>Basavaraj</strong></div>
        <div class="info-row"><span>Designation</span><strong>HOD</strong></div>
        <div class="info-row"><span>Contact</span><strong>7259374248</strong></div>
        <div class="info-row"><span>City</span><strong>Kustagi</strong></div>
      </div>
    </div>
  </div>`,
  aet:`<div class="dept-layout aet">
    <div class="card left">
      <h2>Lecturers</h2>
      <ol>
        <li>Mahantesh M - B.E</li>
        <li>Mantesh - M.Tech</li>
        <li>Anuradha - M.C.A</li>
        <li>Uday Kumar - B.E</li>
      </ol>
    </div>
    <div class="card right">
      <h2>HOD Information</h2>
      <div class="hod-box">
        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="HOD Photo">
        <div class="info-row"><span>Name</span><strong>Sandeep</strong></div>
        <div class="info-row"><span>Designation</span><strong>HOD</strong></div>
        <div class="info-row"><span>Contact</span><strong>8217440842</strong></div>
        <div class="info-row"><span>City</span><strong>Lingsuru</strong></div>
      </div>
    </div>
  </div>`,
  eee:`<div class="dept-layout eee">
    <div class="card left">
      <h2>Lecturers</h2>
      <ol>
        <li>Veeresh - B.E</li>
        <li>Shiva Shankar - M.Tech</li>
        <li>Zora Anjum - M.C.A</li>
        <li>Nikath - B.E</li>
        <li>Mohammad Ali - M.Tech</li>
      </ol>
    </div>
    <div class="card right">
      <h2>HOD Information</h2>
      <div class="hod-box">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="HOD Photo">
        <div class="info-row"><span>Name</span><strong>Chandrashekr Sunkad</strong></div>
        <div class="info-row"><span>Designation</span><strong>HOD</strong></div>
        <div class="info-row"><span>Contact</span><strong>7019710649</strong></div>
        <div class="info-row"><span>City</span><strong>Koppal</strong></div>
      </div>
    </div>
  </div>`
};

function loadCourses(){
  main.innerHTML = `<h1>Courses Offered</h1>
    <div class="course-buttons">
      <button onclick="showDept('cs')">Computer Science (CS)</button>
      <button onclick="showDept('aet')">Alternative Energy Technology (AET)</button>
      <button onclick="showDept('eee')">Electrical & Electronics (EEE)</button>
    </div>
    <div id="dept-container"></div>`;
}

function showDept(dept){
  const container = document.getElementById('dept-container');
  container.innerHTML = departments[dept] || '<p>Department not found.</p>';
  const layout = container.querySelector('.dept-layout');
  setTimeout(()=> layout.classList.add('show'),50);
}

// ------------- LOGIN PAGE ----------
function loginPage(){
  main.innerHTML = `<h1>Login</h1>
  <div class="login-form">
    <div class="error-msg" id="error-msg"></div>
    <label>Username:</label>
    <input type="text" id="username" placeholder="Enter username">
    <label>Password:</label>
    <input type="password" id="password" placeholder="Enter password">
    <button onclick="submitLogin()">Login</button>
  </div>`;
}

// ---------------- MOCKAPI LOGIN ----------------
async function submitLogin(){
  const username=document.getElementById('username').value.trim();
  const password=document.getElementById('password').value.trim();
  const errorMsg=document.getElementById('error-msg');

  if(!username||!password){ errorMsg.style.display="block"; errorMsg.textContent="Enter both username and password!"; return; }

  // Fetch users from MockAPI
  const res=await fetch(`${apiBase}/users`);
  const users=await res.json();
  const user=users.find(u=>u.username===username && u.password===password);

  if(user){
    errorMsg.style.display="none";
    if(user.role==="admin") loadAdminDashboard();
    else loadStudentDashboard(user.id);
  } else {
    errorMsg.style.display="block"; 
    errorMsg.textContent="Invalid username or password!";
  }
}

// ----------------- ADMIN DASHBOARD ----------------
async function loadAdminDashboard(){
  main.innerHTML = `<h1>Admin Dashboard</h1>
    <div class="dashboard">
      <div class="dash-card" id="manage-students">
        <h3>Manage Students</h3>
        <input type="text" id="student-name" placeholder="Student Name">
        <input type="text" id="student-roll" placeholder="Roll Number">
        <input type="text" id="student-username" placeholder="Username">
        <input type="password" id="student-pass" placeholder="Password">
        <button onclick="addStudent()">Add Student</button>
        <h4>Current Students:</h4>
        <ul id="student-list"></ul>
      </div>
    </div>
    <button onclick="loadHome()" style="margin-top:20px;">Back to Home</button>`;
  refreshStudentList();
}

async function refreshStudentList(){
  const ul=document.getElementById('student-list');
  ul.innerHTML="";
  const res=await fetch(`${apiBase}/users`);
  const students=await res.json();
  students.filter(s=>s.role!=="admin").forEach(s=>{
    const li=document.createElement('li');
    li.textContent=`${s.name} (${s.roll})`;
    ul.appendChild(li);
  });
}

async function addStudent(){
  const name=document.getElementById('student-name').value.trim();
  const roll=document.getElementById('student-roll').value.trim();
  const username=document.getElementById('student-username').value.trim();
  const pass=document.getElementById('student-pass').value.trim();
  if(!name||!roll||!username||!pass){ alert("Enter all fields!"); return; }

  await fetch(`${apiBase}/users`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name, roll, username, password:pass, role:"student"})
  });
  document.getElementById('student-name').value="";
  document.getElementById('student-roll').value="";
  document.getElementById('student-username').value="";
  document.getElementById('student-pass').value="";
  refreshStudentList();
}

// ----------------- STUDENT DASHBOARD ----------------
async function loadStudentDashboard(id){
  const res=await fetch(`${apiBase}/users/${id}`);
  const student=await res.json();
  main.innerHTML = `<h1>Student Dashboard</h1>
    <h3>${student.name} (${student.roll})</h3>
    <div class="dashboard">
      <div class="dash-card">
        <h3>Marks</h3>
        <ul>
          <li>Math: ${student.marks||0}</li>
          <li>Physics: ${student.physics||0}</li>
          <li>CS: ${student.cs||0}</li>
        </ul>
      </div>
      <div class="dash-card">
        <h3>Attendance</h3>
        <ul>
          <li>Math: ${student.attendanceMath||0}%</li>
          <li>Physics: ${student.attendancePhysics||0}%</li>
          <li>CS: ${student.attendanceCS||0}%</li>
        </ul>
      </div>
    </div>
    <button onclick="loadHome()" style="margin-top:20px;">Back to Home</button>`;
}

// ----------------- INITIAL LOAD ----------------
loadHome();
