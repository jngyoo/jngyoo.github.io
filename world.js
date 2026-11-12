'use strict';
const scene=document.querySelector('#scene');let art='',front='';
const P=(x,y,z=0)=>[590+(x-y)*.84,330+(x+y)*.43-z];
const pts=a=>a.map(p=>P(...p).join(',')).join(' ');
function poly(a,fill,stroke='none',sw=1){return `<polygon points="${pts(a)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`}
function box(x,y,z,w,d,h,c){return poly([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],c[0])+poly([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],c[1])+poly([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],c[2]);}
function line(a,b,c,w=1){let p=P(...a),q=P(...b);return `<path d="M${p}L${q}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`}
function ellipse(x,y,z,rx,ry,color){const p=P(x,y,z);return `<ellipse cx="${p[0]}" cy="${p[1]}" rx="${rx}" ry="${ry}" fill="${color}"/>`}
function plant(x,y,z,scale=1){const [a,b]=P(x,y,z);return `<g transform="translate(${a} ${b}) scale(${scale})"><ellipse cy="4" rx="23" ry="10" fill="#6a765c" opacity=".15"/><path d="M-18-24H18L13 3Q0 15-13 3Z" fill="#c79878"/><ellipse cy="-24" rx="18" ry="7" fill="#e3b99a"/><ellipse cy="-25" rx="13" ry="4" fill="#7f6955"/><g class="leaf"><path d="M0-23V-77M0-40L-22-63M1-47L25-80" fill="none" stroke="#627e55" stroke-width="3"/><ellipse cx="-15" cy="-58" rx="12" ry="23" fill="#8b9c6f" transform="rotate(-40 -15 -58)"/><ellipse cx="14" cy="-76" rx="13" ry="25" fill="#a2ae7e" transform="rotate(36 14 -76)"/><ellipse cx="-3" cy="-86" rx="12" ry="22" fill="#718c65"/><ellipse cx="19" cy="-47" rx="10" ry="22" fill="#90a777" transform="rotate(60 19 -47)"/></g></g>`}
art+='<ellipse cx="618" cy="681" rx="385" ry="82" fill="#76826b" opacity=".14" filter="url(#shadow)"/>';
// Floating foundation and warm parquet floor.
art+=box(0,0,-22,500,410,22,['#e4d2b2','#c4ac89','#b69e7d']);
for(let y=0;y<410;y+=41)for(let x=0;x<500;x+=100){let w=Math.min(100,500-x),d=41;art+=poly([[x,y,1],[x+w,y,1],[x+w,y+d,1],[x,y+d,1]],['#e6d4b7','#e9d9bd','#dfcbae'][(x/100+y/41)%3],'#d8c3a2',.7)}
// Walls: dusty sage and pale lavender.
art+=box(-8,-8,0,508,8,226,['#e3e2d6','#dadcd0','#b4bba8']);
art+=box(-8,0,0,8,410,226,['#e9e8de','#c1c8bd','#d4d9cf']);
art+=box(0,0,0,500,5,10,['#e5ddcc','#b2bba6','#b2bba6']);
art+=box(0,0,0,5,410,10,['#ece7d8','#aeb9a2','#b5bda9']);
// Window on left wall with sky, clouds and wooden frame.
art+=poly([[2,75,75],[2,235,75],[2,235,201],[2,75,201]],'#f3ecdc','#e9e7d9',9);
art+=poly([[4,84,83],[4,226,83],[4,226,193],[4,84,193]],'#b9cdd1');
art+=poly([[5,84,83],[5,226,83],[5,226,111],[5,188,124],[5,142,101],[5,110,122],[5,84,113]],'#a7b9a0');
art+=line([6,155,83],[6,155,193],'#f6f2e7',7)+line([6,84,138],[6,226,138],'#f6f2e7',6);
art+=box(0,67,70,22,176,8,['#f7efdf','#d8ccb5','#c7bfa9']);
// Sunbeam across floor.
art+=poly([[15,95,2],[15,210,2],[245,340,2],[250,215,2]],'#f7e9c5');
// Framed picture and clock on far wall.
art+=poly([[65,1,111],[145,1,111],[145,1,182],[65,1,182]],'#b69270');
art+=poly([[72,2,119],[138,2,119],[138,2,174],[72,2,174]],'#f2e9d7');
art+=poly([[78,3,122],[130,3,122],[114,3,151],[102,3,137],[91,3,150]],'#93a087');
let clock=P(211,1,166);art+=`<g transform="translate(${clock}) skewY(27)"><circle r="22" fill="#b99876"/><circle r="18" fill="#f8f0df"/><line id="clock-hour" y2="-9" stroke="#708067" stroke-width="2.4" stroke-linecap="round"/><line id="clock-min" y2="-14" stroke="#708067" stroke-width="1.6" stroke-linecap="round"/><line id="clock-sec" y1="3" y2="-15" stroke="#b77e4f" stroke-width=".7" stroke-linecap="round"/><circle r="2" fill="#708067"/></g>`;
// Shelf of memories.
art+=box(320,10,0,141,42,155,['#c2aa83','#ceb894','#a58e6d']);
art+=box(329,12,14,121,44,128,['#aa926d','#ac9472','#a58e6d']);
for(const z of [15,62,109,154])art+=box(318,7,z,147,51,6,['#d9c29b','#baa07b','#ac926e']);
for(let i=0;i<7;i++)art+=(i===2?'<g id="shelf-book">':'')+box(331+i*13,34,115,9,20,27+(i%3)*5,[['#b4bd9d','#c8a281','#9caeb1','#d9bc79'][i%4],['#9daa89','#b58a6c','#8b9c9f','#c5a963'][i%4],'#8f8f76'])+(i===2?'</g>':'');
art+=box(333,25,68,47,25,29,['#c5b09a','#aa947d','#978774']);art+=box(350,35,78,13,3,7,['#d7c8a7','#d7c8a7','#d7c8a7']);
for(let i=0;i<5;i++)art+=box(388+i*13,34,68,9,20,25+((i+1)%3)*5,[['#d9bc79','#9caeb1','#c8a281','#b4bd9d'][i%4],['#c5a963','#8b9c9f','#b58a6c','#9daa89'][i%4],'#8f8f76']);
art+=box(337,25,21,92,28,19,['#b7a8bb','#a392a9','#93829a']);
art+=plant(444,26,161,.6);
// Oval woven rug.
art+=ellipse(290,255,3,147,65,'#b3bca1');art+=ellipse(290,255,4,135,58,'#c1c7af');art+=ellipse(290,255,5,122,51,'#c9ceb8');
for(let i=0;i<4;i++){const p=P(290,255,6);art+=`<ellipse cx="${p[0]}" cy="${p[1]}" rx="${110-i*17}" ry="${44-i*7}" fill="none" stroke="#b2bd9e" opacity=".6"/>`}
// Work desk, legs and top.
for(const [x,y] of [[43,105],[176,105],[43,178],[176,178]])art+=box(x,y,0,10,10,78,['#bca581','#ae9573','#927b5e']);
art+=box(33,92,77,165,105,10,['#e8cba2','#c7a77e','#b3936f']);
// Monitor housing and screen, keyboard.
art+=box(87,115,88,44,19,4,['#b1b7ad','#929c91','#929c91']);art+=box(103,120,91,10,6,20,['#9ba797','#99a38f','#8a9884']);
art+=poly([[66,122,109],[153,122,109],[153,122,171],[66,122,171]],'#697b6c','#556b5b',4);
art+=poly([[72,123,115],[147,123,115],[147,123,164],[72,123,164]],'#f3f1df');
art+=poly([[75,124,119],[91,124,119],[91,124,160],[75,124,160]],'#dce3d2');
for(let i=0;i<3;i++)art+=poly([[97+i*16,124,126],[109+i*16,124,126],[109+i*16,124,146],[97+i*16,124,146]],['#b1c4a5','#d5c3aa','#bbc9ca'][i]);
art+=box(85,153,88,66,24,3,['#f4eee0','#c6c6b6','#b0b4a4']);for(let i=0;i<6;i++)art+=line([91+i*9,157,92],[91+i*9,171,92],'#c5c8b6',1);
art+=plant(47,111,89,.43);
// Task lamp.
art+=ellipse(174,109,89,13,6,'#8c9977');art+=line([174,109,90],[174,109,143],'#8b9979',4)+line([174,109,143],[157,109,156],'#8b9979',4);let lp=P(153,109,153);art+=`<path d="M${lp[0]-17} ${lp[1]+8}Q${lp[0]-16} ${lp[1]-17} ${lp[0]+3} ${lp[1]-11}L${lp[0]+14} ${lp[1]+7}Z" fill="#98a581"/>`;
// Desk chair.
art+=box(130,221,0,10,10,35,['#9b8d73','#9b8d73','#8a7c65']);art+=box(109,201,34,50,48,13,['#be9278','#ad806b','#99725e']);art+=box(110,242,47,48,9,38,['#cfaa8c','#ba9276','#a17d66']);
// A one-seat recliner in the middle of the room, between desk, bookshelf and coffee table, turned toward the table.
let chairArt='';{const O=[308,136],th=32*Math.PI/180,cs=Math.cos(th),sn=Math.sin(th),S=1.25,fd=cs-sn,W=(u,v,z)=>[O[0]+(u*cs-v*sn)*S,O[1]+(u*sn+v*cs)*S,z*S];
// Extrude a side profile [forward, up] across the chair's width; draw only the surfaces turned toward the viewer, far to near, then the near side.
const ext=(prof,u0,u1,c)=>{const q=[];prof.forEach((a,n)=>{const b=prof[(n+1)%prof.length],nv=b[1]-a[1],nz=a[0]-b[0];if(nv*fd+nz*.86>.01)q.push([(a[0]+b[0])/2*fd+(a[1]+b[1])/2*.86,poly([W(u0,a[0],a[1]),W(u1,a[0],a[1]),W(u1,b[0],b[1]),W(u0,b[0],b[1])],nz/Math.hypot(nv,nz)>.55?c[0]:c[1])])});return q.sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join('')+poly(prof.map(p=>W(u1,p[0],p[1])),c[2])};
const body=['#dcaf96','#d3a78d','#b7836e'],soft=['#ecc7ae','#e0b79d','#c79a80'],arm=['#e3b89e','#cfa187','#b98871'],dark=['#a57863','#96695a','#8a5f50'],cream=['#f6efdc','#efe6cf','#d6cbb0'],sage=['#b9c4a4','#aab895','#93a27d'],armP=[[-27,7],[21,7],[21,38],[16,43],[-18,43],[-27,34]];
const l1=W(21,19,13),l2=W(21,33,23);
chairArt=ext([[-24,0],[18,0],[18,7],[-24,7]],-20,20,dark)+ext(armP,-33,-22,arm)
+ext([[-28,6],[22,6],[24,27],[-10,22],[-32,68],[-45,62],[-27,16]],-22,22,body)
+ext([[-8,23.5],[23,28.5],[23,31.5],[-9,26.5]],-20,20,soft)
+ext([[-23.4,50],[-18.5,52.3],[-26,68.3],[-31,66]],-12,12,cream)
+`<path d="M${P(...l1)}L${P(...l2)}" stroke="#8a5f50" stroke-width="4" stroke-linecap="round"/>`
+ext([[28,20],[58,25],[58,32],[28,27]],-19,19,soft)
+ext([[34,28.5],[57,32.3],[57,34],[34,30.2]],-20.5,20.5,sage)+ext([[38,17],[52,19],[52,33.5],[38,31]],20,21.5,sage)
+ext(armP,22,33,arm);}
// Coffee table, notebook and cup.
for(const [x,y] of [[272,273],[323,273],[296,318]])front+=box(x,y,4,6,6,29,['#a18867','#a18867','#8d7458']);front+=box(258,260,34,82,73,8,['#e3c69c','#c3a47d','#ae906c']);
front+=box(266,271,43,39,35,3,['#f1e7c9','#d1c5a9','#bdb391']);front+=line([285,272,47],[285,304,47],'#c3b48d');for(let i=0;i<3;i++)front+=line([270,279+i*7,47],[280,279+i*7,47],'#a3ad8e');
let mug=P(322,286,51);front+=`<g transform="translate(${mug})"><ellipse cy="6" rx="12" ry="5" fill="#c2ae8b"/><path d="M-8-10H8V2Q0 11-8 2Z" fill="#f6efdc"/><ellipse cy="-10" rx="8" ry="3.6" fill="#a78a6a"/><path d="M8-8Q21-9 16 1Q12 4 8 1" fill="none" stroke="#f6efdc" stroke-width="3"/><g class="steam" fill="none" stroke="#fffdf5" stroke-width="2" opacity=".8"><path d="M-3-17Q-9-24-2-29T-2-40"/><path d="M4-18Q12-25 5-33"/></g></g>`;
// Notebook stool near the entrance.
art+=box(74,322,0,46,42,29,['#a8b18e','#8c9a79','#7e8b6c']);art+=box(68,315,29,59,54,6,['#c1c8aa','#a1ae8b','#8e9d7e']);art+=box(72,317,35,52,44,3,['#8c5a44','#7a4c39','#6b4232']);art+=poly([[75,320,39],[97,320,39],[97,358,39],[75,358,39]],'#fbf5e4','#e0d5ba',.6)+poly([[98,320,39],[121,320,39],[121,358,39],[98,358,39]],'#f6efdc','#e0d5ba',.6);for(let i=0;i<5;i++)art+=line([79,326+i*6.5,39.5],[93,326+i*6.5,39.5],'#a3ad8e',1)+(i<3?line([102,326+i*6.5,39.5],[117,326+i*6.5,39.5],'#a3ad8e',1):'');art+=line([97.5,320,39.5],[97.5,358,39.5],'#d6c9a8',1.2)+line([110,358,39],[110,368,32],'#c8553d',2.2)+line([103,348,41],[118,340,41],'#526b49',2.6)+line([118,340,41],[121,338.5,41],'#e9c778',2.6);
// Floor plant and welcome mat.
front+=plant(468,350,1,1.1);art+=poly([[180,362,2],[270,362,2],[270,397,2],[180,397,2]],'#a6ab8a');
// Mailbox on a little stepping stone outside.
art+=box(60,464,-28,64,58,7,['#d6d9c9','#b9bfa9','#acb39c']);art+=box(88,485,-21,10,10,68,['#bca07c','#a58d6d','#927b5e']);art+=box(69,468,46,49,39,31,['#91a48b','#789270','#678265']);art+=box(68,466,76,52,43,5,['#a4b59a','#8ba180','#7b9471']);
let mail=P(94,508,62);art+=`<g transform="translate(${mail}) skewY(27)"><rect x="-12" y="-8" width="24" height="15" rx="1" fill="#f3ebd5"/><path d="M-12-8L0 1L12-8" fill="none" stroke="#aaa487"/></g>`;
// Pebbles and little garden flowers.
for(const [x,y,s] of [[342,449,12],[380,463,17],[418,477,12],[37,431,9],[487,418,10]])art+=ellipse(x,y,-20,s,s*.45,'#d3d7c2');
for(const [x,y] of [[485,432],[490,450],[472,442]]){let p=P(x,y,-19);art+=`<path d="M${p}v-16" stroke="#8f9e78" stroke-width="2"/><circle cx="${p[0]}" cy="${p[1]-18}" r="5" fill="#e0c289"/><circle cx="${p[0]}" cy="${p[1]-18}" r="2" fill="#b39b63"/>`}
scene.innerHTML=art;document.querySelector('#scene-chair').innerHTML=chairArt;document.querySelector('#scene-front').innerHTML=front;
// A tiny companion welcomes visitors and walks between corners.
const avatar=document.querySelector('#avatar');avatar.innerHTML=`<ellipse cy="4" rx="21" ry="8" fill="#667553" opacity=".18"/>
<g id="actor">
<path d="M-25-51Q-29-84-2-86Q26-88 27-55L25-36Q20-29 13-34H-13Q-24-29-26-37Z" fill="#3b3940"/>
<path d="M-11-7L-12 3H-3L-1-8M5-8L6 3H16L13-7" fill="#e9d8b9"/>
<path d="M-13 1H-3V5H-16Q-18 2-13 1M6 1H14Q20 2 18 5H6Z" fill="#c5b5a7"/>
<path d="M-15-33Q0-41 15-33L18-7Q0 1-18-7Z" fill="#f1e3c9"/>
<path d="M-15-29L-22-16M15-29L22-37" fill="none" stroke="#f1e3c9" stroke-width="10" stroke-linecap="round"/>
<path d="M-22-16L-22-12M22-37L25-42" fill="none" stroke="#f1cdb6" stroke-width="6" stroke-linecap="round"/>
<path d="M-7-34L0-28L-6-24L-12-32M7-34L0-28L6-24L12-32" fill="#fff7e6"/>
<path d="M0-27L1-8" stroke="#b89b7b" stroke-width=".8"/><circle cx="1" cy="-17" r="1" fill="#b89b7b"/>
<path d="M-7-33L0-28L-6-24L-12-32M7-33L0-28L6-24L12-32" fill="none" stroke="#baa086" stroke-width=".8" stroke-linejoin="round"/>
<path d="M-15-9Q0-5 15-9M-13 0H-4M7 0H15" fill="none" stroke="#bda287" stroke-width="1"/>
<path d="M6-22H13V-16Q9.5-13 6-16Z" fill="none" stroke="#bda287" stroke-width=".8"/>
<g fill="#c4a88e"><circle cx="-9" cy="-20" r="1.2"/><circle cx="-11" cy="-12" r="1.2"/><circle cx="7" cy="-10" r="1.2"/><circle cx="-18" cy="-24" r="1.2"/><circle cx="18" cy="-31" r="1.2"/><circle cx="-7" cy="-3" r="1"/><circle cx="11" cy="-3" r="1"/></g>
<ellipse cx="-21" cy="-49" rx="3.5" ry="5" fill="#efc8b0"/><ellipse cx="21" cy="-49" rx="3.5" ry="5" fill="#efc8b0"/>
<ellipse cy="-53" rx="22" ry="23" fill="#f3d4be"/>
<!-- Full rounded crown and soft sweeping fringe; no exposed wedge at the part. -->
<path d="M-24-48Q-29-72-17-81Q-6-91 5-84Q22-87 27-68Q29-55 23-46L19-48L17-61Q10-63 5-72Q-3-61-17-59L-18-46Z" fill="#3b3940"/>
<path d="M-19-70Q-10-81 0-80M8-80Q19-77 22-66" fill="none" stroke="#55515b" stroke-width="2" stroke-linecap="round"/>
<path d="M-23-51Q-25-40-22-35Q-19-31-16-33L-17-44L-17-53M23-51Q26-40 22-35Q19-31 16-33L17-44L17-53" fill="#3b3940"/>
<path d="M-12-55Q-8-57.5-4-55M4-55Q8-57.5 12-55" fill="none" stroke="#67504a" stroke-width="1.6" stroke-linecap="round"/>
<ellipse cx="-7.5" cy="-49" rx="2.2" ry="2.6" fill="#453d3c"/><ellipse cx="8" cy="-49" rx="2.2" ry="2.6" fill="#453d3c"/>
<circle cx="-6.8" cy="-49.8" r=".7" fill="#fff9ec"/><circle cx="8.7" cy="-49.8" r=".7" fill="#fff9ec"/>
<ellipse cx="-12" cy="-43" rx="4.6" ry="2.7" fill="#e8ac9b" opacity=".65"/><ellipse cx="12" cy="-43" rx="4.6" ry="2.7" fill="#e8ac9b" opacity=".65"/>
<path d="M-4-40Q1-35 5-40" fill="none" stroke="#ae776a" stroke-width="1.6" stroke-linecap="round"/>
<g class="prop" data-prop="journey"><g class="prop-in"><g transform="rotate(14 26 -50)"><rect x="18" y="-61" width="16" height="21" rx="1.5" fill="#9caeb1"/><rect x="18" y="-61" width="4" height="21" rx="1.5" fill="#8b9c9f"/><path d="M25-55H31M25-51H31" stroke="#f3f1df" stroke-width="1.2" stroke-linecap="round"/></g></g></g>
<g class="prop" data-prop="coffee"><g class="prop-in"><g transform="translate(26 -47)"><path d="M-6.5-9H6.5Q6.5 2 0 3Q-6.5 2-6.5-9Z" fill="#fffdf7" opacity=".9" stroke="#cfc6ae" stroke-width=".7"/><path d="M-5.6-4H5.6Q5 1.6 0 2.2Q-5 1.6-5.6-4Z" fill="#8c3f4a"/><path d="M0 3V10M-4 10.5H4" stroke="#cfc6ae" stroke-width="1.5" stroke-linecap="round"/></g></g></g>
<g class="prop" data-prop="projects"><g class="prop-in"><path d="M0-112Q2-102 12-100Q2-98 0-88Q-2-98-12-100Q-2-102 0-112Z" fill="#d9bc79"/><path d="M19-110Q20-105 25-104Q20-103 19-98Q18-103 13-104Q18-105 19-110Z" fill="#e6cf98"/><path d="M-18-98Q-17-94-13-93Q-17-92-18-88Q-19-92-23-93Q-19-94-18-98Z" fill="#a2b58d"/></g></g>
<g class="prop" data-prop="notes"><g class="prop-in"><g transform="rotate(35 26 -46)"><rect x="23.5" y="-66" width="5" height="22" fill="#e9c778"/><rect x="23.5" y="-70" width="5" height="5" rx="1.5" fill="#e8ac9b"/><path d="M23.5-44H28.5L26-38Z" fill="#f1e3c9"/><path d="M25-40.5H27L26-38Z" fill="#453d3c"/></g></g><path class="scribble" d="M30-30q4-5 8 0t8 0t8 0" fill="none" stroke="#7f8d70" stroke-width="1.4" stroke-linecap="round"/></g>
<g class="prop" data-prop="contact"><g class="prop-in"><g transform="translate(27 -58)"><rect x="-11" y="-7" width="22" height="14" rx="1.5" fill="#f3ebd5" stroke="#c9bf9f" stroke-width=".8"/><path d="M-11-7L0 1L11-7" fill="none" stroke="#aaa487"/><path d="M0 4.5Q-4 1-2-1Q0-2 0 0Q0-2 2-1Q4 1 0 4.5Z" fill="#c98b7a" transform="translate(0 -16) scale(1.5)"/></g></g></g>
</g>
`;
// The companion walks on her own: she follows the cursor and acts at each corner.
const reduceMotion=matchMedia('(prefers-reduced-motion:reduce)').matches,actor=document.querySelector('#actor');
const pos={x:466,y:224},goal={x:466,y:224};let facing=1,walkT=0,onArrive=null,busy=false,lastT=0;
const frontLayer=document.querySelector('#scene-front'),chairLayer=document.querySelector('#scene-chair');let layer=null;
function draw(bob=0){const f=pos.y>=300?2:pos.x+pos.y>455?1:0;if(f!==layer){layer=f;f===2?frontLayer.after(avatar):f===1?frontLayer.before(avatar):chairLayer.before(avatar)}const p=P(pos.x,pos.y,8);avatar.style.transform=`translate(${p[0]}px,${p[1]}px)`;actor.setAttribute('transform',`translate(0 ${bob}) scale(${facing} 1)`)}
function move(x,y,then=null){goal.x=x;goal.y=y;onArrive=then;if(reduceMotion){pos.x=x;pos.y=y;draw();if(then){onArrive=null;then()}}}
function frame(t){const k=Math.min(3,(t-lastT)/16.7||1);lastT=t;const dx=goal.x-pos.x,dy=goal.y-pos.y,d=Math.hypot(dx,dy);let bob=0;
if(d>.6){const step=Math.min(d,Math.max(1.6,d*.1)*k);pos.x+=dx/d*step;pos.y+=dy/d*step;const sx=dx-dy;if(Math.abs(sx)>3)facing=sx<0?-1:1;walkT+=.3*k;bob=-Math.abs(Math.sin(walkT))*3}
else if(onArrive){const f=onArrive;onArrive=null;f()}
draw(bob);requestAnimationFrame(frame)}
draw();if(!reduceMotion)requestAnimationFrame(frame);
const zone=p=>p.y>=300?'F':p.x>=290?'R':'B';
function walkTo(x,y,then=null){const a=zone(pos),b=zone({x,y}),k=a+b;let via=null;if((k==='RB'||k==='BR')&&pos.y>=90&&y>=90)via=[300,66];else if(k==='RF'||k==='FR')via=[368,348];if(via&&Math.hypot(pos.x-via[0],pos.y-via[1])>25)move(...via,()=>move(x,y,then));else move(x,y,then)}
function showProp(id){document.querySelectorAll('#avatar .prop').forEach(p=>p.classList.toggle('on',p.dataset.prop===id));document.querySelector('#shelf-book')?.classList.toggle('taken',id==='journey')}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
document.querySelector('#world').addEventListener('pointermove',e=>{if(reduceMotion||busy||e.pointerType!=='mouse'||document.querySelector('#panel').open)return;const svg=e.currentTarget,pt=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse()),u=(pt.x-590)/.84,v=(pt.y-322)/.43;showProp(null);const fx=(u+v)/2,fy=(v-u)/2;walkTo(clamp(fx,378,470),clamp(fy,85,240))});
const spots=[{id:'projects',name:'The things I build',x:113,y:150,z:165,lx:313,ly:387,w:156,walk:[212,128],face:-1},{id:'journey',name:'A few chapters',x:390,y:45,z:158,lx:914,ly:378,w:141,walk:[300,62],face:1},{id:'notes',name:'Loose thoughts',x:92,y:340,z:48,lx:108,ly:428,w:143,walk:[152,320],face:-1},{id:'coffee',name:'Off the clock',x:312,y:132,z:98,lx:880,ly:560,w:128,walk:[384,182],face:-1}];
document.querySelector('#hotspots').innerHTML=spots.map(s=>{const p=P(s.x,s.y,s.z),anchor=[s.lx+s.w/2,s.ly];return `<g class="hotspot" role="button" tabindex="0" aria-label="${s.name}" data-open="${s.id}"><rect x="${p[0]-32}" y="${p[1]-12}" width="64" height="80" fill="transparent" pointer-events="all"/><path class="guide" d="M${p}L${anchor}"/><circle class="beacon" cx="${p[0]}" cy="${p[1]}" r="5"/><rect class="label-bg" x="${s.lx}" y="${s.ly-16}" width="${s.w}" height="32" rx="16"/><text class="label-text" x="${s.lx+14}" y="${s.ly+4}">${s.name}</text><text class="plus" x="${s.lx+s.w-22}" y="${s.ly+5}">+</text></g>`}).join('');
// Off the clock: a small evening corner drawn with the same blocks as the room.
function offClockScene(){const wood=['#e3c69c','#c3a47d','#ae906c'];let s='<ellipse cx="640" cy="566" rx="215" ry="24" fill="#76826b" opacity=".13"/>';
s+=box(0,0,-18,320,200,18,['#e4d2b2','#c4ac89','#b69e7d']);
for(let y=0;y<200;y+=40)for(let x=0;x<320;x+=80)s+=poly([[x,y,1],[x+80,y,1],[x+80,y+40,1],[x,y+40,1]],['#e6d4b7','#e9d9bd','#dfcbae'][(x/80+y/40)%3],'#d8c3a2',.7);
s+=box(-8,-8,0,328,8,120,['#e3e2d6','#dadcd0','#b4bba8'])+box(-8,0,0,8,200,120,['#e9e8de','#c1c8bd','#d4d9cf']);
// Night window with a moon.
s+=poly([[2,55,42],[2,155,42],[2,155,106],[2,55,106]],'#f3ecdc','#e9e7d9',7)+poly([[4,61,47],[4,149,47],[4,149,101],[4,61,101]],'#5f7183');
const m=P(5,128,90);s+=`<circle cx="${m[0]}" cy="${m[1]}" r="7" fill="#f3e3b0"/><circle cx="${m[0]+3}" cy="${m[1]-2.5}" r="6" fill="#5f7183"/>`;
[[80,93],[92,62],[136,60],[112,80]].forEach(([y,z],i)=>{const p=P(5,y,z);s+=`<circle class="twinkle" style="animation-delay:${i*.9}s" cx="${p[0]}" cy="${p[1]}" r="1.4" fill="#f3e3b0"/>`});
s+=line([6,105,47],[6,105,101],'#f6f2e7',5)+line([6,61,74],[6,149,74],'#f6f2e7',4)+box(0,50,38,14,110,5,['#f7efdf','#d8ccb5','#c7bfa9']);
// String lights and a postcard on the far wall.
const bulbs=[...Array(10)].map((_,i)=>P(18+i*32,1.5,108-11*Math.sin(Math.PI*i/9)));
s+=`<path d="M${bulbs.map(p=>p.join(' ')).join('L')}" fill="none" stroke="#8d927e" stroke-width="1"/>`+bulbs.map((p,i)=>`<circle class="twinkle" style="animation-delay:${-i*.45}s" cx="${p[0]}" cy="${p[1]+3}" r="3.2" fill="${i%2?'#f3d98b':'#f7e9c5'}"/>`).join('');
s+=poly([[212,1,64],[250,1,64],[250,1,93],[212,1,93]],'#fffdf7','#d8ccb2',1);const e=P(231,2,78);s+=`<g transform="translate(${e}) skewY(27)"><path d="M0-10L-5 9M0-10L5 9M-3 2H3M-4 6H4" fill="none" stroke="#b77e4f" stroke-width="1.5" stroke-linecap="round"/></g>`;
// Floor lamp with a warm glow.
const g=P(18,18,92);s+=`<circle class="oc-glow" cx="${g[0]}" cy="${g[1]}" r="40" fill="#f7e3ae" opacity=".45"/>`+ellipse(18,18,1,11,5,'#8c9977')+line([18,18,1],[18,18,84],'#8b9979',3.5)+`<path d="M${g[0]-15} ${g[1]+9}L${g[0]-9} ${g[1]-13}H${g[0]+9}L${g[0]+15} ${g[1]+9}Z" fill="#f3e3b0" stroke="#e2cf93"/>`;
// Rug, floor cushion, low table.
s+=ellipse(170,112,3,120,51,'#b3bca1')+ellipse(170,112,4,108,44,'#c9ceb8')+box(42,98,0,54,54,13,['#e0b599','#cda087','#c3957c']);
for(const [x,y] of [[154,89],[240,89],[154,145],[240,145]])s+=box(x,y,0,6,6,22,['#a18867','#a18867','#8d7458']);s+=box(148,84,22,104,72,6,wood);
// One bottle of wine for the table.
const bottle=(x,y,z,c,sc)=>{const p=P(x,y,z);return `<g transform="translate(${p}) scale(${sc}) translate(-118 -208)"><path d="M112 122H124V146Q136 152 136 164V202Q136 208 130 208H106Q100 208 100 202V164Q100 152 112 146Z" fill="${c}"/><rect x="111" y="116" width="14" height="9" rx="2" fill="#8c3f4a"/><rect x="104" y="168" width="28" height="24" rx="2" fill="#f6efdc"/></g>`};
// A Korean table: stew in a ttukbaegi, kimbap, kimchi, rice in a steel bowl, a steel spoon and chopsticks.
s+=bottle(158,94,28,'#6b7f5f',.6);
const kb=P(192,98,29);s+=`<g transform="translate(${kb}) scale(1.35)"><ellipse rx="15" ry="6.5" fill="#fffdf7" stroke="#d8ccb5"/>${[[-8,-1],[-1,-3],[6,-1],[-3,1.5]].map(([x,y],n)=>`<circle cx="${x}" cy="${y}" r="4" fill="#2f3a2f"/><circle cx="${x}" cy="${y}" r="2.9" fill="#fffdf7"/><circle cx="${x-.8}" cy="${y}" r="1" fill="#e9c15c"/><circle cx="${x+.9}" cy="${y-.4}" r=".9" fill="#d9744f"/><circle cx="${x+.2}" cy="${y+1}" r=".8" fill="#7f9a62"/>`).join('')}</g>`;
const kc=P(176,124,29);s+=`<g transform="translate(${kc}) scale(1.35)"><path d="M-9-2H9Q9 5 0 6Q-9 5-9-2Z" fill="#fffdf7" stroke="#d8ccb5"/><ellipse cy="-2" rx="9" ry="3.4" fill="#f3ece0"/><path d="M-6-3Q-3-8 0-4Q3-9 6-3Q3 0 0-1Q-3 0-6-3Z" fill="#c8452f"/><path d="M-3-4L-1-2M2-5L3-3" stroke="#f1c9a8" stroke-width="1" stroke-linecap="round"/></g>`;
const rb=P(202,142,29);s+=`<g transform="translate(${rb}) scale(1.3)"><path d="M-9-3H9V2Q9 7 0 8Q-9 7-9 2Z" fill="#c3c8c9"/><path d="M-9-3H9V-1H-9Z" fill="#dfe3e3"/><ellipse cy="-3" rx="9" ry="3.3" fill="#aeb4b5"/><path d="M-7.5-3Q-5-10 0-9.5Q5-10 7.5-3Q0 0-7.5-3Z" fill="#fffdf7"/></g>`;
const k=P(228,110,30);s+=`<g transform="translate(${k}) scale(1.15)"><path d="M-21-5H21Q21 11 0 12Q-21 11-21-5Z" fill="#3f3a37"/><ellipse cy="-5" rx="21" ry="6.5" fill="#5c5550"/><ellipse cy="-5" rx="17.5" ry="5" fill="#c8452f"/><rect x="-10" y="-8" width="6" height="4" rx="1" fill="#f6efdc"/><rect x="3" y="-6" width="6" height="4" rx="1" fill="#f6efdc"/><path d="M-3-4L1-6M9-8L12-6" stroke="#7f9a62" stroke-width="1.6" stroke-linecap="round"/><circle class="oc-bubble" cx="-1" cy="-7" r="1.6" fill="#e58a6f"/><circle class="oc-bubble" style="animation-delay:.5s" cx="11" cy="-4" r="1.4" fill="#e58a6f"/><circle class="oc-bubble" style="animation-delay:.9s" cx="-12" cy="-4" r="1.3" fill="#e58a6f"/><g class="steam" fill="none" stroke="#fffdf5" stroke-width="2.2" stroke-linecap="round" opacity=".9"><path d="M-6-14Q-12-22-5-28T-6-41"/><path d="M7-15Q14-23 7-30"/></g></g>`;
s+=line([222,140,29],[246,136,29],'#aab0b3',1.6)+line([222,144,29],[246,140,29],'#aab0b3',1.6);const sp=P(248,146,29);s+=line([224,150,29],[248,146,29],'#aab0b3',1.8)+`<ellipse cx="${sp[0]+3}" cy="${sp[1]+1}" rx="4.5" ry="2.6" fill="#c3c8c9" transform="rotate(27 ${sp})"/>`;
// Suitcase, ready for the next trip.
s+=line([277,25,46],[277,25,60],'#8d7458',3)+line([295,25,46],[295,25,60],'#8d7458',3)+line([277,25,60],[295,25,60],'#8d7458',3)+box(268,14,0,36,22,46,['#e6cf98','#d9bc79','#c2a35f'])+line([268,36.5,15],[304,36.5,15],'#c2a35f',1.5)+line([268,36.5,31],[304,36.5,31],'#c2a35f',1.5)+poly([[274,36.6,19],[283,36.6,19],[283,36.6,27],[274,36.6,27]],'#9caeb1')+poly([[288,36.6,20],[299,36.6,20],[299,36.6,27],[288,36.6,27]],'#f6efdc');
s+=plant(34,182,1,.62);
return `<svg class="oc-scene" viewBox="405 190 470 405" role="img" aria-label="An evening corner of the room: Yu Jin in pajamas wanders with a glass of wine around a low table set with Korean food — a bubbling stew, kimbap, kimchi and rice — a suitcase, and a postcard of Paris.">${s}<g id="oc-walker" class="oc-walker"></g></svg>`}
const OC_SPOTS=[[120,168],[262,152],[246,48]];let ocTimer=null;
function setupOffClock(){const w=document.querySelector('#oc-walker');if(!w)return;
const pj=actor.innerHTML.replaceAll('#f1e3c9','#c9bfd5').replaceAll('#e9d8b9','#b9aec6').replaceAll('#c5b5a7','#f6efdc').replaceAll('#c4a88e','#f6efdc').replaceAll('#baa086','#a99bb8').replaceAll('#bda287','#a99bb8').replaceAll('#b89b7b','#a99bb8');
w.innerHTML=`<ellipse cy="4" rx="21" ry="8" fill="#667553" opacity=".18"/><g class="oc-actor"><g class="oc-bob">${pj}</g></g>`;
w.querySelectorAll('.prop').forEach(p=>{if(p.dataset.prop==='coffee'){p.classList.add('on');p.querySelector('.prop-in').innerHTML='<g transform="translate(26 -47)"><path d="M-6.5-9H6.5Q6.5 2 0 3Q-6.5 2-6.5-9Z" fill="#fffdf7" opacity=".9" stroke="#cfc6ae" stroke-width=".7"/><path d="M-5.6-4H5.6Q5 1.6 0 2.2Q-5 1.6-5.6-4Z" fill="#8c3f4a"/><path d="M0 3V10M-4 10.5H4" stroke="#cfc6ae" stroke-width="1.5" stroke-linecap="round"/></g>'}else p.remove()});
w.querySelectorAll('ellipse[fill="#453d3c"]').forEach(e=>e.classList.add('oc-eye'));
const a=w.querySelector('.oc-actor'),put=p=>{w.style.transform=`translate(${p[0]}px,${p[1]}px)`};let i=0,dir=1,last=P(...OC_SPOTS[0],8);put(last);
clearInterval(ocTimer);if(reduceMotion)return;
w.addEventListener('transitionend',e=>{if(e.target===w)w.classList.remove('walking')});
ocTimer=setInterval(()=>{if(!w.isConnected){clearInterval(ocTimer);return}if(i+dir<0||i+dir>=OC_SPOTS.length)dir=-dir;i+=dir;const p=P(...OC_SPOTS[i],8);a.setAttribute('transform',`scale(${p[0]<last[0]?-1:1} 1)`);last=p;w.classList.add('walking');put(p)},3800)}
// Coffee chat: paste your Google Calendar appointment-schedule link here.
const COFFEE_CHAT_URL='https://calendar.app.google/yTYHKoPApSdrNRjFA';
const COFFEE_CHAT_FALLBACK='mailto:yujin_jeong@berkeley.edu?subject=Coffee%20chat';
// Loose thoughts: add a post by adding an entry at the top of this list.
// date is optional (e.g. 'Nov 2026'); body is HTML.
const posts=[
{id:'specialized-agents',title:'Where do specialized agents still have an advantage?',date:'',tag:'Agents',summary:'A purpose-built interface still beats one generated on demand. I expect that to be temporary.',body:`<p>With personal agents becoming more capable, I’ve been wondering where specialized agents still have an advantage. As agents handle more computer tasks, I think how we store and present their work becomes more important.</p><p>We’ve spent decades developing interfaces that help people understand information. For now, a purpose-built UI can still be easier to use than one generated on demand.</p><p>I expect this advantage to be temporary. Once general agents can generate a good interface for any task cheaply and easily, specialized products will have to compete on something else.</p><p>Until then, designing around a specific situation feels worth exploring.</p><button class="cta" data-open="projects">See the experiment ↗</button>`},
];
const postMeta=p=>[p.date,p.tag,Math.max(1,Math.round(p.body.replace(/<[^>]+>/g,' ').split(/\s+/).length/200))+' min read'].filter(Boolean).join(' · ');
const content={
projects:`<p class="kicker">01 / The things I build</p><h2>JobSwitch</h2><p class="quote">What happens after an agent does the work?</p><p>As personal agents become more capable, how we organize and present their work matters more. JobSwitch pairs an agent with dedicated views for documents, deadlines, and decisions—so people can understand their job transition without piecing it together from a conversation.</p><img src="images/jobswitch-transition-board.jpg" width="1800" height="1201" alt="JobSwitch transition board showing tasks before leaving, between jobs, and after starting."><h3>Why this situation?</h3><p>Job transitions involve paperwork that directly affects people’s benefits. It’s a concrete setting for exploring how an agent’s work can become easier to understand and review.</p><h3>A question, not a conclusion</h3><p>If general agents can generate effective interfaces cheaply and reliably, the advantage of a dedicated interface may narrow. This project explores what a purpose-built experience can offer in the meantime.</p><a class="cta" href="https://jobswitch-sooty.vercel.app/workspace" target="_blank" rel="noopener noreferrer" aria-label="Explore JobSwitch demo, opens in a new tab">Explore live demo ↗</a>`,
journey:`<div class="journey-panel"><p class="kicker">02 / A few chapters</p><h2>Experience &amp;<br>Education</h2>
<section class="career-entry" aria-labelledby="snowflake-title"><div class="company-heading"><img class="company-logo" src="logos/snowflake.svg" alt="" width="32" height="32"><div><h3 id="snowflake-title">Snowflake</h3><p class="meta">Product Management Intern · Jun–Aug 2026</p></div></div><ul class="career-bullets"><li>Translated customer research into an MVP roadmap for data ingestion monitoring and troubleshooting.</li><li>Built a UX prototype and AI-powered troubleshooting skill, iterating with Design and Engineering through customer demos.</li></ul></section>
<section class="career-entry" aria-labelledby="kt-title"><div class="company-heading"><img class="company-logo kt-logo" src="logos/kt.svg" alt="" width="32" height="32"><div><h3 id="kt-title">KT</h3><p class="meta">2017–2025 · Associate → Assistant Manager → Manager</p></div></div><ul class="career-bullets"><li>Worked across product strategy, pilots, and go-to-market for AI, cloud, and enterprise services.</li></ul></section>
<section class="education-section" aria-labelledby="education-title"><h3 class="section-label" id="education-title">Education</h3><div class="education-entry"><img class="company-logo" src="logos/berkeley.svg" alt="" width="32" height="32"><div><h3>UC Berkeley, Haas School of Business</h3><p>Master of Business Administration · Expected May 2027</p><p class="meta">VP, Haas Tech Club · Leading the 2026 Tech &amp; AI Summit</p></div></div><div class="education-entry"><img class="company-logo" src="logos/sogang.svg" alt="" width="32" height="32"><div><h3>Sogang University</h3><p>Bachelor of Business Administration · 2017</p></div></div></section></div>`,
notes:`<p class="kicker">03 / Loose thoughts</p><h2>Loose thoughts.</h2><p>Notes on what I’m building, reading, and still figuring out.</p><ul class="post-list">${posts.map(p=>`<li><button class="post-link" data-open="post-${p.id}"><span class="post-meta">${postMeta(p)}</span><span class="post-title">${p.title}</span><span class="post-summary">${p.summary}</span></button></li>`).join('')}</ul><p class="meta">More on the way.</p>`,
coffee:`<div class="off-clock-panel"><p class="kicker">04 / Off the clock</p><h2>Off the clock.</h2>${offClockScene()}<p class="oc-story">I’m obsessed with cooking Korean food these days. With a glass of wine, it’s the best way to end a day. And travel is what keeps me going.</p></div>`,
contact:`<p class="kicker">The little mailbox</p><h2>Good things start<br>with a hello.</h2><p>A question, an idea, or something you’re building?<br>I’d love to hear about it.</p><a class="cta" href="mailto:yujin_jeong@berkeley.edu">yujin_jeong@berkeley.edu ↗</a><a class="cta secondary" href="https://www.linkedin.com/in/yujin-jeong1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn, opens in a new tab">LinkedIn ↗</a>`,
about:`<p class="kicker">The person behind the pixels</p><h2>Hi, I’m Yu Jin.<br>A builder, at heart.</h2><p>Builder with a background in product strategy and hands-on prototyping. I like figuring out what’s worth building, making it tangible, and helping it reach people.</p><p>Currently pursuing my MBA at UC Berkeley Haas. Previously at Snowflake and KT.</p><p>This little world is a home for the things I make, the questions I follow, and the experiences that shape them.</p><button class="cta" data-open="journey">Explore my journey ↗</button><button class="cta secondary" data-open="contact">Say hello ↗</button>`};
posts.forEach(p=>{content['post-'+p.id]=`<div class="post"><button class="back-link" data-open="notes">← All thoughts</button><p class="kicker">${postMeta(p)}</p><h2>${p.title}</h2>${p.body}</div>`});
// The mug on the coffee table books a coffee chat.
const linkSpot=(p,lx,ly,w,href,text,label,cls)=>`<a class="hotspot ${cls}" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}, opens in a new tab"><rect x="${p[0]-28}" y="${p[1]-22}" width="56" height="70" fill="transparent" pointer-events="all"/><path class="guide" d="M${p}L${[lx+w/2,ly]}"/><circle class="beacon" cx="${p[0]}" cy="${p[1]}" r="5"/><rect class="label-bg" x="${lx}" y="${ly-16}" width="${w}" height="32" rx="16"/><text class="label-text" x="${lx+14}" y="${ly+4}">${text}</text><text class="plus" x="${lx+w-24}" y="${ly+5}">↗</text></a>`;
document.querySelector('#hotspots').insertAdjacentHTML('beforeend',linkSpot(P(93,490,80),170,640,186,'https://www.linkedin.com/in/yujin-jeong1','Say hello on LinkedIn','Say hello on LinkedIn','link-spot'));
(function(){const p=P(322,286,60),lx=690,ly=660,w=190;document.querySelector('#hotspots').insertAdjacentHTML('beforeend',`<a class="hotspot chat-link" href="${COFFEE_CHAT_URL||COFFEE_CHAT_FALLBACK}" target="_blank" rel="noopener noreferrer" aria-label="Have a coffee chat, opens in a new tab"><rect x="${p[0]-26}" y="${p[1]-22}" width="52" height="50" fill="transparent" pointer-events="all"/><path class="guide" d="M${p}L${[lx+w/2,ly]}"/><circle class="beacon" cx="${p[0]}" cy="${p[1]}" r="5"/><rect class="label-bg" x="${lx}" y="${ly-16}" width="${w}" height="32" rx="16"/><text class="label-text" x="${lx+14}" y="${ly+4}">Have a coffee chat? ☕</text><text class="plus" x="${lx+w-24}" y="${ly+5}">↗</text></a>`)})();
const panel=document.querySelector('#panel'),visited=new Set();let previousFocus=null;
let goTimer=null;
function go(trigger){const id=trigger.dataset.open,spot=spots.find(s=>s.id===id);clearTimeout(goTimer);if(!spot||reduceMotion||panel.open||!trigger.classList.contains('hotspot')){busy=false;openPanel(id);return}busy=true;const open=()=>{clearTimeout(goTimer);if(!busy)return;busy=false;openPanel(id)};walkTo(...spot.walk,()=>{facing=spot.face;showProp(id);clearTimeout(goTimer);goTimer=setTimeout(open,800)});goTimer=setTimeout(open,3200)}
function openPanel(id){if(!content[id])return;if(!panel.open)previousFocus=document.activeElement;let spot=spots.find(s=>s.id===id);if(spot){walkTo(...spot.walk,()=>{facing=spot.face;showProp(id)});visited.add(id);document.querySelectorAll(`.hotspot[data-open="${id}"]`).forEach(e=>e.classList.add('visited'));document.querySelector('#count').textContent=visited.size;document.querySelector('.dots').textContent=spots.map(s=>visited.has(s.id)?'●':'○').join(' ');}document.querySelector('#panel-content').innerHTML=content[id];if(id==='coffee')setupOffClock();document.querySelector('#panel-content h2').id='panel-title';if(!panel.open)panel.showModal();panel.scrollTop=0;document.querySelector('#close').focus();}
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-open]');if(trigger){go(trigger);return}});
document.querySelector('#hotspots').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const trigger=e.target.closest('[data-open]');if(trigger){e.preventDefault();go(trigger);}}});
document.querySelector('#close').onclick=()=>panel.close();panel.addEventListener('click',e=>{if(e.target===panel){let r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close();}});panel.addEventListener('close',()=>{previousFocus?.focus();setTimeout(()=>{if(!panel.open&&!busy)showProp(null)},1600)});
function reset(){busy=false;clearTimeout(goTimer);showProp(null);walkTo(466,224);if(panel.open)panel.close();const t=document.querySelector('#toast');t.textContent='Back home. Make yourself comfortable.';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
document.querySelector('#reset').onclick=reset;document.querySelector('.brand').onclick=e=>{e.preventDefault();reset()};

// Wall clock: real Pacific Time.
(function(){const h=document.querySelector('#clock-hour'),m=document.querySelector('#clock-min'),s=document.querySelector('#clock-sec');if(!h)return;const fmt=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'numeric',minute:'numeric',second:'numeric',hourCycle:'h23'});function tick(){const t={};fmt.formatToParts(new Date()).forEach(p=>t[p.type]=+p.value);h.setAttribute('transform',`rotate(${(t.hour%12)*30+t.minute*.5})`);m.setAttribute('transform',`rotate(${t.minute*6+t.second*.1})`);s.setAttribute('transform',`rotate(${t.second*6})`)}tick();setInterval(tick,1000)})();

