<script>
  export default {
    name: "SidebarSection",
    mounted() {
      this.onComponentLoaded();
    },
    methods: {
      /**
       * 组件加载完成后的回调
       */
      onComponentLoaded() {
        // 遍历section标签
        document.querySelectorAll("section").forEach((section) => {
            // 判断section标签下的h5标签的样式是否有active
            if (!section.querySelector("h5").classList.contains("active")) {
                // 不是激活状态得section 把section下的ul隐藏
                section.querySelector("ul").style.display = "none";
            }
          }
        )
      },
    },
  };
  </script>
  
  <style scoped>
  /* 样式可以根据需求添加 */
  </style>
  