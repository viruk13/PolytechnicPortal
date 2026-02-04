const STUDENTS_API = "https://6982f0249c3efeb892a3c0ce.mockapi.io/PolytechnicPortal/students";

// Global main content
const main = document.getElementById('main-content');

// --------- HOME ----------
function loadHome(){
  main.innerHTML = `<h1>Welcome to Government Polytechnic Gunnal</h1>
  <p style="text-align:center;">Click “Courses” above to see department details!</p>`;
}

// --------- COURSES ----------
// --------- DEPARTMENTS ----------
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

// --------- LOAD COURSES ----------
function loadCourses(){
  main.innerHTML = `<h1>Courses Offered</h1>
    <div class="course-buttons">
      <button onclick="showDept('cs')">Computer Science (CS)</button>
      <button onclick="showDept('aet')">Alternative Energy Technology (AET)</button>
      <button onclick="showDept('eee')">Electrical & Electronics (EEE)</button>
    </div>
    <div id="dept-container"></div>`;
}

// --------- SHOW DEPARTMENT ----------
function showDept(dept){
  const container = document.getElementById('dept-container');
  container.innerHTML = departments[dept] || '<p>Department not found.</p>';
  const layout = container.querySelector('.dept-layout');
  setTimeout(()=> layout.classList.add('show'),50);
}


// --------- LOGIN ----------
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

// Simple login (MockAPI demo)
async function submitLogin(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('error-msg');
  if(!username || !password){ errorMsg.style.display="block"; errorMsg.textContent="Enter both fields!"; return; }

  try{
    const res = await fetch(STUDENTS_API);
    const students = await res.json();
    const user = students.find(s=>s.username===username && s.password===password);
    if(user){ 
      errorMsg.style.display="none"; 
      loadStudentDashboard(user.id);
    } else { 
      errorMsg.style.display="block"; 
      errorMsg.textContent="Invalid username or password!";
    }
  } catch(err){ alert("Error fetching students: " + err); }
}

// --------- STUDENT DASHBOARD ----------
async function loadStudentDashboard(id){
  try{
    const res = await fetch(`${STUDENTS_API}/${id}`);
    const student = await res.json();
    main.innerHTML = `<h1>Welcome ${student.name}</h1>
    <div class="dashboard">
      <div class="dash-card">
        <h3>Marks</h3>
        <ul>
          <li>Math: ${student.marks?.Math||0}</li>
          <li>Physics: ${student.marks?.Physics||0}</li>
          <li>CS: ${student.marks?.CS||0}</li>
        </ul>
      </div>
      <div class="dash-card">
        <h3>Attendance</h3>
        <ul>
          <li>Math: ${student.attendance?.Math||0}%</li>
          <li>Physics: ${student.attendance?.Physics||0}%</li>
          <li>CS: ${student.attendance?.CS||0}%</li>
        </ul>
      </div>
    </div>
    <button onclick="loadHome()" style="margin-top:20px;">Logout</button>`;
  } catch(err){ alert("Error loading student: " + err); }
}

// --------- INIT ----------
loadHome();
