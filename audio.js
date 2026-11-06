// Web Audio API: all sounds are generated in the browser (no audio files)
let ac,muted=0,amb;
function AC(){ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state=="suspended")ac.resume();return ac}
function tone(f,d,ty,v,f2){if(muted)return;try{const a=AC(),o=a.createOscillator(),g=a.createGain();o.type=ty||"sine";o.frequency.setValueAtTime(f,a.currentTime);if(f2)o.frequency.exponentialRampToValueAtTime(f2,a.currentTime+d);g.gain.setValueAtTime(v||.05,a.currentTime);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+d);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+d)}catch(e){}}
const beep=(f,d)=>tone(f||520,d||.09,"square",.03);
function thud(){if(muted)return;try{const a=AC(),n=a.sampleRate*.08|0,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();f.type="lowpass";f.frequency.value=380+Math.random()*220;g.gain.value=.3;s.buffer=b;s.connect(f);f.connect(g);g.connect(a.destination);s.start()}catch(e){}}
function jingle(a){a.forEach((f,i)=>setTimeout(()=>tone(f,.2,"triangle",.07),i*140))}
function ambient(){if(amb||muted)return;try{const a=AC(),g=a.createGain();g.gain.value=.012;g.connect(a.destination);[55,82.5,110.5].forEach(f=>{const o=a.createOscillator();o.frequency.value=f;o.connect(g);o.start()});amb=g}catch(e){}}
function mute(){muted=!muted;if(amb)amb.gain.value=muted?0:.012;else if(!muted)ambient();const b=document.querySelector("[data-a=mute]");if(b)b.textContent=muted?"🔇 Sound off":"🔊 Sound on"}
