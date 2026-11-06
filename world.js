// Three.js: classroom scene, Labubu-style characters, camera, movement loop
const M=(g,c,p,o)=>{const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.75},o||{})));m.position.set(p[0],p[1],p[2]);m.castShadow=m.receiveShadow=true;return m};
const B=(w,h,d)=>new THREE.BoxGeometry(w,h,d),Sp=r=>new THREE.SphereGeometry(r,24,16);
function lbl(t,p,w){const cv=document.createElement("canvas");cv.width=256;cv.height=64;const x=cv.getContext("2d"),tx=new THREE.CanvasTexture(cv),s=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthTest:false}));s.position.set(p[0],p[1],p[2]);s.scale.set(w||2.4,w?w/4:.6,1);s.set=(a,c)=>{x.clearRect(0,0,256,64);x.fillStyle="#000b";x.fillRect(0,8,256,48);x.fillStyle=c||"#f2b53d";x.font="bold 26px Nunito,sans-serif";x.textAlign="center";x.fillText(a,128,42);tx.needsUpdate=true};s.set(t);sc3.add(s);return s}
function Z(n,o,lp){const g=new THREE.Group();o.forEach(m=>g.add(m));g.traverse(c=>c.userData.zone=n);sc3.add(g);zones[n]=g;lbls[n]=lbl(n,lp)}
function mk(i){const[,c,a]=NM[i],g=new THREE.Group(),f=0xf8d2b4,eyes=[],br=[];
const A=(geo,col,p,s,o)=>{const m=M(geo,col,p,o);if(s)m.scale.set(s[0],s[1],s[2]);g.add(m);return m};
A(Sp(.5),c,[0,.62,0],[1,1.05,.9]);A(Sp(.62),c,[0,1.55,0],[1,.95,.95]);A(Sp(.5),f,[0,1.5,.38],[1,.95,.5]);
for(const s of[-1,1]){A(Sp(.16),c,[s*.3,2.3,0],[1,3,.7]).rotation.z=-s*.2;A(Sp(.1),0xf7c6d2,[s*.3,2.3,.07],[1,3,.5]).rotation.z=-s*.2;
eyes.push(A(Sp(.1),0x2b1a2a,[s*.2,1.6,.6],[1,1.2,.5]));A(Sp(.025),0xffffff,[s*.2-.03,1.65,.67]);A(Sp(.08),0xf08a8a,[s*.34,1.45,.58],[1,.7,.3],{transparent:true,opacity:.6});
A(Sp(.13),f,[s*.52,.7,.15],[1,1.4,1]);A(Sp(.15),f,[s*.22,.08,.2],[1.2,.6,1.4]);
const b=A(B(.2,.04,.03),0x2b1a2a,[s*.2,1.78,.64]);b.rotation.z=s*.4;b.visible=false;br.push(b)}
A(Sp(.05),0xff8a2b,[0,1.5,.66]);A(B(.4,.12,.04),0x3a1d2e,[0,1.36,.63]);
for(let k=-2;k<=2;k++){const t=A(new THREE.ConeGeometry(.03,.07,6),0xffffff,[k*.07,1.4,.66]);t.rotation.x=Math.PI}
if(a=="cap")A(new THREE.SphereGeometry(.64,24,12,0,6.3,0,1.57),0xd94f3d,[0,1.75,0]);
if(a=="bow"){for(const s of[-1,1])A(new THREE.ConeGeometry(.12,.3,4),0xe0334f,[.42+s*.14,2.0,.1]).rotation.z=s*1.57}
if(a=="glasses")for(const s of[-1,1])A(new THREE.TorusGeometry(.14,.02,8,20),0x222222,[s*.2,1.6,.66]);
if(a=="band")A(new THREE.CylinderGeometry(.63,.63,.07,24),0xf2b53d,[0,1.9,0]);
if(a=="scarf")A(new THREE.TorusGeometry(.42,.09,10,24),0xd94f3d,[0,1.0,0]).rotation.x=1.57;
g.userData={eyes,br};g.traverse(x=>x.userData.idx=i);return g}