// Front door: knock, say who you are (or don't), come in.
(function(){const intro=document.querySelector('#door-intro');if(!intro)return;let seen=false;try{seen=sessionStorage.getItem('door-open')==='1'}catch(e){}
if(seen){intro.remove();return}
const rest=['header','main','footer'].map(s=>document.querySelector(s)),leaf=intro.querySelector('#door-leaf'),form=intro.querySelector('#door-form'),hint=intro.querySelector('#door-hint'),bubble=intro.querySelector('#door-bubble'),nameInput=intro.querySelector('#door-name');let state='idle';
rest.forEach(el=>{if(el)el.inert=true});document.body.style.overflow='hidden';
// She waits by the welcome mat, then walks in with the visitor.
pos.x=goal.x=225;pos.y=goal.y=392;draw();
function greet(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3400)}
function knock(){if(state==='asked'){enter();return}if(state!=='idle')return;state='knocking';intro.classList.add('knocking');setTimeout(()=>{state='asked';intro.classList.remove('knocking');intro.classList.add('asked');bubble.textContent='Who’s there?';leaf.setAttribute('aria-label','Open the door');hint.hidden=true;form.hidden=false;if(matchMedia('(hover:hover)').matches)nameInput.focus({preventScroll:true})},reduceMotion?0:700)}
function enter(skip){if(state==='leaving')return;state='leaving';try{sessionStorage.setItem('door-open','1')}catch(e){}const name=nameInput.value.trim().slice(0,24);
const finish=()=>{intro.remove();rest.forEach(el=>{if(el)el.inert=false});document.body.style.overflow='';walkTo(466,224);greet(name?`Come on in, ${name}. Make yourself at home.`:'Come on in. Make yourself at home.')};
if(reduceMotion||skip===true){finish();return}intro.classList.add('open');setTimeout(()=>intro.classList.add('leaving'),600);setTimeout(finish,1650)}
leaf.addEventListener('click',knock);form.addEventListener('submit',e=>{e.preventDefault();enter()});intro.querySelector('#door-skip').addEventListener('click',()=>enter(true));
})();

