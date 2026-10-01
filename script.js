const KEYS = {
    schedule: "studyBuddySchedules",
    assignment: "studyBuddyAssignments",
    exam: "studyBuddyExams",
    appointment: "studyBuddyAppointments",
    announcement: "studyBuddyAnnouncements"
};

let schedules = JSON.parse(localStorage.getItem(KEYS.schedule)) || [];
let assignments = JSON.parse(localStorage.getItem(KEYS.assignment)) || [];
let exams = JSON.parse(localStorage.getItem(KEYS.exam)) || [];
let appointments = JSON.parse(localStorage.getItem(KEYS.appointment)) || [];
let announcements = JSON.parse(localStorage.getItem(KEYS.announcement)) || [];


/* SAVE */

function saveData(){

    localStorage.setItem(KEYS.schedule,JSON.stringify(schedules));
    localStorage.setItem(KEYS.assignment,JSON.stringify(assignments));
    localStorage.setItem(KEYS.exam,JSON.stringify(exams));
    localStorage.setItem(KEYS.appointment,JSON.stringify(appointments));
    localStorage.setItem(KEYS.announcement,JSON.stringify(announcements));

}


/* PAGE */

function showPage(pageId,button=null){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.add("hidden");
    });

    const page=document.getElementById(pageId);

    if(page){
        page.classList.remove("hidden");
    }

    document.querySelectorAll(".menu-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    if(button){
        button.classList.add("active");
    }else{

        const buttons=document.querySelectorAll(".menu-btn");

        buttons.forEach(btn=>{

            if(btn.getAttribute("onclick") &&
               btn.getAttribute("onclick").includes("'" + pageId + "'")){

                btn.classList.add("active");

            }

        });

    }

    const titles={
        dashboard:["หน้าหลัก","ภาพรวมข้อมูลของห้องเรียน"],
        schedule:["ตารางเรียน","จัดการตารางเรียนของห้อง"],
        assignment:["งานที่ต้องส่ง","ติดตามงานและกำหนดส่ง"],
        exam:["ตารางสอบ","ข้อมูลการสอบของห้องเรียน"],
        appointment:["นัดหมาย","กำหนดการและนัดหมายของห้อง"],
        announcement:["ประกาศ","ข่าวสารและประกาศภายในห้อง"]
    };

    if(titles[pageId]){

        document.getElementById("pageTitle").textContent=titles[pageId][0];
        document.getElementById("pageSubtitle").textContent=titles[pageId][1];

    }

}


/* MODAL */

function openModal(id){

    const modal=document.getElementById(id);

    if(modal){
        modal.classList.add("show");
    }

}

function closeModal(id){

    const modal=document.getElementById(id);

    if(modal){
        modal.classList.remove("show");
    }

}

document.addEventListener("click",function(e){

    if(e.target.classList.contains("modal")){
        e.target.classList.remove("show");
    }

});


/* SCHEDULE */

function addSchedule(){

    const day=document.getElementById("scheduleDay").value;
    const time=document.getElementById("scheduleTime").value.trim();
    const subject=document.getElementById("scheduleSubject").value.trim();
    const room=document.getElementById("scheduleRoom").value.trim();
    const teacher=document.getElementById("scheduleTeacher").value.trim();

    if(!day || !time || !subject){

        alert("กรุณากรอกข้อมูลให้ครบ");

        return;
    }

    schedules.push({
        id:Date.now(),
        day,
        time,
        subject,
        room,
        teacher
    });

    saveData();
    renderAll();

    closeModal("scheduleModal");

    document.getElementById("scheduleDay").value="";
    document.getElementById("scheduleTime").value="";
    document.getElementById("scheduleSubject").value="";
    document.getElementById("scheduleRoom").value="";
    document.getElementById("scheduleTeacher").value="";

}

function deleteSchedule(id){

    schedules=schedules.filter(item=>item.id!==id);

    saveData();
    renderAll();

}

