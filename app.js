import { auth, db } from './firebase.js';
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js';

import {
doc,setDoc,getDoc,collection,getDocs
} from 'https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js';

const authBox=document.getElementById('auth');
const desktop=document.getElementById('desktop');

signupBtn.onclick=async()=>{
await createUserWithEmailAndPassword(auth,email.value,password.value);
};

loginBtn.onclick=async()=>{
await signInWithEmailAndPassword(auth,email.value,password.value);
};

logoutBtn.onclick=()=>signOut(auth);

onAuthStateChanged(auth,async(user)=>{
if(user){
authBox.classList.add('hidden');
desktop.classList.remove('hidden');
loadFiles();
}else{
authBox.classList.remove('hidden');
desktop.classList.add('hidden');
}
});

explorerBtn.onclick=()=>explorer.classList.toggle('hidden');
notepadBtn.onclick=()=>notepad.classList.toggle('hidden');

createFileBtn.onclick=async()=>{
const user=auth.currentUser;
const name=newFileName.value.trim();
if(!name) return;

await setDoc(doc(db,'users',user.uid,'files',name),{
content:''
});
loadFiles();
};

async function loadFiles(){
const user=auth.currentUser;
const snap=await getDocs(collection(db,'users',user.uid,'files'));
fileList.innerHTML='';
fileSelect.innerHTML='';

snap.forEach(d=>{
const li=document.createElement('li');
li.textContent=d.id;
fileList.appendChild(li);

const op=document.createElement('option');
op.value=d.id;
op.textContent=d.id;
fileSelect.appendChild(op);
});

if(fileSelect.value) loadCurrentFile();
}

fileSelect.onchange=loadCurrentFile;

async function loadCurrentFile(){
const user=auth.currentUser;
const ref=doc(db,'users',user.uid,'files',fileSelect.value);
const snap=await getDoc(ref);
noteContent.value=snap.exists()?snap.data().content:'';
}

saveBtn.onclick=async()=>{
const user=auth.currentUser;
await setDoc(doc(db,'users',user.uid,'files',fileSelect.value),{
content:noteContent.value
});
alert('저장 완료');
};
