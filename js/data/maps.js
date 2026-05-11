/* ============================================
   GAYA — Map Definitions
   Layout data for each playable area:
   tile grids, furniture placement, hotspots,
   and per-map visual extras.
   ============================================ */

window.GAYA = window.GAYA || {};

/* Helper: mark a rectangular region as solid furniture */
function _addSolid(s, sx, sy, w, h, type) {
    for (let y = sy; y < sy + h; y++)
        for (let x = sx; x < sx + w; x++)
            s[y][x] = { type: type };
}

GAYA.Maps = {};

/* ============================================
   LEVEL 1: THE SALA
   ============================================ */
GAYA.Maps.sala = {
    width: 20, height: 15,
    playerStart: { x: 9, y: 12 },
    colors: {
        floor: '#e8dcc6', floorAlt: '#e0d4bc',
        wall: '#8a7560', wallTop: '#6b5a48', door: '#5a4a38',
        furniture: '#6b5a48', furnitureTop: '#8a7560'
    },
    build: function(s, t, h) {
        for (let y = 0; y < 15; y++) for (let x = 0; x < 20; x++) {
            if (y===0||y===14||x===0||x===19) { s[y][x]=true; t[y][x]=1; }
            else { s[y][x]=false; t[y][x]=0; }
        }
        t[14][9]=2; t[14][10]=2; s[14][9]=false; s[14][10]=false;
        _addSolid(s,8,2,4,1,'altar'); _addSolid(s,2,2,2,1,'table_left'); _addSolid(s,16,2,2,1,'table_right');
        _addSolid(s,6,8,1,1,'chair'); _addSolid(s,13,8,1,1,'chair'); _addSolid(s,9,7,2,1,'center_table');
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
    drawExtras: function(ctx, TS) {
        var bx=7*TS, by=0.2*TS;
        ctx.fillStyle='#faf6ee'; ctx.fillRect(bx,by,6*TS,1.4*TS);
        ctx.strokeStyle='rgba(180,160,130,0.4)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,6*TS,1.4*TS);
        ctx.fillStyle='#3a3228'; ctx.font='bold '+Math.floor(TS*0.4)+'px Caveat, cursive';
        ctx.textAlign='center'; ctx.fillText('Gaya Maria Reyes', bx+3*TS, by+TS*0.55);
        ctx.font=Math.floor(TS*0.22)+'px Inter, sans-serif'; ctx.fillStyle='#8a7e6e';
        ctx.fillText('Ika-18 Kaarawan', bx+3*TS, by+TS*0.95); ctx.textAlign='left';
    }
};

/* ============================================
   LEVEL 2: THE BEDROOM
   ============================================ */
GAYA.Maps.bedroom = {
    width: 16, height: 12,
    playerStart: { x: 7, y: 10 },
    colors: {
        floor: '#ddd0b8', floorAlt: '#d5c8b0',
        wall: '#7a6a58', wallTop: '#6b5a48', door: '#5a4a38',
        furniture: '#6b5a48', furnitureTop: '#8a7560'
    },
    build: function(s, t, h) {
        for (let y = 0; y < 12; y++) for (let x = 0; x < 16; x++) {
            if (y===0||y===11||x===0||x===15) { s[y][x]=true; t[y][x]=1; }
            else { s[y][x]=false; t[y][x]=0; }
        }
        t[11][7]=2; t[11][8]=2; s[11][7]=false; s[11][8]=false;
        _addSolid(s,6,2,4,2,'bed');
        _addSolid(s,2,2,2,1,'dresser');
        _addSolid(s,11,3,1,1,'nightstand');
        _addSolid(s,12,5,1,1,'dress_form');
        _addSolid(s,2,8,1,1,'fitting_mirror_obj');
        h.push({ id:'dress_fabric', x:7, y:2, w:1, h:1, label:'Dress Fabric (Bodice)', active:true });
        h.push({ id:'dress_collar', x:8, y:2, w:1, h:1, label:'Dress Collar', active:true });
        h.push({ id:'dress_hem', x:7, y:3, w:1, h:1, label:'Dress Hem', active:false });
        h.push({ id:'dress_sleeves', x:9, y:2, w:1, h:1, label:'Dress Sleeves', active:false });
        h.push({ id:'dress_lace', x:8, y:3, w:1, h:1, label:'Dress Lace', active:true });
        h.push({ id:'fitting_mirror', x:2, y:8, w:1, h:1, label:'Fitting Mirror', active:true });
        h.push({ id:'magazine', x:2, y:2, w:2, h:1, label:'Magazine on Dresser', active:true });
        h.push({ id:'full_mirror', x:14, y:5, w:1, h:2, label:'Mirror', active:false });
        h.push({ id:'shoes_empty', x:13, y:5, w:1, h:1, label:'Empty Space', active:false });
        h.push({ id:'dress_pocket', x:6, y:3, w:1, h:1, label:'Dress Pocket', active:false });
    },
    drawExtras: function(ctx, TS) {
        var bx=6*TS, by=2*TS;
        ctx.fillStyle='#f0ebe0'; ctx.fillRect(bx+4,by+4,4*TS-8,2*TS-8);
        ctx.strokeStyle='rgba(0,0,0,0.06)'; ctx.lineWidth=1; ctx.strokeRect(bx+4,by+4,4*TS-8,2*TS-8);
        ctx.fillStyle='#f5f0e5'; ctx.fillRect(bx+TS*0.5, by+6, TS*1.2, TS*0.5);
        ctx.fillStyle='#faf8f5'; ctx.fillRect(7*TS+6, 2*TS+8, 2*TS-12, 2*TS-16);
        ctx.strokeStyle='rgba(0,0,0,0.08)'; ctx.strokeRect(7*TS+6, 2*TS+8, 2*TS-12, 2*TS-16);
        ctx.strokeStyle='rgba(180,160,130,0.3)'; ctx.lineWidth=0.5;
        for (var i=0;i<4;i++) { ctx.beginPath(); ctx.arc(7.5*TS+i*8, 2*TS+14, 3, 0, Math.PI*2); ctx.stroke(); }
        ctx.fillStyle='#c0c8d0'; ctx.fillRect(14*TS+6, 5*TS+4, TS-12, 2*TS-8);
        ctx.strokeStyle='#8a7e6e'; ctx.lineWidth=2; ctx.strokeRect(14*TS+6, 5*TS+4, TS-12, 2*TS-8);
        ctx.fillStyle='#b8c0c8'; ctx.fillRect(2*TS+8, 8*TS+8, TS-16, TS-16);
        ctx.strokeStyle='#6b5a48'; ctx.lineWidth=1; ctx.strokeRect(2*TS+8, 8*TS+8, TS-16, TS-16);
        ctx.fillStyle='rgba(255,240,200,0.15)';
        ctx.fillRect(13*TS, 1*TS, 2*TS, TS);
    }
};

/* ============================================
   LEVEL 3: SALA AT EVENING (CANDLES)
   ============================================ */
GAYA.Maps.sala_evening = {
    width: 20, height: 15,
    playerStart: { x: 9, y: 12 },
    colors: {
        floor: '#c8b89a', floorAlt: '#c0b092',
        wall: '#6a5a48', wallTop: '#5a4a38', door: '#4a3a28',
        furniture: '#5a4a38', furnitureTop: '#6a5a48'
    },
    build: function(s, t, h) {
        for (let y = 0; y < 15; y++) for (let x = 0; x < 20; x++) {
            if (y===0||y===14||x===0||x===19) { s[y][x]=true; t[y][x]=1; }
            else { s[y][x]=false; t[y][x]=0; }
        }
        t[14][9]=2; t[14][10]=2; s[14][9]=false; s[14][10]=false;
        _addSolid(s,8,2,4,1,'altar'); _addSolid(s,2,2,2,1,'table_left'); _addSolid(s,16,2,2,1,'table_right');
        _addSolid(s,6,8,1,1,'chair'); _addSolid(s,13,8,1,1,'chair'); _addSolid(s,9,7,2,1,'center_table');
        h.push({ id:'candle_page', x:18, y:3, w:1, h:1, label:'Page on Windowsill', active:true });
        h.push({ id:'mother_note', x:8, y:2, w:1, h:1, label:'Candle Box', active:true });
        h.push({ id:'candle_4', x:10, y:2, w:1, h:1, label:'Center Candle', active:false });
        h.push({ id:'candle_3', x:9, y:2, w:1, h:1, label:'Candle Position', active:false });
        h.push({ id:'candle_5', x:11, y:2, w:1, h:1, label:'Candle Position', active:false });
        h.push({ id:'candle_2', x:8, y:3, w:1, h:1, label:'Candle Position', active:false });
        h.push({ id:'candle_6', x:11, y:3, w:1, h:1, label:'Candle Position', active:false });
        h.push({ id:'candle_1', x:7, y:3, w:1, h:1, label:'Candle Position', active:false });
        h.push({ id:'candle_7', x:12, y:3, w:1, h:1, label:'Last Candle', active:false });
        h.push({ id:'candle_diary', x:12, y:3, w:1, h:1, label:'Page Under Candle', active:false });
    },
    drawExtras: function(ctx, TS) {
        var bx=7*TS, by=0.2*TS;
        ctx.fillStyle='#ede6d8'; ctx.fillRect(bx,by,6*TS,1.4*TS);
        ctx.strokeStyle='rgba(140,120,90,0.4)'; ctx.lineWidth=1; ctx.strokeRect(bx,by,6*TS,1.4*TS);
        ctx.fillStyle='#3a3228'; ctx.font='bold '+Math.floor(TS*0.4)+'px Caveat, cursive';
        ctx.textAlign='center'; ctx.fillText('Gaya Maria Reyes', bx+3*TS, by+TS*0.55);
        ctx.font=Math.floor(TS*0.22)+'px Inter, sans-serif'; ctx.fillStyle='#7a6e5e';
        ctx.fillText('Ika-18 Kaarawan', bx+3*TS, by+TS*0.95); ctx.textAlign='left';
        var flowerPos = [[3,13],[7,13],[9,6],[4,5],[15,5],[9,2]];
        flowerPos.forEach(function(p) {
            ctx.fillStyle='rgba(100,160,80,0.15)'; ctx.fillRect(p[0]*TS+2,p[1]*TS+2,TS-4,TS-4);
        });
        ctx.fillStyle='rgba(255,180,60,0.06)';
        ctx.fillRect(0,0,20*TS,15*TS);
        ctx.fillStyle='rgba(255,160,40,0.12)';
        ctx.fillRect(1*TS, 4*TS, TS, 3*TS);
        ctx.fillStyle='rgba(240,230,210,0.3)';
        ctx.fillRect(7*TS, 2*TS, 6*TS, 2*TS);
    }
};
