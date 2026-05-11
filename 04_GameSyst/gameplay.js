/**
 * GAYA — Gameplay Engine
 * Adapted from Pixel Art Top-Down Adventure
 * Supports multiple map layouts via loadMap()
 */

const Gameplay = (function() {
    'use strict';

    let canvas, ctx;
    const SCALE = 2.5;
    const TILE_SIZE = 16 * SCALE;
    let running = false;
    let lastTime = 0;
    let animFrame = 0;
    let currentMapId = '';
    let onInteractCb = null;
    let inputBound = false;

    // --- Assets ---
    const assets = { playerWalk: new Image(), playerIdle: new Image(), playerRun: new Image() };
    const assetPaths = {
        playerWalk: "../Eris Esra's Character Template 4.0/16x16/16x16 Walk-Sheet.png",
        playerIdle: "../Eris Esra's Character Template 4.0/16x16/16x16 Idle-Sheet.png",
        playerRun: "../Eris Esra's Character Template 4.0/16x16/16x16 Run-Sheet.png",
    };
    let spritesReady = false;

    // --- Input ---
    const keys = { w:false, a:false, s:false, d:false, ArrowUp:false, ArrowLeft:false, ArrowDown:false, ArrowRight:false, Shift:false };

    // --- Map State ---
    let MW = 20, MH = 15;
    let solid = [];
    let hotspots = [];
    let tileMap = [];
    let mapColors = {};
    let drawMapExtras = null; // per-map extra draw function

    /* ============================================
       MAP DEFINITIONS
       ============================================ */
    const MAPS = {};

    // ---------- LEVEL 1: THE SALA ----------
    MAPS.sala = {
        width: 20, height: 15,
        playerStart: { x: 9, y: 12 },
        colors: {
            floor: '#e8dcc6', floorAlt: '#e0d4bc',
            wall: '#8a7560', wallTop: '#6b5a48', door: '#5a4a38',
            furniture: '#6b5a48', furnitureTop: '#8a7560'
        },
        build(s, t, h) {
            // Walls
            for (let y = 0; y < 15; y++) for (let x = 0; x < 20; x++) {
                if (y===0||y===14||x===0||x===19) { s[y][x]=true; t[y][x]=1; }
                else { s[y][x]=false; t[y][x]=0; }
            }
            // Door
            t[14][9]=2; t[14][10]=2; s[14][9]=false; s[14][10]=false;
            // Furniture
            addS(s,8,2,4,1,'altar'); addS(s,2,2,2,1,'table_left'); addS(s,16,2,2,1,'table_right');
            addS(s,6,8,1,1,'chair'); addS(s,13,8,1,1,'chair'); addS(s,9,7,2,1,'center_table');
            // Hotspots
            h.push({ id:'photograph', x:16, y:1, w:2, h:1, label:'Photograph', active:true });
            h.push({ id:'torn_page', x:2, y:3, w:1, h:1, label:'Torn Page', active:true });
            h.push({ id:'flower_0', x:3,y:13,w:1,h:1, label:'Entrance Left', active:true, type:'flower' });
            h.push({ id:'flower_1', x:7,y:13,w:1,h:1, label:'Entrance Right', active:true, type:'flower' });
            h.push({ id:'flower_2', x:9,y:6,w:1,h:1, label:'Center Table', active:true, type:'flower' });
            h.push({ id:'flower_3', x:4,y:5,w:1,h:1, label:'Left Alcove', active:true, type:'flower' });
            h.push({ id:'flower_4', x:15,y:5,w:1,h:1, label:'Right Alcove', active:true, type:'flower' });
            h.push({ id:'flower_5', x:9,y:2,w:1,h:1, label:'Altar Table', active:true, type:'flower' });
            h.push({ id:'vase_diary', x:10,y:6,w:1,h:1, label:'Rattling Vase', active:false });
        },
        drawExtras(ctx, TS) {
            // Banner at back wall
            const bx=7*TS, by=0.2*TS;
            ctx.fillStyle='#faf6ee'; ctx.fillRect(bx,by,6*TS,1.4*TS);
            ctx.strokeStyle='rgba(180,160,130,0.4)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,6*TS,1.4*TS);
            ctx.fillStyle='#3a3228'; ctx.font=`bold ${Math.floor(TS*0.4)}px Caveat, cursive`;
            ctx.textAlign='center'; ctx.fillText('Gaya Maria Reyes', bx+3*TS, by+TS*0.55);
            ctx.font=`${Math.floor(TS*0.22)}px Inter, sans-serif`; ctx.fillStyle='#8a7e6e';
            ctx.fillText('Ika-18 Kaarawan', bx+3*TS, by+TS*0.95); ctx.textAlign='left';
        }
    };

    // ---------- LEVEL 2: THE BEDROOM ----------
    MAPS.bedroom = {
        width: 16, height: 12,
        playerStart: { x: 7, y: 10 },
        colors: {
            floor: '#ddd0b8', floorAlt: '#d5c8b0',
            wall: '#7a6a58', wallTop: '#6b5a48', door: '#5a4a38',
            furniture: '#6b5a48', furnitureTop: '#8a7560'
        },
        build(s, t, h) {
            for (let y = 0; y < 12; y++) for (let x = 0; x < 16; x++) {
                if (y===0||y===11||x===0||x===15) { s[y][x]=true; t[y][x]=1; }
                else { s[y][x]=false; t[y][x]=0; }
            }
            // Door
            t[11][7]=2; t[11][8]=2; s[11][7]=false; s[11][8]=false;
            // Bed (top center, 4 wide 2 tall)
            addS(s,6,2,4,2,'bed');
            // Dresser (left wall, has magazine)
            addS(s,2,2,2,1,'dresser');
            // Nightstand (right of bed)
            addS(s,11,3,1,1,'nightstand');
            // Dress form stand (right side of room)
            addS(s,12,5,1,1,'dress_form');
            // Small fitting mirror (bottom left area)
            addS(s,2,8,1,1,'fitting_mirror_obj');

            // Hotspots — The 5 dress flaws
            h.push({ id:'dress_fabric', x:7, y:2, w:1, h:1, label:'Dress Fabric (Bodice)', active:true });
            h.push({ id:'dress_collar', x:8, y:2, w:1, h:1, label:'Dress Collar', active:true });
            h.push({ id:'dress_hem', x:7, y:3, w:1, h:1, label:'Dress Hem', active:false }); // needs fitting mirror
            h.push({ id:'dress_sleeves', x:9, y:2, w:1, h:1, label:'Dress Sleeves', active:false }); // needs magazine
            h.push({ id:'dress_lace', x:8, y:3, w:1, h:1, label:'Dress Lace', active:true });

            // Supporting objects
            h.push({ id:'fitting_mirror', x:2, y:8, w:1, h:1, label:'Fitting Mirror', active:true });
            h.push({ id:'magazine', x:2, y:2, w:2, h:1, label:'Magazine on Dresser', active:true });
            h.push({ id:'full_mirror', x:14, y:5, w:1, h:2, label:'Mirror', active:false }); // unlocks after all flaws
            h.push({ id:'shoes_empty', x:13, y:5, w:1, h:1, label:'Empty Space', active:false }); // unlocks after all flaws
            h.push({ id:'dress_pocket', x:6, y:3, w:1, h:1, label:'Dress Pocket', active:false }); // unlocks after mirror
        },
        drawExtras(ctx, TS) {
            // Bed sheet
            const bx=6*TS, by=2*TS;
            ctx.fillStyle='#f0ebe0'; ctx.fillRect(bx+4,by+4,4*TS-8,2*TS-8);
            ctx.strokeStyle='rgba(0,0,0,0.06)'; ctx.lineWidth=1; ctx.strokeRect(bx+4,by+4,4*TS-8,2*TS-8);
            // Pillow
            ctx.fillStyle='#f5f0e5'; ctx.fillRect(bx+TS*0.5, by+6, TS*1.2, TS*0.5);

            // Dress on bed (white fabric)
            ctx.fillStyle='#faf8f5'; ctx.fillRect(7*TS+6, 2*TS+8, 2*TS-12, 2*TS-16);
            ctx.strokeStyle='rgba(0,0,0,0.08)'; ctx.strokeRect(7*TS+6, 2*TS+8, 2*TS-12, 2*TS-16);
            // Embroidery detail
            ctx.strokeStyle='rgba(180,160,130,0.3)'; ctx.lineWidth=0.5;
            for (let i=0;i<4;i++) { ctx.beginPath(); ctx.arc(7.5*TS+i*8, 2*TS+14, 3, 0, Math.PI*2); ctx.stroke(); }

            // Mirror on right wall
            ctx.fillStyle='#c0c8d0'; ctx.fillRect(14*TS+6, 5*TS+4, TS-12, 2*TS-8);
            ctx.strokeStyle='#8a7e6e'; ctx.lineWidth=2; ctx.strokeRect(14*TS+6, 5*TS+4, TS-12, 2*TS-8);

            // Fitting mirror on floor
            ctx.fillStyle='#b8c0c8'; ctx.fillRect(2*TS+8, 8*TS+8, TS-16, TS-16);
            ctx.strokeStyle='#6b5a48'; ctx.lineWidth=1; ctx.strokeRect(2*TS+8, 8*TS+8, TS-16, TS-16);

            // Window with light on right
            ctx.fillStyle='rgba(255,240,200,0.15)';
            ctx.fillRect(13*TS, 1*TS, 2*TS, TS);
        }
    };

    // ---------- LEVEL 3: SALA AT EVENING (CANDLES) ----------
    MAPS.sala_evening = {
        width: 20, height: 15,
        playerStart: { x: 9, y: 12 },
        colors: {
            floor: '#c8b89a', floorAlt: '#c0b092',
            wall: '#6a5a48', wallTop: '#5a4a38', door: '#4a3a28',
            furniture: '#5a4a38', furnitureTop: '#6a5a48'
        },
        build(s, t, h) {
            for (let y = 0; y < 15; y++) for (let x = 0; x < 20; x++) {
                if (y===0||y===14||x===0||x===19) { s[y][x]=true; t[y][x]=1; }
                else { s[y][x]=false; t[y][x]=0; }
            }
            t[14][9]=2; t[14][10]=2; s[14][9]=false; s[14][10]=false;
            // Same furniture as sala
            addS(s,8,2,4,1,'altar'); addS(s,2,2,2,1,'table_left'); addS(s,16,2,2,1,'table_right');
            addS(s,6,8,1,1,'chair'); addS(s,13,8,1,1,'chair'); addS(s,9,7,2,1,'center_table');

            // Torn page on windowsill
            h.push({ id:'candle_page', x:18, y:3, w:1, h:1, label:'Page on Windowsill', active:true });
            // Mother's note under candle box
            h.push({ id:'mother_note', x:8, y:2, w:1, h:1, label:'Candle Box', active:true });
            // 7 candle positions on the altar (center outward)
            h.push({ id:'candle_4', x:10, y:2, w:1, h:1, label:'Center Candle', active:false }); // center first
            h.push({ id:'candle_3', x:9, y:2, w:1, h:1, label:'Candle Position', active:false });
            h.push({ id:'candle_5', x:11, y:2, w:1, h:1, label:'Candle Position', active:false });
            h.push({ id:'candle_2', x:8, y:3, w:1, h:1, label:'Candle Position', active:false });
            h.push({ id:'candle_6', x:11, y:3, w:1, h:1, label:'Candle Position', active:false });
            h.push({ id:'candle_1', x:7, y:3, w:1, h:1, label:'Candle Position', active:false });
            h.push({ id:'candle_7', x:12, y:3, w:1, h:1, label:'Last Candle', active:false });
            // Diary page under 7th candle (hidden until found)
            h.push({ id:'candle_diary', x:12, y:3, w:1, h:1, label:'Page Under Candle', active:false });
        },
        drawExtras(ctx, TS) {
            // Banner (same but darker lighting)
            const bx=7*TS, by=0.2*TS;
            ctx.fillStyle='#ede6d8'; ctx.fillRect(bx,by,6*TS,1.4*TS);
            ctx.strokeStyle='rgba(140,120,90,0.4)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,6*TS,1.4*TS);
            ctx.fillStyle='#3a3228'; ctx.font=`bold ${Math.floor(TS*0.4)}px Caveat, cursive`;
            ctx.textAlign='center'; ctx.fillText('Gaya Maria Reyes', bx+3*TS, by+TS*0.55);
            ctx.font=`${Math.floor(TS*0.22)}px Inter, sans-serif`; ctx.fillStyle='#7a6e5e';
            ctx.fillText('Ika-18 Kaarawan', bx+3*TS, by+TS*0.95); ctx.textAlign='left';

            // Flowers already placed (green tint on old positions)
            const flowerPos = [[3,13],[7,13],[9,6],[4,5],[15,5],[9,2]];
            flowerPos.forEach(([fx,fy]) => {
                ctx.fillStyle='rgba(100,160,80,0.15)'; ctx.fillRect(fx*TS+2,fy*TS+2,TS-4,TS-4);
            });

            // Evening light — warm amber from left window
            ctx.fillStyle='rgba(255,180,60,0.06)';
            ctx.fillRect(0,0,20*TS,15*TS);
            // Window glow
            ctx.fillStyle='rgba(255,160,40,0.12)';
            ctx.fillRect(1*TS, 4*TS, TS, 3*TS);

            // Altar cloth
            ctx.fillStyle='rgba(240,230,210,0.3)';
            ctx.fillRect(7*TS, 2*TS, 6*TS, 2*TS);
        }
    };

    // Helper
    function addS(s, sx, sy, w, h, type) {
        for (let y=sy; y<sy+h; y++) for (let x=sx; x<sx+w; x++) s[y][x] = { type };
    }

    /* ============================================
       PLAYER
       ============================================ */
    const player = {
        x:0, y:0, width:20*SCALE, height:20*SCALE, speed:110*SCALE, runMult:1.6,
        direction:3, frame:0, frameTimer:0, state:'idle', frameWidth:20, frameHeight:20,
        init(sx, sy) { this.x = sx * TILE_SIZE; this.y = sy * TILE_SIZE; },
        update(dt) {
            let dx=0, dy=0;
            if (keys.w||keys.ArrowUp) dy-=1; if (keys.s||keys.ArrowDown) dy+=1;
            if (keys.a||keys.ArrowLeft) dx-=1; if (keys.d||keys.ArrowRight) dx+=1;
            if (dx!==0&&dy!==0) { const l=Math.sqrt(dx*dx+dy*dy); dx/=l; dy/=l; }
            const isRun=keys.Shift&&(dx!==0||dy!==0);
            const spd=isRun?this.speed*this.runMult:this.speed;
            if (dx!==0||dy!==0) {
                this.state=isRun?'run':'walk';
                if(Math.abs(dx)>Math.abs(dy)) this.direction=dx>0?2:1; else this.direction=dy>0?0:3;
                const nx=this.x+dx*spd*dt, ny=this.y+dy*spd*dt;
                const padX=6*SCALE, padY=10*SCALE;
                const tl=Math.floor((nx+padX)/TILE_SIZE), tr=Math.floor((nx+this.width-padX)/TILE_SIZE);
                const tt=Math.floor((ny+padY)/TILE_SIZE), tb=Math.floor((ny+this.height)/TILE_SIZE);
                let col=false;
                for(let ty=tt;ty<=tb;ty++) for(let tx=tl;tx<=tr;tx++) {
                    if(ty>=0&&ty<MH&&tx>=0&&tx<MW) { if(solid[ty][tx]) col=true; } else col=true;
                }
                if(!col) { this.x=nx; this.y=ny; }
                this.frameTimer+=dt;
                if(this.frameTimer>=(isRun?0.08:0.12)) { this.frameTimer=0; this.frame++; }
            } else {
                this.state='idle'; this.frameTimer+=dt;
                if(this.frameTimer>=0.2) { this.frameTimer=0; this.frame++; }
            }
        },
        draw(ctx) {
            let img, maxF=4;
            switch(this.state) { case 'walk':img=assets.playerWalk;maxF=4;break; case 'run':img=assets.playerRun;maxF=6;break; default:img=assets.playerIdle;maxF=4; }
            ctx.fillStyle='rgba(0,0,0,0.15)'; ctx.beginPath();
            ctx.ellipse(this.x+this.width/2,this.y+this.height-2*SCALE,this.width/3,this.width/6,0,0,Math.PI*2); ctx.fill();
            const f=this.frame%maxF;
            ctx.drawImage(img,f*this.frameWidth,this.direction*this.frameHeight,this.frameWidth,this.frameHeight,Math.floor(this.x),Math.floor(this.y),this.width,this.height);
        }
    };

    // --- Camera ---
    const camera = {
        x:0, y:0,
        update() {
            const tw=MW*TILE_SIZE, th=MH*TILE_SIZE;
            const tx=player.x+player.width/2-canvas.width/2, ty=player.y+player.height/2-canvas.height/2;
            this.x+=(tx-this.x)*0.1; this.y+=(ty-this.y)*0.1;
            this.x=Math.max(0,Math.min(this.x,tw-canvas.width));
            this.y=Math.max(0,Math.min(this.y,th-canvas.height));
            if(tw<canvas.width) this.x=-(canvas.width-tw)/2;
            if(th<canvas.height) this.y=-(canvas.height-th)/2;
        }
    };

    /* ============================================
       RENDERING
       ============================================ */
    // Furniture visual config
    const FURN_STYLE = {
        altar:    { fill:'#4a3a28', top:'#5a4a38', pad:1 },
        bed:      { fill:'#8a7a68', top:'#d8d0c0', pad:2 },
        dresser:  { fill:'#6b5a48', top:'#8a7a68', pad:2 },
        nightstand:{ fill:'#6b5a48', top:'#8a7560', pad:4 },
        dress_form:{ fill:'#9a8a78', top:'#b8a898', pad:6 },
        fitting_mirror_obj:{ fill:'#8090a0', top:'#a0b0c0', pad:6 },
        table_left:{ fill:'#6b5a48', top:'#8a7560', pad:2 },
        table_right:{ fill:'#6b5a48', top:'#8a7560', pad:2 },
        chair:    { fill:'#7a6a58', top:'#9a8a78', pad:6 },
        center_table:{ fill:'#6b5a48', top:'#8a7560', pad:2 },
    };

    function drawMap() {
        for(let y=0;y<MH;y++) for(let x=0;x<MW;x++) {
            const px=x*TILE_SIZE, py=y*TILE_SIZE, tile=tileMap[y][x];
            if(tile===0) {
                ctx.fillStyle=(x+y)%2===0?mapColors.floor:mapColors.floorAlt;
                ctx.fillRect(px,py,TILE_SIZE,TILE_SIZE);
                ctx.strokeStyle='rgba(0,0,0,0.03)'; ctx.lineWidth=1; ctx.strokeRect(px+1,py+1,TILE_SIZE-2,TILE_SIZE-2);
            } else if(tile===1) {
                ctx.fillStyle=y===0?mapColors.wallTop:mapColors.wall;
                ctx.fillRect(px,py,TILE_SIZE,TILE_SIZE);
                // Wainscoting detail on side walls
                if(x===0||x===MW-1) {
                    ctx.fillStyle='rgba(0,0,0,0.06)';
                    ctx.fillRect(px, py+TILE_SIZE*0.6, TILE_SIZE, TILE_SIZE*0.4);
                }
                ctx.strokeStyle='rgba(0,0,0,0.08)'; ctx.lineWidth=1; ctx.strokeRect(px,py,TILE_SIZE,TILE_SIZE);
            } else if(tile===2) {
                ctx.fillStyle=mapColors.door; ctx.fillRect(px,py,TILE_SIZE,TILE_SIZE);
                // Door frame
                ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=2; ctx.strokeRect(px+3,py+2,TILE_SIZE-6,TILE_SIZE-4);
            }
        }
        // Furniture with distinct styles
        for(let y=0;y<MH;y++) for(let x=0;x<MW;x++) {
            if(solid[y][x]&&solid[y][x].type) {
                const px=x*TILE_SIZE, py=y*TILE_SIZE;
                const style = FURN_STYLE[solid[y][x].type] || { fill:mapColors.furniture, top:mapColors.furnitureTop, pad:2 };
                const p = style.pad;
                // Shadow
                ctx.fillStyle='rgba(0,0,0,0.08)'; ctx.fillRect(px+p+2,py+p+2,TILE_SIZE-p*2,TILE_SIZE-p*2);
                // Body
                ctx.fillStyle=style.fill; ctx.fillRect(px+p,py+p,TILE_SIZE-p*2,TILE_SIZE-p*2);
                // Top surface
                ctx.fillStyle=style.top; ctx.fillRect(px+p+2,py+p+2,TILE_SIZE-p*2-4,TILE_SIZE-p*2-4);
            }
        }
        if(drawMapExtras) drawMapExtras(ctx, TILE_SIZE);
    }

    function drawHotspots() {
        hotspots.forEach(h => {
            if(!h.active) return;
            const px=h.x*TILE_SIZE, py=h.y*TILE_SIZE, w=h.w*TILE_SIZE, ht=h.h*TILE_SIZE;
            const cx=px+w/2, cy=py+ht/2;

            if(h.completed) {
                // Completed: soft green with checkmark
                ctx.fillStyle='rgba(100,180,100,0.25)'; ctx.fillRect(px+2,py+2,w-4,ht-4);
                ctx.strokeStyle='rgba(80,160,80,0.5)'; ctx.lineWidth=1; ctx.strokeRect(px+2,py+2,w-4,ht-4);
                // Checkmark
                ctx.strokeStyle='rgba(80,160,80,0.6)'; ctx.lineWidth=2;
                ctx.beginPath(); ctx.moveTo(cx-6,cy); ctx.lineTo(cx-2,cy+5); ctx.lineTo(cx+7,cy-5); ctx.stroke();

                // Candle flame for completed candles in evening map
                if(h.id && h.id.startsWith('candle_') && h.id !== 'candle_page' && h.id !== 'candle_diary' && currentMapId === 'sala_evening') {
                    drawCandleFlame(cx, py+4);
                }
            } else {
                // Active: pulsing golden glow with diamond marker
                const pulse=0.5+0.5*Math.sin(animFrame*0.05);
                const glow = 0.12 + 0.18*pulse;
                // Glow area
                ctx.fillStyle=`rgba(212,168,86,${glow})`; ctx.fillRect(px,py,w,ht);
                ctx.strokeStyle=`rgba(212,168,86,${0.35+0.25*pulse})`; ctx.lineWidth=1.5; ctx.strokeRect(px+1,py+1,w-2,ht-2);
                // Floating diamond marker
                const bob = Math.sin(animFrame*0.06)*3;
                ctx.save(); ctx.translate(cx, py - 6 + bob);
                ctx.fillStyle=`rgba(212,168,86,${0.6+0.3*pulse})`;
                ctx.beginPath(); ctx.moveTo(0,-5); ctx.lineTo(4,0); ctx.lineTo(0,5); ctx.lineTo(-4,0); ctx.closePath(); ctx.fill();
                ctx.restore();
            }
        });
    }

    // Animated candle flame
    function drawCandleFlame(x, y) {
        const flicker = Math.sin(animFrame*0.15)*1.5 + Math.cos(animFrame*0.23)*1;
        // Outer glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, TILE_SIZE*0.8);
        grad.addColorStop(0, 'rgba(255,200,80,0.15)');
        grad.addColorStop(1, 'rgba(255,200,80,0)');
        ctx.fillStyle = grad; ctx.fillRect(x-TILE_SIZE, y-TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
        // Candle stick
        ctx.fillStyle='#f0e8d0'; ctx.fillRect(x-2, y+4, 4, 10);
        // Flame
        ctx.fillStyle='rgba(255,180,40,0.9)';
        ctx.beginPath(); ctx.moveTo(x, y-6+flicker); ctx.quadraticCurveTo(x+4, y, x, y+4); ctx.quadraticCurveTo(x-4, y, x, y-6+flicker); ctx.fill();
        // Inner flame
        ctx.fillStyle='rgba(255,240,180,0.8)';
        ctx.beginPath(); ctx.moveTo(x, y-3+flicker*0.5); ctx.quadraticCurveTo(x+2, y, x, y+2); ctx.quadraticCurveTo(x-2, y, x, y-3+flicker*0.5); ctx.fill();
    }

    // --- Interaction ---
    let nearHotspot = null;
    function checkInteraction() {
        const ptx=Math.floor((player.x+player.width/2)/TILE_SIZE);
        const pty=Math.floor((player.y+player.height/2)/TILE_SIZE);
        nearHotspot=null;
        for(const h of hotspots) {
            if(!h.active||h.completed) continue;
            for(let hx=h.x;hx<h.x+h.w;hx++) for(let hy=h.y;hy<h.y+h.h;hy++) {
                if(Math.abs(ptx-hx)+Math.abs(pty-hy)<=2) { nearHotspot=h; break; }
            }
            if(nearHotspot) break;
        }
        const p=document.getElementById('interact-prompt');
        if(nearHotspot&&p) { p.style.display=''; document.getElementById('interact-label').textContent=nearHotspot.label; }
        else if(p) { p.style.display='none'; }
    }

    // --- Game Loop ---
    function loop(timestamp) {
        if(!running) return;
        const dt=Math.min((timestamp-lastTime)/1000,0.1); lastTime=timestamp; animFrame++;
        player.update(dt); camera.update(); checkInteraction();
        ctx.fillStyle='#0a0810'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.save(); ctx.translate(-camera.x,-camera.y);
        drawMap(); drawHotspots(); player.draw(ctx);
        ctx.restore();
        requestAnimationFrame(loop);
    }

    /* ============================================
       PUBLIC API
       ============================================ */
    function loadMap(mapId) {
        const def = MAPS[mapId];
        if (!def) { console.error('[GAYA] Unknown map:', mapId); return; }
        currentMapId = mapId;
        MW = def.width; MH = def.height;
        solid = []; tileMap = []; hotspots.length = 0;
        for (let y=0;y<MH;y++) { solid[y]=[]; tileMap[y]=[]; for(let x=0;x<MW;x++) { solid[y][x]=false; tileMap[y][x]=0; } }
        mapColors = def.colors;
        drawMapExtras = def.drawExtras || null;
        def.build(solid, tileMap, hotspots);
        player.init(def.playerStart.x, def.playerStart.y);
    }

    function loadAndStart(onInteract, mapId) {
        onInteractCb = onInteract;
        canvas = document.getElementById('game-canvas');
        ctx = canvas.getContext('2d');

        function resize() { canvas.width=window.innerWidth; canvas.height=window.innerHeight; ctx.imageSmoothingEnabled=false; }
        window.addEventListener('resize', resize); resize();

        if (!inputBound) {
            inputBound = true;
            window.addEventListener('keydown', (e) => {
                if(keys.hasOwnProperty(e.key)) keys[e.key]=true;
                if(e.key==='e'||e.key==='E') { if(nearHotspot&&onInteractCb) onInteractCb(nearHotspot); }
            });
            window.addEventListener('keyup', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key]=false; });
        }

        loadMap(mapId || 'sala');

        if (spritesReady) { running=true; lastTime=performance.now(); requestAnimationFrame(loop); return; }
        let loaded=0; const total=Object.keys(assetPaths).length;
        for(const [key,path] of Object.entries(assetPaths)) {
            assets[key].src=path;
            const done = () => { loaded++; if(loaded===total) { spritesReady=true; running=true; lastTime=performance.now(); requestAnimationFrame(loop); } };
            assets[key].onload=done; assets[key].onerror=() => { console.warn('[GAYA] Failed:',key); done(); };
        }
    }

    function switchMap(mapId, onInteract) {
        running = false;
        onInteractCb = onInteract;
        loadMap(mapId);
        setTimeout(() => { running=true; lastTime=performance.now(); requestAnimationFrame(loop); }, 100);
    }

    function stop() { running=false; }
    function getHotspots() { return hotspots; }

    return { loadAndStart, switchMap, stop, getHotspots };
})();