function renderSchedules(){

    const table=document.getElementById("scheduleTable");

    if(schedules.length===0){

        table.innerHTML=`
        <tr>
            <td colspan="6" class="empty">ยังไม่มีตารางเรียน</td>
        </tr>`;

        return;
    }

    table.innerHTML=schedules.map(item=>`

        <tr>

            <td>${item.day}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
            <td>${item.room || "-"}</td>
            <td>${item.teacher || "-"}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteSchedule(${item.id})">
                    ลบ
                </button>
            </td>

        </tr>

    `).join("");

}


/* ASSIGNMENT */

function addAssignment(){

    const name=document.getElementById("assignmentName").value.trim();
    const detail=document.getElementById("assignmentDetail").value.trim();
    const date=document.getElementById("assignmentDate").value;

    if(!name || !date){

        alert("กรุณากรอกชื่องานและกำหนดส่ง");

        return;
    }

    assignments.push({
        id:Date.now(),
        name,
        detail,
        date
    });

    saveData();
    renderAll();

    closeModal("assignmentModal");

    document.getElementById("assignmentName").value="";
    document.getElementById("assignmentDetail").value="";
    document.getElementById("assignmentDate").value="";

}

function deleteAssignment(id){

    assignments=assignments.filter(item=>item.id!==id);

    saveData();
    renderAll();

}

function renderAssignments(){

    const list=document.getElementById("assignmentList");

    if(assignments.length===0){

        list.innerHTML=`
        <div class="item-card">
            <p class="empty">ยังไม่มีงาน</p>
        </div>`;

    }else{

        list.innerHTML=assignments.map(item=>`

        <div class="item-card">

            <h3>📝 ${item.name}</h3>

            <div class="item-date">
                กำหนดส่ง: ${item.date}
            </div>

            <p>${item.detail || "ไม่มีรายละเอียด"}</p>

            <div class="item-actions">

                <button
                    class="delete-btn"
                    onclick="deleteAssignment(${item.id})">
                    ลบ
                </button>

            </div>

        </div>

        `).join("");

    }

}


/* EXAM */

function addExam(){

    const subject=document.getElementById("examSubject").value.trim();
    const date=document.getElementById("examDate").value;
    const time=document.getElementById("examTime").value.trim();
    const room=document.getElementById("examRoom").value.trim();

    if(!subject || !date){

        alert("กรุณากรอกวิชาและวันที่สอบ");

        return;
    }

    exams.push({
        id:Date.now(),
        subject,
        date,
        time,
        room
    });

    saveData();
    renderAll();

    closeModal("examModal");

    document.getElementById("examSubject").value="";
    document.getElementById("examDate").value="";
    document.getElementById("examTime").value="";
    document.getElementById("examRoom").value="";

}

function deleteExam(id){

    exams=exams.filter(item=>item.id!==id);

    saveData();
    renderAll();

}

function renderExams(){

    const table=document.getElementById("examTable");

    if(exams.length===0){

        table.innerHTML=`
        <tr>
            <td colspan="5" class="empty">ยังไม่มีตารางสอบ</td>
        </tr>`;

        return;
    }

    table.innerHTML=exams.map(item=>`

        <tr>

            <td>${item.subject}</td>
            <td>${item.date}</td>
            <td>${item.time || "-"}</td>
            <td>${item.room || "-"}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteExam(${item.id})">
                    ลบ
                </button>

            </td>

        </tr>

    `).join("");

}


/* APPOINTMENT */

function addAppointment(){

    const name=document.getElementById("appointmentName").value.trim();
    const date=document.getElementById("appointmentDate").value;
    const time=document.getElementById("appointmentTime").value.trim();
    const room=document.getElementById("appointmentRoom").value.trim();

    if(!name || !date){

        alert("กรุณากรอกชื่อนัดหมายและวันที่");

        return;
    }

    appointments.push({
        id:Date.now(),
        name,
        date,
        time,
        room
    });

    saveData();
    renderAll();

    closeModal("appointmentModal");

    document.getElementById("appointmentName").value="";
    document.getElementById("appointmentDate").value="";
    document.getElementById("appointmentTime").value="";
    document.getElementById("appointmentRoom").value="";

}

