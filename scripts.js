const SEED=[
{id:1,title:"Junior Web Developer",co:"PixelCraft Technologies",area:"SG Highway",type:"Full-time",exp:0,sal:"₹2.4–3.6 LPA",skills:["HTML","CSS","JavaScript","React"],date:"2026-09-30",desc:"Work with our web team to build client websites and dashboards. Senior developers will guide you throughout.",res:["Build UI components","Fix bugs and take part in code reviews","Coordinate with designers"],req:["BCA / BSc IT / B.Tech or equivalent","Good understanding of HTML, CSS and JavaScript","Basic knowledge of React is a plus"]},
{id:2,title:"Python Backend Developer",co:"NimbusSoft Solutions",area:"Prahlad Nagar",type:"Full-time",exp:2,sal:"₹6–9 LPA",skills:["Python","Django","PostgreSQL","REST"],date:"2026-09-28",desc:"Design and maintain scalable APIs and background services for a fast-growing SaaS product.",res:["Develop REST APIs","Optimize database queries","Write unit tests"],req:["1-3 years of Python/Django experience","Strong knowledge of SQL","Understanding of Git and REST"]},
{id:3,title:"Android App Intern",co:"AppNest Labs",area:"Navrangpura",type:"Internship",exp:0,sal:"₹8,000–12,000 / month",skills:["Kotlin","Android","Firebase"],date:"2026-10-01",desc:"A 6-month paid internship. Work on live apps and earn a full-time offer based on your performance.",res:["Implement screens and features","Integrate Firebase","Test apps and fix bugs"],req:["Kotlin/Java basics","One small Android project (GitHub link)","Eagerness to learn"]},
{id:4,title:"UI/UX Designer",co:"Studio Sutra",area:"Bodakdev",type:"Full-time",exp:2,sal:"₹4.5–7 LPA",skills:["Figma","Prototyping","User Research"],date:"2026-09-26",desc:"Create user-friendly designs for web and mobile products, from research to final handoff.",res:["Create wireframes and prototypes","Maintain the design system","Hand off designs to developers"],req:["Expertise in Figma","Portfolio with 2+ projects","Understanding of design thinking"]},
{id:5,title:"DevOps Engineer",co:"CloudKart Systems",area:"Gift City, Gandhinagar",type:"Full-time",exp:4,sal:"₹12–18 LPA",skills:["AWS","Docker","Kubernetes","CI/CD"],date:"2026-09-22",desc:"Make our cloud infrastructure and deployment pipelines reliable, secure and automated.",res:["Build CI/CD pipelines","Manage AWS infrastructure","Handle monitoring and incident response"],req:["3+ years of DevOps experience","Hands-on with Docker and Kubernetes","Linux and scripting skills"]},
{id:6,title:"Technical Support Executive",co:"BrightDesk Services",area:"Satellite",type:"Full-time",exp:0,sal:"₹2.2–3 LPA",skills:["Troubleshooting","Communication","Ticketing"],date:"2026-09-29",desc:"Provide technical support to international clients over email and chat. Training is provided by the company.",res:["Resolve support tickets","Escalate issues","Update the knowledge base"],req:["Good English communication","Computer fundamentals","Willing to work rotational shifts"]},
{id:7,title:"React Frontend Developer (Remote)",co:"Orbit Digital",area:"Remote (Ahmedabad)",type:"Remote",exp:2,sal:"₹7–11 LPA",skills:["React","TypeScript","Tailwind"],date:"2026-09-25",desc:"Build modern web apps with a remote-first team. Priority given to candidates from Ahmedabad.",res:["Build reusable components","Integrate APIs","Optimize performance"],req:["2+ years of React experience","Knowledge of TypeScript","Write clean, testable code"]},
{id:8,title:"Data Analyst (Part-time)",co:"InsightWorks Analytics",area:"Vastrapur",type:"Part-time",exp:0,sal:"₹15,000–20,000 / month",skills:["Excel","SQL","Power BI"],date:"2026-09-27",desc:"A part-time role for students and freshers with flexible hours. Build reports and dashboards.",res:["Clean data","Build dashboards","Share weekly reports"],req:["Excel and SQL basics","Analytical mindset","Available 4 hours a day"]}
];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let custom=LS.get("custom",[]),saved=LS.get("saved",[]),apps=LS.get("apps",[]),tab="all";
const jobs=()=>[...custom,...SEED];
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const AREAS=[...new Set(SEED.map(j=>j.area))].sort();
AREAS.forEach(a=>$("#fArea").insertAdjacentHTML("beforeend",`<option>${esc(a)}</option>`));
const expLabel=e=>e==0?"Fresher":e==2?"1-3 yrs":"3+ yrs";
const ago=d=>{const n=Math.max(0,Math.round((Date.now()-new Date(d))/864e5));return n==0?"Today":n==1?"1 day ago":n+" days ago"};

