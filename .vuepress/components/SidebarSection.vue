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

        // 判断当前是否有iframe
        if (document.querySelectorAll("iframe").length > 0) {
        }else{
            // 没有iframe ..theme-reco-md-content移除padding-left
            document.querySelector(".theme-reco-md-content").style.setProperty('padding-left', '0', 'important'); // 设置新的值，也可以设置为其他值
            // .page-meta .page-nav也一样
            var pageMeta = document.querySelector(".page-meta");
            var pageNav = document.querySelector(".page-nav");
            if(pageMeta){
                pageMeta.style.setProperty('padding-left', '0', 'important'); // 设置新的值，也可以设置为其他值
            }

            if(pageNav){
                pageNav.style.setProperty('padding-left', '0', 'important');
            }

            var pageContent = document.querySelector(".page-content");
            if(pageContent){
                pageContent.style.setProperty('padding-left', '20em', 'important'); 
                pageContent.style.setProperty('padding-right', '20em', 'important'); 
            }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 样式可以根据需求添加 */
  </style>
  