function deleteAppointment(id){

    appointments=appointments.filter(item=>item.id!==id);

    saveData();
    renderAll();

}

function renderAppointments(){

    const list=document.getElementById("appointmentList");

    if(appointments.length===0){

        list.innerHTML=`
        <div class="item-card">
            <p class="empty">ยังไม่มีนัดหมาย</p>
        </div>`;

        return;
    }

    list.innerHTML=appointments.map(item=>`

        <div class="item-card">

            <h3>📌 ${item.name}</h3>

            <div class="item-date">
                ${item.date} ${item.time || ""}
            </div>

            <p>สถานที่: ${item.room || "-"}</p>

            <button
                class="delete-btn"
                onclick="deleteAppointment(${item.id})">
                ลบ
            </button>

        </div>

    `).join("");

}


/* ANNOUNCEMENT */

function addAnnouncement(){

    const title=document.getElementById("announcementTitle").value.trim();
    const detail=document.getElementById("announcementDetailInput").value.trim();

    if(!title || !detail){

        alert("กรุณากรอกหัวข้อและรายละเอียด");

        return;
    }

    announcements.push({
        id:Date.now(),
        title,
        detail,
        date:new Date().toLocaleDateString("th-TH")
    });

    saveData();
    renderAll();

    closeModal("announcementModal");

    document.getElementById("announcementTitle").value="";
    document.getElementById("announcementDetailInput").value="";

}

function deleteAnnouncement(id){

    announcements=announcements.filter(item=>item.id!==id);

    saveData();
    renderAll();

}

function renderAnnouncements(){

    const list=document.getElementById("announcementList");

    if(announcements.length===0){

        list.innerHTML=`
        <div class="item-card">
            <p class="empty">ยังไม่มีประกาศ</p>
        </div>`;

    }else{

        list.innerHTML=announcements.map(item=>`

        <div class="item-card">

            <h3>📢 ${item.title}</h3>

            <div class="item-date">
                ${item.date}
            </div>

            <p>${item.detail}</p>

            <button
                class="delete-btn"
                onclick="deleteAnnouncement(${item.id})">
                ลบ
            </button>

        </div>

        `).join("");

    }

}


/* DASHBOARD */

function updateDashboard(){

    document.getElementById("assignmentCount").textContent=assignments.length;

    document.getElementById("examCount").textContent=exams.length;

    document.getElementById("announcementCount").textContent=announcements.length;


    const todayName=new Date().toLocaleDateString(
        "th-TH",
        {weekday:"long"}
    );

    const todaySchedules=schedules.filter(
        item=>item.day===todayName
    );

    document.getElementById("today").textContent=
        todaySchedules.length;


    const dashboardAssignments=
        document.getElementById("dashboardAssignments");

    if(assignments.length===0){

        dashboardAssignments.innerHTML=
        <p class="empty">ยังไม่มีงาน</p>;

    }else{

        dashboardAssignments.innerHTML=
        assignments.slice(0,3).map(item=>`

            <div class="dashboard-item">

                <b>📝 ${item.name}</b>

                <div class="item-date">
                    ส่ง ${item.date}
                </div>

            </div>

        `).join("");

    }


    const dashboardAnnouncements=
        document.getElementById("dashboardAnnouncements");

    if(announcements.length===0){

        dashboardAnnouncements.innerHTML=
        <p class="empty">ยังไม่มีประกาศ</p>;

    }else{

        dashboardAnnouncements.innerHTML=
        announcements.slice(-3).reverse().map(item=>`

            <div class="dashboard-item">

                <b>📢 ${item.title}</b>

                <p>${item.detail}</p>

            </div>

        `).join("");

    }

}


/* RENDER */

function renderAll(){

    renderSchedules();
    renderAssignments();
    renderExams();
    renderAppointments();
    renderAnnouncements();
    updateDashboard();

}


/* LOGOUT */

function logout(){

    sessionStorage.removeItem("studyBuddyLogin");

    window.location.href="login.html";

}


/* START */

document.addEventListener("DOMContentLoaded",function(){

    renderAll();

});
