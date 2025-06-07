import example from "./example.js";
import get_url from './util.js';

// 定义全局变量，方便后续调用 
const meting_api = 'api?server=:server&type=:type&id=:id&auth=:auth&r=:r';

// 主题切换功能
function styleAuto() {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const element = document.getElementById('htmlid');
  element.classList.toggle('dark', isDarkMode);
  element.classList.toggle('light', !isDarkMode);
}

function styleDark() {
  const click = document.getElementById('style_dark');
  const rd = document.getElementById('style_dark');
  const rl = document.getElementById('style_light');
  const ra = document.getElementById('style_auto');
  const element = document.getElementById('htmlid');
  
  click.classList.add("active");
  rd.classList.remove("active");
  rl.classList.remove("active");
  element.className = "dark";
}

function styleLight() {
  const click = document.getElementById('style_light');
  const rd = document.getElementById('style_dark');
  const ra = document.getElementById('style_auto');
  const element = document.getElementById('htmlid');
  
  click.classList.add("active");
  rd.classList.remove("active");
  ra.classList.remove("active");
  element.className = "light";
}

// 音乐播放功能
function sendMusicRequest(mserver, mclass, mid) {
  const url = `${get_url(c)}/api?server=${encodeURIComponent(mserver)}&type=${encodeURIComponent(mclass)}&id=${encodeURIComponent(mid)}`;
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
  const mserver_value = document.querySelector('.mserver').value;
  const mclass_value = document.querySelector('.mclass').value;
  const mid_value = document.querySelector('.mid').value;
  sendMusicRequest(mserver_value, mclass_value, mid_value);
}

// 页面加载时初始化主题
let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let element = document.getElementById('htmlid');
element.classList.toggle('dark', isDarkMode);
element.classList.toggle('light', !isDarkMode);

// 初始化播放器
const ap = new APlayer({    
  container: document.getElementById('aplayer')
});

// 生成测试页面
function generateTestPage() {
  let html = `
  <!DOCTYPE html>
  <html lang="zh-CN" id="htmlid">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>小关のMeting | Test</title>
      <link rel="stylesheet" href="https:/unpkg.com/zui@3.0.0/dist/zui.css">
      <link rel="stylesheet" href="https:/unpkg.com/aplayer/dist/APlayer.min.css">
  </head>
  <body>
      <style>
          .audiolist {padding: 20px; margin: 30px;}
          .style-group { position: fixed; right: 30px; top: 30px }
          @media (max-width: 629px) { .style-group { position: fixed; right: auto; top: auto; bottom: 20px; left: calc(50% - 50px); justify-content: center; } }
          #htmlid.dark { 
              .aplayer { background: #1e293b; }
              .aplayer .aplayer-lrc:before { background: linear-gradient(to bottom, rgb(30, 41, 59) 0%, rgba(255, 255, 255, 0) 100%); }
              .aplayer .aplayer-lrc:after { background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(30, 41, 59, 0.726) 100%); } 
          }
      </style>
      <div class="btn-group style-group">
          <button class="btn" type="button" onclick="styleLight()" id="style_light"><i class="icon icon-sun"></i></button>
          <button class="btn" type="button" onclick="styleDark()" id="style_dark"><i class="icon icon-moon"></i></button>
          <button class="btn active" type="button" onclick="styleAuto()" id="style_auto"><i class="icon icon-desktop"></i></button>
      </div>
      <script src="https:/unpkg.com/zui@3.0.0/dist/zui.js"></script>
      <script src="https:/unpkg.com/aplayer/dist/APlayer.min.js"></script>
      <script src="https:/unpkg.com/@xizeyoupan/meting@latest/dist/Meting.min.js"></script>
      <h1 style="padding: 30px;padding-bottom: 15px;">Meting API | 测试</h1>
      <ol class="breadcrumb" style="padding: 30px;padding-top: 0px;padding-bottom: 0px;">
      <li><a href="/">首页</a></li>
      <li class="active">测试</li>
      </ol>
      <div class="audiolist">
  `;
  
  Object.keys(example).forEach(provider => {
    Object.keys(example[provider]).forEach(type => {
      if (!example[provider][type].show) return;
      
      html += `
      <div>
          <p>${provider} ${type}</p>
          <meting-js server="${provider}" type="${type}" id="${example[provider][type].value}" list-folded=true />
      </div>
      <br />
      `;
    });
  });
  
  html += `
      </div>
  </body>
  <script>
      // 主题设置函数
      function styleAuto() { 
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          const element = document.getElementById('htmlid');
          element.classList.toggle('dark', isDarkMode);
          element.classList.toggle('light', !isDarkMode);
      }
      
      function styleDark() { 
          const element = document.getElementById('htmlid');
          element.className = "dark";
      }
      
      function styleLight() { 
          const element = document.getElementById('htmlid');
          element.className = "light";
      }
  </script>
  </html>
  `;
  
  return html;
}