function render(){
  $("#sc").textContent=saved.length;$("#ac").textContent=apps.length;
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.t==tab));
  $("#filters").style.display=tab=="all"?"":"none";
  if(tab=="apps"){
    $("#cnt").textContent="";
    $("#list").innerHTML=apps.length?apps.map(a=>`<div class="card"><div><h3>${esc(a.title)}</h3><div class="co">${esc(a.co)} • ${esc(a.when)}</div><div class="co">Ref: ${esc(a.ref)} • ${esc(a.name)} (${esc(a.email)})</div></div><span class="tag">Applied ✓</span></div>`).join(""):'<div class="empty">You have not applied to any jobs yet.</div>';
    return;
  }
  const q=$("#q").value.toLowerCase(),t=$("#fType").value,e=$("#fExp").value,a=$("#fArea").value;
  let L=jobs().filter(j=>(tab=="all"||saved.includes(j.id))&&(!q||(j.title+j.co+j.skills.join(" ")).toLowerCase().includes(q))&&(!t||j.type==t)&&(e===""||j.exp==e)&&(!a||j.area==a));
  L.sort((x,y)=>new Date(y.date)-new Date(x.date));
  $("#cnt").textContent=L.length+(L.length==1?" job found":" jobs found");
  $("#list").innerHTML=L.length?L.map(j=>`<div class="card"><div><h3 data-o="${j.id}">${esc(j.title)}</h3><div class="co">${esc(j.co)} • ${esc(j.area)}</div><div class="tags"><span class="tag">${esc(j.type)}</span><span class="tag">${expLabel(j.exp)}</span><span class="tag">${esc(j.sal)}</span>${j.skills.slice(0,3).map(s=>`<span class="tag">${esc(s)}</span>`).join("")}</div><div class="co" style="margin-top:6px">${ago(j.date)}</div></div><div class="acts"><button class="star ${saved.includes(j.id)?"on":""}" data-s="${j.id}" aria-label="Save job">★</button><button class="btn g" data-o="${j.id}">Details</button></div></div>`).join(""):'<div class="empty">No jobs found. Try changing the filters.</div>';
}
function openJob(id){
  const j=jobs().find(x=>x.id==id);if(!j)return;
  const done=apps.some(a=>a.id==id);
  $("#md").innerHTML=`<button class="btn g x" data-c>✕</button><h2>${esc(j.title)}</h2><div class="co">${esc(j.co)} • ${esc(j.area)}</div><div class="tags"><span class="tag">${esc(j.type)}</span><span class="tag">${expLabel(j.exp)}</span><span class="tag">${esc(j.sal)}</span></div>
  <h4>Job description</h4><p>${esc(j.desc)}</p><h4>Responsibilities</h4><ul>${j.res.map(r=>`<li>${esc(r)}</li>`).join("")}</ul><h4>Requirements</h4><ul>${j.req.map(r=>`<li>${esc(r)}</li>`).join("")}</ul><h4>Skills</h4><div class="tags">${j.skills.map(s=>`<span class="tag">${esc(s)}</span>`).join("")}</div>
  <h4>How to apply</h4><ol><li>Fill in your name, email and phone number correctly in the form below.</li><li>Paste a link to your resume (Google Drive / LinkedIn / GitHub). Make sure the link is public.</li><li>In the cover note, write 2-3 lines on why you are a good fit for this role.</li><li>Click Submit. You will receive a reference ID, and HR will contact you within 5-7 working days.</li></ol>
  ${done?'<div class="ok">You have already applied for this job ✓</div>':`<form id="af" novalidate><div class="row"><div><label>Full name *</label><input name="name"><div class="err" data-e="name"></div></div><div><label>Email *</label><input name="email" type="email"><div class="err" data-e="email"></div></div></div><div class="row"><div><label>Phone (10 digits) *</label><input name="phone" inputmode="numeric"><div class="err" data-e="phone"></div></div><div><label>Resume link *</label><input name="resume" placeholder="https://..."><div class="err" data-e="resume"></div></div></div><label>Cover note</label><textarea name="note" rows="3"></textarea><p><button class="btn" type="submit">Apply now</button></p><div id="res"></div></form>`}`;
  $("#ov").classList.add("show");
  const f=$("#af");if(f)f.onsubmit=ev=>{ev.preventDefault();submit(j,f)};
}
function submit(j,f){
  const d=Object.fromEntries(new FormData(f)),E={};
  if(d.name.trim().length<3)E.name="Enter your full name";
  if(!/^\S+@\S+\.\S+$/.test(d.email))E.email="Enter a valid email";
  if(!/^[6-9]\d{9}$/.test(d.phone))E.phone="Enter a valid 10-digit number";
  if(!/^https?:\/\/\S+\.\S+/.test(d.resume))E.resume="Enter a link starting with https://";
  f.querySelectorAll("[data-e]").forEach(n=>n.textContent=E[n.dataset.e]||"");
  if(Object.keys(E).length)return;
  const ref="AJ"+Math.random().toString(36).slice(2,8).toUpperCase();
  apps.unshift({id:j.id,title:j.title,co:j.co,name:d.name.trim(),email:d.email,ref,when:new Date().toLocaleDateString("en-IN")});
  LS.set("apps",apps);
  f.querySelector("button[type=submit]").disabled=true;
  $("#res").innerHTML=`<div class="ok">✅ Application submitted! Reference ID: <b>${ref}</b></div>`;render();
}
function postForm(){
  $("#md").innerHTML=`<button class="btn g x" data-c>✕</button><h2>Post a new job</h2><form id="pf" novalidate><label>Job title *</label><input name="title"><label>Company *</label><input name="co"><div class="row"><div><label>Area</label><input name="area" placeholder="e.g. SG Highway"></div><div><label>Salary</label><input name="sal" placeholder="₹3–5 LPA"></div></div><div class="row"><div><label>Type</label><select name="type"><option>Full-time</option><option>Internship</option><option>Part-time</option><option>Remote</option></select></div><div><label>Experience</label><select name="exp"><option value="0">Fresher</option><option value="2">1-3 yrs</option><option value="4">3+ yrs</option></select></div></div><label>Skills (comma separated)</label><input name="skills"><label>Description *</label><textarea name="desc" rows="3"></textarea><div class="err" id="pe"></div><p><button class="btn" type="submit">Post job</button></p></form>`;
  $("#ov").classList.add("show");
  $("#pf").onsubmit=ev=>{ev.preventDefault();const d=Object.fromEntries(new FormData(ev.target));
    if(!d.title.trim()||!d.co.trim()||!d.desc.trim()){$("#pe").textContent="Title, company and description are required";return}
    const id=Date.now();custom.unshift({id,title:d.title.trim(),co:d.co.trim(),area:d.area.trim()||"Ahmedabad",type:d.type,exp:+d.exp,sal:d.sal.trim()||"Not disclosed",skills:d.skills.split(",").map(s=>s.trim()).filter(Boolean),date:new Date().toISOString().slice(0,10),desc:d.desc.trim(),res:["Details will be shared during the interview"],req:["Skills as per the job description"]});
    LS.set("custom",custom);$("#ov").classList.remove("show");tab="all";render();};
}
document.addEventListener("click",e=>{
  const o=e.target.closest("[data-o]"),s=e.target.closest("[data-s]"),t=e.target.closest(".tab");
  if(o)openJob(o.dataset.o);
  else if(s){const id=+s.dataset.s;saved=saved.includes(id)?saved.filter(x=>x!=id):[...saved,id];LS.set("saved",saved);render()}
  else if(t){tab=t.dataset.t;render()}
  else if(e.target.closest("[data-c]")||e.target.id=="ov")$("#ov").classList.remove("show");
});
$("#postBtn").onclick=postForm;
["q","fType","fExp","fArea"].forEach(i=>$("#"+i).addEventListener("input",render));
render();