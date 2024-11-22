<template>
    <div class="interactive-component">
      <button @click="increment">{{ count }}</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        count: 0,
      };
    },
    methods: {
      increment() {
        // 点击按钮后，读取当前页面所有markerow8标签的innerText,拼接成一段话，然后弹窗显示
        let markers = document.querySelectorAll("markerow8");
        let content = "";
        for (let i = 0; i < markers.length; i++) {
          content += markers[i].innerText;
        }
        alert(content);
      },
    },
  };
  </script>
  
  <style scoped>
  .interactive-component button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
  }
  </style>
  