/* ============================================
   GAYA — Camera Controller
   Smooth-follow camera with edge clamping
   and centering for small maps.
   ============================================ */

window.GAYA = window.GAYA || {};

GAYA.Camera = {
    x: 0,
    y: 0,

    update: function(player, canvas, MW, MH) {
        var TILE_SIZE = GAYA.Config.TILE_SIZE;
        var RS = GAYA.Config.PLAYER_RENDER_SCALE || 0.12;
        var grid = player._getGrid();
        var pw = grid.fw * RS;
        var ph = grid.fh * RS;

        var tw = MW * TILE_SIZE;
        var th = MH * TILE_SIZE;
        var tx = player.x + pw / 2 - canvas.width / 2;
        var ty = player.y + ph / 2 - canvas.height / 2;

        // Smooth follow
        this.x += (tx - this.x) * 0.1;
        this.y += (ty - this.y) * 0.1;

        // Clamp to map edges
        this.x = Math.max(0, Math.min(this.x, tw - canvas.width));
        this.y = Math.max(0, Math.min(this.y, th - canvas.height));

        // Center if map is smaller than viewport
        if (tw < canvas.width)  this.x = -(canvas.width - tw) / 2;
        if (th < canvas.height) this.y = -(canvas.height - th) / 2;
    }
};
