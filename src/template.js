import example from "./example.js"

export const docs = (c) => {
    return c.html(`<!doctype html>
<html lang="zh-CN" id="htmlid">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>小关のMeting | Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/zui@3.0.0/dist/zui.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css">
</head>

<body>
    <style>
        .panel { padding: 5px; margin: 10px; width: 95%; }
        .style-group { position: fixed; right: 30px; top: 30px }
        #htmlid.dark {
            .aplayer  { background: #1e293b; }
            .aplayer .aplayer-lrc:before { background: linear-gradient(to bottom, rgb(30, 41, 59) 0%, rgba(255, 255, 255, 0) 100%); }
            .aplayer .aplayer-lrc:after { background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(30, 41, 59, 0.726) 100%); } }
        @media (max-width: 629px) { .style-group { position: fixed; right: auto; top: auto; bottom: 20px; left: calc(50% - 50px); justify-content: center; } }
    </style>
    <h1 style="padding: 30px;padding-bottom: 15px;">Meting API | 文档</h1>
    <ol class="breadcrumb" style="padding: 30px;padding-top: 0px;padding-bottom: 0px;">
        <li><a href="/">首页</a></li>
        <li class="active">文档</li>
    </ol>
    <div class="btn-group style-group">
        <button class="btn" type="button" onclick="style_light()" id="style_light"><i
                class="icon icon-sun"></i></button>
        <button class="btn" type="button" onclick="style_dark()" id="style_dark"><i class="icon icon-moon"></i></button>
        <button class="btn active" type="button" onclick="style_auto()" id="style_auto"><i
                class="icon icon-desktop"></i></button>
    </div>
    <div class="text-lg" style="margin: 20px;padding: 10px;">
        <p>这里是 Meting 的文档。Mettng 是一个用于网页播放器 APlayer 以及其他软件调用的程序接口，可便捷的部署至无服务器平台，如 Vercel。</p>
        <br>
        <h2>接口使用说明</h2>
        <div class="panel font-mono text-xl">
            ${get_url(c)}/server=<span class="special-pale">[server]</span>&type=<span
                class="special-pale">[type]</span>&id=<span class="special-pale">[id]</span>
        </div>
        <table class="table panel">
            <thead>
                <tr>
                    <th>参数名</th>
                    <th>默认值</th>
                    <th>参数介绍</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code class="special-pale">server</code></td>
                    <td><code>netease</code></td>
                    <td>指定获取 json 音乐相关信息的音乐平台名。选填 <code>netease</code>、<code>tencent</code>。</td>
                </tr>
                <tr>
                    <td><code class="special-pale">type</code></td>
                    <td><code>playlist</code></td>
                    <td>指定获取 json 音乐相关信息的类型。选填<code>lrc</code>(歌词)、<code>url</code>(歌曲链接)、<code>pic</code>(歌词)、<code>song</code>(歌曲信息)、<code>playlist</code>(歌单)、<code>artist</code>(歌手)、<code>search</code>(搜索)。</td>
                </tr>
                <tr>
                    <td><code class="special-pale">id</code></td>
                    <td><code>9564899591</code></td>
                    <td>大多数情况下该值为歌曲id、歌单id。<code>search</code> 是个例外，请在 <code>search</code> 的 <code>id</code> 参数里写您要搜索的内容。</td>
                </tr>
            </tbody>
        </table>
        <br>
        <h2>接口使用Demo</h2>
        <div class="input-group panel">
            <select class="form-control mserver">
                <option>netease</option>
                <option>tencent</option>
            </select>
            <select class="form-control mclass">
                <option>playlist</option>
                <option>lrc</option>
                <option>url</option>
                <option>pic</option>
                <option>song</option>
                <option>artist</option>
                <option>search</option>
            </select>
            <input type="text" class="form-control mid" placeholder="id">
            <button type="button" class="btn" onclick="clearbutton()"><i class="icon icon-remove"></i></button>
            <button type="button" class="btn" onclick="searchbutton()"><i class="icon icon-search"></i></button>
        </div>
        <div id="aplayer"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.js"></script>
    <script src="https://unpkg.com/zui@3.0.0/dist/zui.js"></script>
</body>
<script>
    const ap = new APlayer({    
        container: document.getElementById('aplayer')
    });
    function clearbutton(){
        ap.list.clear();
    }
    function sendMusicRequest(mserver,mclass,mid) {
        const url = \`api?server=${encodeURIComponent(mserver)}&type=${encodeURIComponent(mclass)}&id=${encodeURIComponent(mid)}\`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('成功获取到数据:', xhr.responseText);
                const data = JSON.parse(xhr.responseText);
                ap.list.add(data);
            } else {
                console.error('请求失败:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('请求失败:', xhr.statusText);
        };
        xhr.send();
    }
    function searchbutton() {
        // 
        const mserver_value = document.querySelector('.mserver').value;
        const mclass_value = document.querySelector('.mclass').value;
        const mid_value = document.querySelector('.mid').value;
        sendMusicRequest(mserver_value,mclass_value,mid_value);
    }
</script>
<script>
    let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; let element = document.getElementById('htmlid'); element.classList.toggle('dark', isDarkMode); element.classList.toggle('light', !isDarkMode);
    function style_auto() { let click = document.getElementById('style_auto'); click.classList.add("active"); let rd = document.getElementById('style_dark'); rd.classList.remove("active"); let rl = document.getElementById('style_light'); rl.classList.remove("active"); let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; let element = document.getElementById('htmlid'); element.classList.toggle('dark', isDarkMode); element.classList.toggle('light', !isDarkMode); }
    // 暗色  
    function style_dark() { let click = document.getElementById('style_dark'); click.classList.add("active"); let rl = document.getElementById('style_light'); rl.classList.remove("active"); let ra = document.getElementById('style_auto'); ra.classList.remove("active"); let element = document.getElementById('htmlid'); element.className = "dark"; }
    // 亮色  
    function style_light() { let click = document.getElementById('style_light'); click.classList.add("active"); let rd = document.getElementById('style_dark'); rd.classList.remove("active"); let ra = document.getElementById('style_auto'); ra.classList.remove("active"); let element = document.getElementById('htmlid'); element.className = "light"; }
</script>

</html>`)
}
export const handler = (c) => {
    return c.html(`<!DOCTYPE html>
<html lang="zh-CN" id="htmlid">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>小关のMeting | Test/title>
    <link rel="stylesheet" href="https://unpkg.com/zui@3.0.0/dist/zui.css">
    <link rel="stylesheet" href="https://unpkg.com/aplayer/dist/APlayer.min.css">
</head>

<body>
    <style>
        .audiolist {
            padding: 20px;
            margin: 30px;
        }
        .style-group { position: fixed; right: 30px; top: 30px }
        @media (max-width: 629px) { .style-group { position: fixed; right: auto; top: auto; bottom: 20px; left: calc(50% - 50px); justify-content: center; } }
        #htmlid.dark {
            .aplayer { background: #1e293b; }
            .aplayer .aplayer-lrc:before { background: linear-gradient(to bottom, rgb(30, 41, 59) 0%, rgba(255, 255, 255, 0) 100%); }
            .aplayer .aplayer-lrc:after { background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(30, 41, 59, 0.726) 100%); } }
    </style>
    <div class="btn-group style-group">
        <button class="btn" type="button" onclick="style_light()" id="style_light"><i
                class="icon icon-sun"></i></button>
        <button class="btn" type="button" onclick="style_dark()" id="style_dark"><i class="icon icon-moon"></i></button>
        <button class="btn active" type="button" onclick="style_auto()" id="style_auto"><i
                class="icon icon-desktop"></i></button>
    </div>
    <script src="https://unpkg.com/zui@3.0.0/dist/zui.js"></script>
    <script src="https://unpkg.com/aplayer/dist/APlayer.min.js"></script>
    <script>
        var meting_api = 'api?server=:server&type=:type&id=:id&auth=:auth&r=:r';
    </script>
    <script src="https://unpkg.com/@xizeyoupan/meting@latest/dist/Meting.min.js"></script>
    <h1 style="padding: 30px;padding-bottom: 15px;">Meting API | 测试</h1>
    <ol class="breadcrumb" style="padding: 30px;padding-top: 0px;padding-bottom: 0px;">
    <li><a href="/">首页</a></li>
    <li class="active">测试</li>
    </ol>
    <div class="audiolist"> 
        `Object.keys(example).map(provider => {
        Object.keys(example[provider]).map(type => {
        if (!example[provider][type].show) return
        html += `
        <div><p>${provider} ${type}</p><meting-js server="${provider}" type="${type}" id="${example[provider][type].value}" list-folded=true /></div><br/>`})})html += `
    </div>
</body>
<script>
    // 主题设置
    // 暗色主题判断
    let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; let element = document.getElementById('htmlid'); element.classList.toggle('dark', isDarkMode); element.classList.toggle('light', !isDarkMode);
    // 自动  
    function style_auto() { let click = document.getElementById('style_auto'); click.classList.add("active"); let rd = document.getElementById('style_dark'); rd.classList.remove("active"); let rl = document.getElementById('style_light'); rl.classList.remove("active"); let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; let element = document.getElementById('htmlid'); element.classList.toggle('dark', isDarkMode); element.classList.toggle('light', !isDarkMode); }
    // 暗色  
    function style_dark() { let click = document.getElementById('style_dark'); click.classList.add("active"); let rl = document.getElementById('style_light'); rl.classList.remove("active"); let ra = document.getElementById('style_auto'); ra.classList.remove("active"); let element = document.getElementById('htmlid'); element.className = "dark"; }
    // 亮色  
    function style_light() { let click = document.getElementById('style_light'); click.classList.add("active"); let rd = document.getElementById('style_dark'); rd.classList.remove("active"); let ra = document.getElementById('style_auto'); ra.classList.remove("active"); let element = document.getElementById('htmlid'); element.className = "light"; }
</script>
</script>

</html>`)
}

