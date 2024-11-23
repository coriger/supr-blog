module.exports = (options) => ({
    name: 'auto-inject-global-component',
    extendsMarkdown: (md, env) => {
      const originalRender = md.render.bind(md);
      md.render = (src, env) => {
        // 确保 `filePathRelative` 存在并检查路径条件
        if (env.filePathRelative && env.filePathRelative.includes('/posts/')) {
          const injectedComponent = '<HelloWorld />';
          return originalRender(`${injectedComponent}\n${src}`, env);
        } else {
          return originalRender(src, env);
        }
      };
    },
  });
  