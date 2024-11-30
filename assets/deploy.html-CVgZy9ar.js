import{_ as t,c as p,b as e,d as s,e as a,a as i,o,r as c}from"./app-CRGmcAPb.js";const d={},r={href:"https://travis-ci.com/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://docs.travis-ci.com/user/deployment/pages/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://docs.gitlab.com/ee/ci/yaml/README.html",target:"_blank",rel:"noopener noreferrer"};function v(b,n){const l=c("ExternalLinkIcon");return o(),p("div",null,[n[23]||(n[23]=e(`<blockquote><p>这里我们只介绍 GitLab 和 GitHub 的 pages 功能的部署。</p></blockquote><h2 id="github" tabindex="-1"><a class="header-anchor" href="#github"><span>GitHub</span></a></h2><p>打开项目设置的 <code>GitHub Pages</code> 模块，将 <code>Source</code> 设置为 <code>gh-pages</code>，这样我们就可以将博客项目放在 <code>master</code> 分支，而部署到 <code>gh-pages</code> 分支。</p><h3 id="手动部署" tabindex="-1"><a class="header-anchor" href="#手动部署"><span>手动部署</span></a></h3><p>在根目录建一个 <code>deploy.sh</code> 文件：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 确保脚本抛出遇到的错误</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成静态文件</span></span>
<span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入生成的文件夹</span></span>
<span class="line"><span class="token builtin class-name">cd</span> docs/.vuepress/dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果是发布到自定义域名</span></span>
<span class="line"><span class="token comment"># echo &#39;www.example.com&#39; &gt; CNAME</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io</span></span>
<span class="line"><span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span></span>
<span class="line"><span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> -</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">警告</p><p>如果你用的 MAC，在项目根目录借助 <code>终端</code> 执行 <code>bash deploy.sh</code> 即可；如果你使用的是 WINDOWS，在项目根目录借助 <code>Git Bash</code> 执行 <code>bash deploy.sh</code> 即可。</p></div><h3 id="自动部署" tabindex="-1"><a class="header-anchor" href="#自动部署"><span>自动部署</span></a></h3><p><code>GitHub</code> 的自动部署需要借助 <code>travis-ci</code> 。</p>`,9)),s("ol",null,[s("li",null,[s("p",null,[n[1]||(n[1]=a("打开 ")),s("a",r,[n[0]||(n[0]=a("travis-ci")),i(l)]),n[2]||(n[2]=a("，使用 ")),n[3]||(n[3]=s("code",null,"GitHub",-1)),n[4]||(n[4]=a(" 登录；"))])]),n[11]||(n[11]=e("<li><p>进入设置页面，点击 <code>Manage repositories on GitHub</code> 按钮，将需要自动部署的项目导入进来；</p></li><li><p>项目列表中，项目后面有一个 <code>settings</code> 按钮，点击进去将进行配置：</p><ol><li>获取 <code>token</code>：进入github的设置页面，点击 <code>Developer settings</code> 按钮，点击 <code>Personal access tokens</code> 按钮，在当前页面生成 <code>token</code>，名字随便写，只是起到区分作用；</li><li>配置 <code>token</code>：将上面生成的 <code>token</code> 添加在项目的设置页面的 <code>Environment Variables</code>，切记，名字不可随便写，在这里你写成 <code>GITHUB_TOKEN</code>；</li><li>配置 <code>Cron Jobs</code>：（如果你的项目就在 <code>master</code> 分支，可以不用配置这里）<code>Branch</code> 选择 你存放项目源码的分支，<code>Interval</code> 选择 <code>monthly</code>，<code>Options</code> 选择 <code>Always run</code>，添加成功后便会生效。</li></ol></li>",2)),s("li",null,[s("p",null,[n[6]||(n[6]=a("在根目录下创建 ")),n[7]||(n[7]=s("code",null,".travis.yml",-1)),n[8]||(n[8]=a("（")),s("a",u,[n[5]||(n[5]=a("配置规范")),i(l)]),n[9]||(n[9]=a("）："))]),n[10]||(n[10]=e(`<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">language</span><span class="token punctuation">:</span> node_js</span>
<span class="line"><span class="token key atrule">node_js</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> lts/*</span>
<span class="line"><span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> npm run build</span>
<span class="line"><span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">provider</span><span class="token punctuation">:</span> pages</span>
<span class="line">  <span class="token key atrule">skip-cleanup</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">local_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist <span class="token comment"># 项目打包后生成的文件的目录</span></span>
<span class="line">  <span class="token key atrule">github-token</span><span class="token punctuation">:</span> $GITHUB_TOKEN <span class="token comment"># 这里这个变量就是刚才配置 token 时填写的那个变量</span></span>
<span class="line">  <span class="token key atrule">keep-history</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">  <span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branch</span><span class="token punctuation">:</span> master <span class="token comment"># 项目源码所在的分支</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1))]),n[12]||(n[12]=s("li",null,[s("p",null,[a("现在去提交一下代码试试吧，在你提交成功后 "),s("code",null,"travis-ci"),a(" 的控制台就能看到你的项目在部署了。")])],-1))]),n[24]||(n[24]=e('<h2 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab"><span>GitLab</span></a></h2><h3 id="手动部署-1" tabindex="-1"><a class="header-anchor" href="#手动部署-1"><span>手动部署</span></a></h3><ol><li><p>设置输出目录为 <code>public</code>：</p><p>由于 <code>GitLab</code> 的 <code>pages</code> 功能的指定文件夹是 <code>public</code>，所以我们要将项目的输出目录改为 <code>public</code>，也就是将 <code>config.js</code> 的 <code>dest</code> 设置为 <code>public</code>；</p></li><li><p>本地编译，然后将项目提交到 <code>GitLab</code> 即可。</p></li></ol><h3 id="自动部署-1" tabindex="-1"><a class="header-anchor" href="#自动部署-1"><span>自动部署</span></a></h3>',4)),s("ol",null,[n[21]||(n[21]=s("li",null,[s("p",null,[a("设置输出目录为 "),s("code",null,"public"),a("；")])],-1)),s("li",null,[s("p",null,[n[14]||(n[14]=a("由于 ")),n[15]||(n[15]=s("code",null,"GitLab",-1)),n[16]||(n[16]=a(" 自带 CI，所以就省去了很多的配置步骤，只需要在项目根目录创建 ")),n[17]||(n[17]=s("code",null,".gitlab-ci.yml",-1)),n[18]||(n[18]=a("（")),s("a",m,[n[13]||(n[13]=a("配置规范")),i(l)]),n[19]||(n[19]=a("）："))]),n[20]||(n[20]=e(`<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>9.11.1</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">pages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">cache</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> node_modules/ <span class="token comment"># 缓存 node_modules，加速编译</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> npm install</span>
<span class="line">  <span class="token punctuation">-</span> npm run docs<span class="token punctuation">:</span>build</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> public</span>
<span class="line">  <span class="token key atrule">only</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1))]),n[22]||(n[22]=s("li",null,[s("p",null,[a("将项目提交到 "),s("code",null,"GitLab"),a(" 即可。")])],-1))])])}const g=t(d,[["render",v],["__file","deploy.html.vue"]]),h=JSON.parse('{"path":"/blogs/dev/deploy.html","title":"Pages 部署","lang":"zh-CN","frontmatter":{"title":"Pages 部署","date":"2019-05-14T00:00:00.000Z","tags":["Markdown","Github"],"categories":["dev"]},"headers":[{"level":2,"title":"GitHub","slug":"github","link":"#github","children":[{"level":3,"title":"手动部署","slug":"手动部署","link":"#手动部署","children":[]},{"level":3,"title":"自动部署","slug":"自动部署","link":"#自动部署","children":[]}]},{"level":2,"title":"GitLab","slug":"gitlab","link":"#gitlab","children":[{"level":3,"title":"手动部署","slug":"手动部署-1","link":"#手动部署-1","children":[]},{"level":3,"title":"自动部署","slug":"自动部署-1","link":"#自动部署-1","children":[]}]}],"git":{"createdTime":1732947536000,"updatedTime":1732947536000,"contributors":[{"name":"coriger","email":"461504978@qq.com","commits":1}]},"filePathRelative":"blogs/dev/deploy.md"}');export{g as comp,h as data};
