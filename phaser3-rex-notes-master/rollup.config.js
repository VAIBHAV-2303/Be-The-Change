import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { uglify } from "rollup-plugin-uglify";
// import { terser } from 'rollup-plugin-terser'; // Uglify for ES6
import babel from 'rollup-plugin-babel';

let plugins = {
    // single pack
    'plugins': './plugins/index.js',

    // game objects
    'bbcodetextplugin': './plugins/bbcodetext-plugin.js',
    'bbcodetext': './plugins/bbcodetext.js',
    'tagtextplugin': './plugins/tagtext-plugin.js',
    'tagtext': './plugins/tagtext.js',
    'canvasplugin': './plugins/canvas-plugin.js',
    'canvas': './plugins/canvas.js',
    'circlemaskimageplugin': './plugins/circlemaskimage-plugin.js',
    'circlemaskimage': './plugins/circlemaskimage.js',
    'containerliteplugin': './plugins/containerlite-plugin.js',
    'containerlite': './plugins/containerlite.js',
    'gridtableplugin': './plugins/gridtable-plugin.js',
    'gridtable': './plugins/gridtable.js',
    'roundrectangleplugin': './plugins/roundrectangle-plugin.js',
    'roundrectangle': './plugins/roundrectangle.js',
    'inputtextplugin': './plugins/inputtext-plugin.js',
    'inputtext': './plugins/inputtext.js',
    'videoplugin': './plugins/video-plugin.js',
    'video': './plugins/video.js',
    'youtubeplayerplugin': './plugins/youtubeplayer-plugin.js',
    'youtubeplayer': './plugins/youtubeplayer.js',
    'persistenceeffectplugin': './plugins/persistenceeffect-plugin.js',
    'persistenceeffect': './plugins/persistenceeffect.js',
    'lineplugin': './plugins/line-plugin.js',
    'line': './plugins/line.js',
    'ninepatchplugin': './plugins/ninepatch-plugin.js',
    'ninepatch': './plugins/ninepatch.js',

    // custom file loader      
    'webfontloaderplugin': './plugins/webfontloader-plugin.js',
    'awaitloaderplugin': './plugins/awaitloader-plugin.js',

    // actions                    
    'gridalignplugin': './plugins/gridalign-plugin.js',
    'randomplaceplugin': './plugins/randomplace-plugin.js',

    // input
    'touchstateplugin': './plugins/touchstate-plugin.js',
    'dragplugin': './plugins/drag-plugin.js',
    'dragspeedplugin': './plugins/dragspeed-plugin.js',
    'sliderplugin': './plugins/slider-plugin.js',
    'scrollerplugin': './plugins/scroller-plugin.js',
    'buttonplugin': './plugins/button-plugin.js',
    'touchcursorplugin': './plugins/touchcursor-plugin.js',
    'virtualjoystickplugin': './plugins/virtualjoystick-plugin.js',
    'cursoratboundplugin': './plugins/cursoratbound-plugin.js',
    'mousewheeltoupdownplugin': './plugins/mousewheeltoupdown-plugin.js',
    'pinchplugin': './plugins/pinch-plugin.js',
    'dragrotateplugin': './plugins/dragrotate-plugin.js',
    'gesturesplugin': './plugins/gestures-plugin.js',

    // member of game object
    'fadeplugin': './plugins/fade-plugin.js',
    'scaleplugin': './plugins/scale-plugin.js',
    'flipplugin': './plugins/flip-plugin.js',
    'pathfollowerplugin': './plugins/pathfollower-plugin.js',
    'movetoplugin': './plugins/moveto-plugin.js',
    'rotatetoplugin': './plugins/rotateto-plugin.js',
    'flashplugin': './plugins/flash-plugin.js',
    'shakepositionplugin': './plugins/shakeposition-plugin.js',
    'interceptionplugin': './plugins/interception-plugin.js',
    'anchorplugin': './plugins/anchor-plugin.js',
    // member of game object, arcade behavior
    'eightdirectionplugin': './plugins/eightdirection-plugin.js',
    'bulletplugin': './plugins/bullet-plugin.js',
    'shipplugin': './plugins/ship-plugin.js',
    'buildarcadeobjectplugin': './plugins/buildarcadeobject-plugin.js',

    // member of text
    'texttypingplugin': './plugins/texttyping-plugin.js',
    'textpageplugin': './plugins/textpage-plugin.js',
    'texteditplugin': './plugins/textedit-plugin.js',

    // member of scene
    // sound
    'soundfadeplugin': './plugins/soundfade-plugin.js',

    // control
    'sequenceplugin': './plugins/sequence-plugin.js',
    'fsmplugin': './plugins/fsm-plugin.js',
    'tcrpplugin': './plugins/tcrp-plugin.js',
    'csvscenarioplugin': './plugins/csvscenario-plugin.js',
    'waiteventsplugin': './plugins/waitevents-plugin.js',
    'achievementsplugin': './plugins/achievements-plugin.js',
    'conditionstableplugin': './plugins/conditionstable-plugin.js',
    'questplugin': './plugins/quest-plugin.js',
    'loopinticksplugin': './plugins/loopinticks-plugin.js',

    // time
    'clockplugin': './plugins/clock-plugin.js',
    'lifetimeplugin': './plugins/lifetime-plugin.js',
    'awaytimeplugin': './plugins/awaytime-plugin.js',

    // data structure
    'csvtoarrayplugin': './plugins/csvtoarray-plugin.js',
    'csvtohashtableplugin': './plugins/csvtohashtable-plugin.js',
    'restorabledataplugin': './plugins/restorabledata-plugin.js',
    'buffdataplugin': './plugins/buffdata-plugin.js',
    'canvasdataplugin': './plugins/canvasdata-plugin.js',

    // math
    'gashaponplugin': './plugins/gashapon-plugin.js',
    'perlinplugin': './plugins/perlin-plugin.js',
    // geom
    'rhombusplugin': './plugins/rhombus-plugin.js',
    'hexagonplugin': './plugins/hexagon-plugin.js',

    // string
    'xorplugin': './plugins/xor-plugin.js',
    'lzstringplugin': './plugins/lzstring-plugin.js',

    // shader
    'swirlpipelineplugin': './plugins/swirlpipeline-plugin.js',
    'pixelationpipelineplugin': './plugins/pixelationpipeline-plugin.js',
    'grayscalepipelineplugin': './plugins/grayscalepipeline-plugin.js',
    'inversepipelineplugin': './plugins/inversepipeline-plugin.js',
    'hsladjustpipelineplugin': './plugins/hsladjustpipeline-plugin.js',
    'toonifypipelineplugin': './plugins/toonifypipeline-plugin.js',

    // board
    'boardplugin': './plugins/board-plugin.js',

    // graph
    'graphplugin': './plugins/graph-plugin.js',

    // parse
    'parse': './plugins/parse.js',

    // templates
    'bejeweled': './templates/bejeweled/Bejeweled.js',
    'uiplugin': './templates/ui/ui-plugin.js',
    'dialogquest': './templates/dialog-quest/DialogQuest.js',
}

let outputs = [];

for (var key in plugins) {
    let inputFile = plugins[key];
    let outFile = `./rollup/rex${key}.min.js`;
    let libName = `rex${key}`;
    // console.log(inputFile)
    // console.log(outFile)
    // console.log(libName)

    outputs.push({
        input: inputFile,
        output: {
            file: outFile,
            name: libName,
            format: 'umd',
        },
        external: ['phaser'],
        plugins: [
            nodeResolve(),
            commonjs(),
            globals(),
            builtins(),
            babel({
                exclude: 'node_modules/**'
            }),
            uglify()
        ]
    })
}


export default outputs;