let R,sc3,cam,lamp,ring,pring,tT,cT,ray,ms,chars=[],zones={},lbls={},th=0,ph=1.05,jd=0,pt=0,wide=0,zm=0;const V=new THREE.Vector3();
const SP=i=>[[-3.5,0,3.5][i%3],[-.3,2.5][i/3|0]];
function world(){R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.shadowMap.enabled=true;$("#cv").appendChild(R.domElement);
sc3=new THREE.Scene();sc3.background=new THREE.Color(0x10201e);sc3.fog=new THREE.Fog(0x10201e,18,36);cam=new THREE.PerspectiveCamera(58,1,.1,60);
tT=new THREE.Vector3(0,1.2,.5);cT=tT.clone();ray=new THREE.Raycaster();ms=new THREE.Vector2();
sc3.add(new THREE.HemisphereLight(0xfff1d0,0x203830,.7));lamp=new THREE.SpotLight(0xffe2a0,1.4,40,1.2,.5);lamp.position.set(0,9,4);lamp.castShadow=true;sc3.add(lamp);
sc3.add(M(B(14,.2,11),0x8a6a46,[0,-.1,0]),M(B(14,5,.2),0xcfc3a6,[0,2.5,-5.5]),M(B(.2,5,11),0xc4b898,[-7,2.5,0]),M(B(.2,5,11),0xc4b898,[7,2.5,0]),M(B(.1,3.2,1.8),0x5b3a20,[-6.9,1.6,2]));
Z("Board",[M(B(5,2.2,.1),0x1f4a3a,[-2.5,2.7,-5.35]),M(B(5.3,.1,.14),0x6b4a2b,[-2.5,1.55,-5.3]),M(new THREE.CylinderGeometry(.22,.22,1,16),0xc8372d,[-5.2,.5,-5.2])],[-2.5,4.2,-5.3]);
Z("Window",[M(B(.1,2,2.6),0x9ad0e8,[6.9,2.8,-1],{emissive:0x4a7a9a}),M(B(.3,.06,.4),0xffffff,[6.7,1.78,-1])],[6.4,4.3,-1]);
Z("Door panel",[M(B(.14,.9,.7),0x8a8f94,[-6.8,1.6,3.3]),M(Sp(.08),0xff3030,[-6.7,1.9,3.3],{emissive:0xff0000})],[-6.2,3.3,3.3]);
Z("Switchboard",[M(B(1.2,1.6,.1),0x8a8f94,[4.5,2.2,-5.35]),...[0,1,2].map(k=>M(B(.12,.2,.08),0x222222,[4.2+.3*k,2.2,-5.27]))],[4.5,3.6,-5.3]);
Z("Desks",[M(B(.9,.1,.3),0xffffff,[-3.5,1.22,.6]),M(B(.2,.1,.1),0x222222,[-3.0,1.22,.6])],[-3.5,2.2,.6]);
Z("Bags",[M(B(.7,.6,.4),0x2b4a8a,[-5.6,.3,-3.4]),M(B(.6,.5,.4),0xc8372d,[-4.7,.25,-3.6])],[-5.2,1.4,-3.5]);
const xs=[-3.5,0,3.5],zs=[.6,3.4];xs.forEach(x=>zs.forEach(z=>{sc3.add(M(B(2,.12,1.1),0xb08a5a,[x,1.1,z]),M(B(.12,1.1,.9),0x6b4a2b,[x-.9,.55,z]),M(B(.12,1.1,.9),0x6b4a2b,[x+.9,.55,z]))}));

{const cv=document.createElement("canvas");cv.width=560;cv.height=440;const x=cv.getContext("2d");for(let i=0;i<14;i++)for(let j=0;j<11;j++){x.fillStyle=(i+j)%2?"#a07a52":"#7c5d3b";x.fillRect(i*40,j*40,40,40)}
const f=sc3.children.find(o=>o.geometry&&o.geometry.parameters&&o.geometry.parameters.width==14&&o.geometry.parameters.height==.2);if(f){f.material.map=new THREE.CanvasTexture(cv);f.material.color.set(0xffffff);f.material.needsUpdate=true}}
chars=[];for(let i=0;i<7;i++){const g=mk(i);g.position.set(i<6?SP(i)[0]:0,0,i<6?SP(i)[1]:5);sc3.add(g);chars.push(g)}
for(const n in lbls)sc3.remove(lbls[n]);lbls={};for(const n in ZP)lbls[n]=lbl(ZI[n],[ZP[n][0],3.2,ZP[n][1]],1.1);lbls["Door panel"].position.set(-6.2,2.6,3.3);
ring=M(new THREE.TorusGeometry(.7,.05,8,32),0xffb938,[0,.05,0],{emissive:0xffb938});ring.rotation.x=Math.PI/2;ring.visible=false;sc3.add(ring);pring=M(new THREE.TorusGeometry(.55,.07,8,32),0xffd36b,[0,.06,0],{emissive:0xffd36b});pring.rotation.x=Math.PI/2;sc3.add(pring);chars[6].scale.setScalar(1.15);
const rs=()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};addEventListener("resize",rs);rs();
$("#tags").innerHTML=NM.slice(0,6).map(n=>`<div class="tg"><div class="bb"></div><b>${n[0]} <span></span></b></div>`).join("");
let dn=0;R.domElement.addEventListener("pointerdown",e=>{dn=[e.clientX,e.clientY]});addEventListener("pointerup",()=>dn=0);
addEventListener("pointermove",e=>{if(dn&&!jd){th-=(e.clientX-dn[0])*.006;ph=Math.min(1.3,Math.max(.5,ph-(e.clientY-dn[1])*.004));dn=[e.clientX,e.clientY]}});
requestAnimationFrame(loop)}
const DKS=[];[-3.5,0,3.5].forEach(x=>[.6,3.4].forEach(z=>DKS.push([x,z])));
function col(p,r){for(const[x,z]of DKS){const dx=p.x-x,dz=p.z-z,ox=1+r-Math.abs(dx),oz=.55+r-Math.abs(dz);if(ox>0&&oz>0){if(ox<oz)p.x+=Math.sign(dx||1)*ox;else p.z+=Math.sign(dz||1)*oz}}p.x=Math.max(-6.5,Math.min(6.5,p.x));p.z=Math.max(-4.9,Math.min(5.2,p.z))}
function near(){let b=null,bd=2.3;const P=chars[6].position;chars.slice(0,6).forEach((g,i)=>{const d=Math.hypot(g.position.x-P.x,g.position.z-P.z);if(d<bd){bd=d;b={k:"n",i}}});for(const n in ZP){if(n=="Window"&&!G.c3)continue;const d=Math.hypot(ZP[n][0]-P.x,ZP[n][1]-P.z);if(d<bd&&d<2.2){bd=d;b={k:"z",n}}}return b}
function pme(P,t){V.set(P.position.x,3.5,P.position.z).project(cam);const m=$("#me");m.style.display=V.z<1?"block":"none";m.style.transform=`translate(${(V.x*.5+.5)*innerWidth}px,${(-V.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`;pring.visible=true;pring.position.set(P.position.x,.06,P.position.z);pring.rotation.z=t*3}
function nst(){let b=0,d=99;const P=chars[6].position;chars.slice(0,6).forEach((g,i)=>{const q=Math.hypot(g.position.x-P.x,g.position.z-P.z);if(q<d){d=q;b=i}});return b}
function loop(t){requestAnimationFrame(loop);const dt=Math.min(.05,(t-pt)/1000||0);pt=t;t/=1000;const P=chars[6],play=mode=="play";
if(play){const run=!busy;let ix=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+jx,iy=(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0)+jy,m=Math.hypot(ix,iy);
if(run&&m>.1){if(m>1){ix/=m;iy/=m}const vx=ix*Math.cos(th)-iy*Math.sin(th),vz=-ix*Math.sin(th)-iy*Math.cos(th);P.position.x+=vx*4.2*dt;P.position.z+=vz*4.2*dt;col(P.position,.35);let d=Math.atan2(vx,vz)-P.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));P.rotation.y+=d*.25;P.position.y=Math.abs(Math.sin(t*11))*.12;P.rotation.z=Math.sin(t*11)*.08;stp+=dt;if(stp>.34){stp=0;thud()}}else{P.position.y=Math.abs(Math.sin(t*2))*.03;P.rotation.z=0;stp=.3}
tT.set(P.position.x,1.2,P.position.z);cT.lerp(tT,.1);if(G.tl>0&&!busy){G.tl-=dt;const q=Math.ceil(G.tl);$("#tmr").textContent="⏱ "+q;if(q<=10&&q!=G.tk){G.tk=q;tone(900,.05,"square",.04)}if(G.tl<=0){finish(0,1);return}}tgt=near();
chars.slice(0,6).forEach((g,i)=>{const w=nv[i],en=tgt&&tgt.k=="n"&&tgt.i==i;if(en){let d=Math.atan2(P.position.x-g.position.x,P.position.z-g.position.z)-g.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));g.rotation.y+=d*.2;g.position.y=Math.abs(Math.sin(t*2+i))*.04;g.rotation.z=0;return}
if(w.wait>0){w.wait-=dt;g.position.y=Math.abs(Math.sin(t*2+i))*.04;g.rotation.z=0;return}
const dx=w.x-g.position.x,dz=w.z-g.position.z,d=Math.hypot(dx,dz);if(d<.2){w.wait=1.5+Math.random()*3;const q=pk(WP);w.x=q[0];w.z=q[1];return}
g.position.x+=dx/d*1.3*dt;g.position.z+=dz/d*1.3*dt;col(g.position,.35);g.rotation.y=Math.atan2(dx,dz);g.position.y=Math.abs(Math.sin(t*9+i))*.1;g.rotation.z=Math.sin(t*9+i)*.07});
ring.visible=!!tgt;if(tgt){const q=tgt.k=="n"?chars[tgt.i].position:{x:ZP[tgt.n][0],z:ZP[tgt.n][1]};ring.position.x=q.x;ring.position.z=q.z;ring.rotation.z=t*2}
dockUI();tags();coach();pme(P,t)}
else{$("#me").style.display="none";pring.visible=false;cT.set(0,1.2,.5);th+=dt*.15;chars.forEach((g,i)=>{if(i<6)g.position.y=Math.abs(Math.sin(t*2+i))*.04})}
const rad=(play?(wide?19:7.5):15)+zm,sp=Math.sin(ph);cam.position.set(cT.x+rad*sp*Math.sin(th),cT.y+rad*Math.cos(ph),cT.z+rad*sp*Math.cos(th));cam.lookAt(cT);R.render(sc3,cam)}
