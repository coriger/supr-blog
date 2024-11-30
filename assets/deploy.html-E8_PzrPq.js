import{_ as o,c,b as t,o as d}from"./app-DTNzZX66.js";const n={};function l(i,e){return d(),c("div",null,e[0]||(e[0]=[t(`<blockquote><p>这里我们只介绍 GitLab 和 GitHub 的 pages 功能的部署。</p></blockquote><h2 id="github" tabindex="-1"><a class="header-anchor" href="#github"><span>GitHub</span></a></h2><p>打开项目设置的 <code>GitHub Pages</code> 模块，将 <code>Source</code> 设置为 <code>gh-pages</code>，这样我们就可以将博客项目放在 <code>master</code> 分支，而部署到 <code>gh-pages</code> 分支。</p><h3 id="手动部署" tabindex="-1"><a class="header-anchor" href="#手动部署"><span>手动部署</span></a></h3><p>在根目录建一个 <code>deploy.sh</code> 文件：</p><pre><code class="language-bash"># 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo &#39;www.example.com&#39; &gt; CNAME

git init
git add -A
git commit -m &#39;deploy&#39;

# 如果发布到 https://&lt;USERNAME&gt;.github.io
# git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master

# 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;
# git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages

cd -
</code></pre><p>::: warning 如果你用的 MAC，在项目根目录借助 <code>终端</code> 执行 <code>bash deploy.sh</code> 即可；如果你使用的是 WINDOWS，在项目根目录借助 <code>Git Bash</code> 执行 <code>bash deploy.sh</code> 即可。 :::</p><h3 id="自动部署" tabindex="-1"><a class="header-anchor" href="#自动部署"><span>自动部署</span></a></h3><p><code>GitHub</code> 的自动部署需要借助 <code>travis-ci</code> 。</p><ol><li><p>打开 <a href="https://travis-ci.com/" target="_blank" rel="noopener noreferrer">travis-ci</a>，使用 <code>GitHub</code> 登录；</p></li><li><p>进入设置页面，点击 <code>Manage repositories on GitHub</code> 按钮，将需要自动部署的项目导入进来；</p></li><li><p>项目列表中，项目后面有一个 <code>settings</code> 按钮，点击进去将进行配置：</p><ol><li>获取 <code>token</code>：进入github的设置页面，点击 <code>Developer settings</code> 按钮，点击 <code>Personal access tokens</code> 按钮，在当前页面生成 <code>token</code>，名字随便写，只是起到区分作用；</li><li>配置 <code>token</code>：将上面生成的 <code>token</code> 添加在项目的设置页面的 <code>Environment Variables</code>，切记，名字不可随便写，在这里你写成 <code>GITHUB_TOKEN</code>；</li><li>配置 <code>Cron Jobs</code>：（如果你的项目就在 <code>master</code> 分支，可以不用配置这里）<code>Branch</code> 选择 你存放项目源码的分支，<code>Interval</code> 选择 <code>monthly</code>，<code>Options</code> 选择 <code>Always run</code>，添加成功后便会生效。</li></ol></li><li><p>在根目录下创建 <code>.travis.yml</code>（<a href="https://docs.travis-ci.com/user/deployment/pages/" target="_blank" rel="noopener noreferrer">配置规范</a>）：</p><pre><code class="language-yml">language: node_js
node_js:
  - lts/*
script:
  - npm run build
deploy:
  provider: pages
  skip-cleanup: true
  local_dir: docs/.vuepress/dist # 项目打包后生成的文件的目录
  github-token: $GITHUB_TOKEN # 这里这个变量就是刚才配置 token 时填写的那个变量
  keep-history: true
  on:
    branch: master # 项目源码所在的分支
</code></pre></li><li><p>现在去提交一下代码试试吧，在你提交成功后 <code>travis-ci</code> 的控制台就能看到你的项目在部署了。</p></li></ol><h2 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab"><span>GitLab</span></a></h2><h3 id="手动部署-1" tabindex="-1"><a class="header-anchor" href="#手动部署-1"><span>手动部署</span></a></h3><ol><li><p>设置输出目录为 <code>public</code>：</p><p>由于 <code>GitLab</code> 的 <code>pages</code> 功能的指定文件夹是 <code>public</code>，所以我们要将项目的输出目录改为 <code>public</code>，也就是将 <code>config.js</code> 的 <code>dest</code> 设置为 <code>public</code>；</p></li><li><p>本地编译，然后将项目提交到 <code>GitLab</code> 即可。</p></li></ol><h3 id="自动部署-1" tabindex="-1"><a class="header-anchor" href="#自动部署-1"><span>自动部署</span></a></h3><ol><li><p>设置输出目录为 <code>public</code>；</p></li><li><p>由于 <code>GitLab</code> 自带 CI，所以就省去了很多的配置步骤，只需要在项目根目录创建 <code>.gitlab-ci.yml</code>（<a href="https://docs.gitlab.com/ee/ci/yaml/README.html" target="_blank" rel="noopener noreferrer">配置规范</a>）：</p><pre><code class="language-yml">image: node:9.11.1

pages:
  cache:
    paths:
    - node_modules/ # 缓存 node_modules，加速编译

  script:
  - npm install
  - npm run docs:build
  artifacts:
    paths:
    - public
  only:
  - master
</code></pre></li><li><p>将项目提交到 <code>GitLab</code> 即可。</p></li></ol>`,15)]))}const s=o(n,[["render",l],["__file","deploy.html.vue"]]),r=JSON.parse('{"path":"/blogs/dev/deploy.html","title":"Pages 部署","lang":"zh-CN","frontmatter":{"title":"Pages 部署","date":"2019-05-14T00:00:00.000Z","tags":["Markdown","Github"]},"headers":[{"level":2,"title":"GitHub","slug":"github","link":"#github","children":[{"level":3,"title":"手动部署","slug":"手动部署","link":"#手动部署","children":[]},{"level":3,"title":"自动部署","slug":"自动部署","link":"#自动部署","children":[]}]},{"level":2,"title":"GitLab","slug":"gitlab","link":"#gitlab","children":[{"level":3,"title":"手动部署","slug":"手动部署-1","link":"#手动部署-1","children":[]},{"level":3,"title":"自动部署","slug":"自动部署-1","link":"#自动部署-1","children":[]}]}]}');export{s as comp,r as data};
