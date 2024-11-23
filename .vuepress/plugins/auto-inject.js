module.exports = (options) => ({
    name: 'auto-inject-global-component',
    extendsMarkdown: (md, env) => {
      const originalRender = md.render.bind(md);
      md.render = (src, env) => {
          // 移除md里的[&lt;&lt;]()和[&gt;&gt;]()
          src = src.replace(/\[&lt;&lt;\]\(\)/g, '');
          src = src.replace(/\[&gt;&gt;\]\(\)/g, '');
        // 确保 `filePathRelative` 存在并检查路径条件
        if (env.filePathRelative && env.filePathRelative.includes('series/')) {
          const injectedComponent = '<SidebarSection />';
          return originalRender(`${injectedComponent}\n${src}`, env);
        } else {
          return originalRender(src, env);
        }
      };
    },
  });
  