// Background music: quiet and looping. Browsers block sound until the visitor's first click or key press, so it starts then (the knock on the door).
(function(){const btn=document.querySelector('#music');if(!btn)return;const VOL=.13,a=new Audio('audio/cafe-de-rio.m4a');a.loop=true;a.preload='auto';a.volume=0;let want=true,cur=0,fade=null,ctx=null,gain=null,started=false;try{want=localStorage.getItem('music')!=='off'}catch(e){}
const setVol=v=>{cur=v;if(gain)gain.gain.value=v;else a.volume=v};
function ramp(to,done){clearInterval(fade);fade=setInterval(()=>{const d=to-cur;if(Math.abs(d)<.008){setVol(to);clearInterval(fade);done&&done()}else setVol(cur+Math.sign(d)*.006)},60)}
function sync(){btn.classList.toggle('on',want);btn.setAttribute('aria-pressed',String(want));btn.setAttribute('aria-label',want?'Turn music off':'Turn music on')}
function start(){if(!want||!a.paused)return;
// Volume goes through a gain node because iPhones ignore audio.volume.
if(!ctx&&(window.AudioContext||window.webkitAudioContext)){try{ctx=new (window.AudioContext||window.webkitAudioContext)();gain=ctx.createGain();gain.gain.value=0;ctx.createMediaElementSource(a).connect(gain);gain.connect(ctx.destination);a.volume=1}catch(e){ctx=gain=null}}
if(ctx&&ctx.state==='suspended')ctx.resume();setVol(0);a.play().then(()=>{started=true;ramp(VOL)}).catch(()=>{})}
btn.addEventListener('click',()=>{want=!want;try{localStorage.setItem('music',want?'on':'off')}catch(e){}sync();if(want)start();else ramp(0,()=>a.pause())});
['pointerdown','keydown'].forEach(t=>document.addEventListener(t,e=>{if(!e.target.closest||!e.target.closest('#music'))start()},true));
document.addEventListener('visibilitychange',()=>{if(document.hidden)a.pause();else if(want&&started)start()});
sync()})();