// 生成文档页面
function generateDocsPage(c) {
  return `
  <!doctype html>
  <html lang="zh-CN" id="htmlid">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>小关のMeting | Docs</title>
      <link rel="stylesheet" href="https:/unpkg.com/zui@3.0.0/dist/zui.css">
      <link rel="stylesheet" href="https:/cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css">
  </head>
  <body>
      <style>
          .panel { padding: 5px; margin: 10px; width: 95%; }
          .style-group { position: fixed; right: 30px; top: 30px }
          #htmlid.dark { 
              .aplayer  { background: #1e293b; }
              .aplayer .aplayer-lrc:before { background: linear-gradient(to bottom, rgb(30, 41, 59) 0%, rgba(255, 255, 255, 0) 100%); }
              .aplayer .aplayer-lrc:after { background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(30, 41, 59, 0.726) 100%); } 
          }
          @media (max-width: 629px) { .style-group { position: fixed; right: auto; top: auto; bottom: 20px; left: calc(50% - 50px); justify-content: center; } }
      </style>
      <h1 style="padding: 30px;padding-bottom: 15px;">Meting API | 文档</h1>
      <ol class="breadcrumb" style="padding: 30px;padding-top: 0px;padding-bottom: 0px;">
          <li><a href="/">首页</a></li>
          <li class="active">文档</li>
      </ol>
      <div class="btn-group style-group">
          <button class="btn" type="button" onclick="styleLight()" id="style_light"><i class="icon icon-sun"></i></button>
          <button class="btn" type="button" onclick="styleDark()" id="style_dark"><i class="icon icon-moon"></i></button>
          <button class="btn active" type="button" onclick="styleAuto()" id="style_auto"><i class="icon icon-desktop"></i></button>
      </div>
      <div class="text-lg" style="margin: 20px;padding: 10px;">
          <p>这里是 Meting 的文档。Mettng 是一个用于网页播放器 APlayer 以及其他软件调用的程序接口，可便捷的部署至无服务器平台，如 Vercel。</p>
          <br>
          <h2>接口使用说明</h2>
          <div class="panel font-mono text-xl">
              ${get_url(c)}/server=<span class="special-pale">[server]</span>&type=<span class="special-pale">[type]</span>&id=<span class="special-pale">[id]</span>
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
      <script src="https:/cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.js"></script>
      <script src="https:/unpkg.com/zui@3.0.0/dist/zui.js"></script>
  </body>
  <script>
      // 播放器初始化
      const ap = new APlayer({    
          container: document.getElementById('aplayer')
      });
      
      // 清空播放列表
      function clearbutton(){
          ap.list.clear();
      }
      
      // 发送音乐请求
      function sendMusicRequest(mserver,mclass,mid) {
          const url = \`\${get_url(c)}/api?server=\${encodeURIComponent(mserver)}&type=\${encodeURIComponent(mclass)}&id=\${encodeURIComponent(mid)}\`;
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
      
      // 搜索框按钮
      function searchbutton() {
          const mserver_value = document.querySelector('.mserver').value;
          const mclass_value = document.querySelector('.mclass').value;
          const mid_value = document.querySelector('.mid').value;
          sendMusicRequest(mserver_value,mclass_value,mid_value);
      }
  </script>
  <script>
      // 主题设置
      function styleAuto() { 
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          const element = document.getElementById('htmlid');
          element.classList.toggle('dark', isDarkMode);
          element.classList.toggle('light', !isDarkMode);
      }
      
      function styleDark() { 
          const element = document.getElementById('htmlid');
          element.className = "dark";
      }
      
      function styleLight() { 
          const element = document.getElementById('htmlid');
          element.className = "light";
      }
  </script>
  </html>
  `;
}

// 导出接口
export const docs = (c) => {
    return c.html(generateDocsPage(c));
}

export const handler = (c) => {
    return c.html(generateTestPage());
}
